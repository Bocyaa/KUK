import Avatar from '@app/components/ui/settings/Avatar';
import SectionBg from '@app/components/ui/settings/SectionBg';
import SettingItem from '@app/components/ui/settings/SettingItem';
import { useInvalidateUserPofile, useGetUserProfile } from '@app/hooks/useGetUserProfile';
import { supabase } from '@app/lib/supabaseClient';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

function ProfileMain() {
  const { data: profile, isPending } = useGetUserProfile();
  const invalidateProfile = useInvalidateUserPofile();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  if (isPending) return <div>Loading...</div>;
  if (!profile) return <div>No profile found.</div>;

  // Handler for file input change
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/heic'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, or HEIC images are allowed.');
      return;
    }

    setUploading(true);

    try {
      // Read file as image for cropping or dimension check
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      let fileToUpload = file;

      // If already 640x640 JPEG and <=150KB, upload as is
      if (
        file.type === 'image/jpeg' &&
        img.width === 640 &&
        img.height === 640 &&
        file.size <= 150 * 1024
      ) {
        // No processing needed
      } else {
        // Dynamically import browser-image-compression
        const imageCompression = (await import('browser-image-compression')).default;

        // Crop to center square 640x640
        const canvas = document.createElement('canvas');
        const size = 640;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);

        // Convert canvas to blob (remove metadata)
        const croppedBlob: Blob | null = await new Promise((resolve) =>
          canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.9),
        );

        if (!croppedBlob) {
          toast.error('Failed to process image. Please try a different image.');
          setUploading(false);
          return;
        }

        const croppedFile = new File([croppedBlob], 'avatar.jpg', {
          type: 'image/jpeg',
        });

        // Compress/cap to 150KB
        const compressedFile = await imageCompression(croppedFile, {
          maxSizeMB: 0.15,
          maxWidthOrHeight: 640,
          useWebWorker: true,
          fileType: 'image/jpeg',
          initialQuality: 0.85,
        });

        if (compressedFile.size > 150 * 1024) {
          toast.error('Image size is too big to be accepted. Try a different image.');
          setUploading(false);
          return;
        }

        fileToUpload = compressedFile;
      }

      const fileExt = 'jpg';
      const fileName = `${profile.id}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Remove old avatar if exists
      if (profile.avatar_url) {
        const oldPath = profile.avatar_url.split('/storage/v1/object/public/')[1];
        if (oldPath) {
          await supabase.storage.from('avatars').remove([oldPath]);
        }
      }

      console.log('File to upload:', fileToUpload);
      console.log('File path:', filePath);
      console.log(await supabase.auth.getSession());

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, fileToUpload);

      if (uploadError) {
        toast.error('Failed to upload avatar.');
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);

      const avatarUrl = publicUrlData?.publicUrl;

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', profile.id);

      if (updateError) {
        toast.error('Failed to update profile.');
        setUploading(false);
        return;
      }

      invalidateProfile();
      toast.success('Profile photo updated!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to process image.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  // Open file picker
  function openFilePicker() {
    fileInputRef.current?.click();
  }

  return (
    <div className="mt-16 flex w-full flex-col gap-5">
      <div className="flex flex-col items-center justify-center gap-5">
        <Avatar src={profile.avatar_url} size={120} />
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/heic"
            className="absolute left-0 top-0 h-0 w-0 opacity-0"
            aria-label="Choose a profile photo"
            tabIndex={-1}
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="text-sm font-semibold text-[#0094f6]"
            aria-label="Change profile photo"
            onClick={openFilePicker}
            disabled={uploading}
            tabIndex={0}
          >
            {uploading ? (
              <svg className="mr-2 inline h-5 w-5 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <span>Change photo</span>
            )}
          </button>
        </div>
        <div className="mb-2 flex flex-col items-center gap-2">
          <h1 className="text-xl font-semibold">
            {profile.first_name} {profile.last_name}
          </h1>
          <span className="text-sm text-gray-600 dark:text-[#a0a0a0]">
            {profile.email} • @{profile.username}
          </span>
        </div>
      </div>
      <SectionBg>
        <NavLink to="personalInfo">
          <SettingItem settingKey="personalInfo" />
        </NavLink>
        <NavLink to="passwordUpdate">
          <SettingItem settingKey="passwordUpdate" />
        </NavLink>
      </SectionBg>
      <SectionBg>
        <SettingItem settingKey="deleteAccount" />
      </SectionBg>
    </div>
  );
}

export default ProfileMain;
