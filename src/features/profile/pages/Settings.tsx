import { PlusIcon } from '@app/components/Icons/PlusIcon';
import Header from '@app/components/layout/Header';
import Avatar from '@app/components/settings/Avatar';
import SectionBg from '@app/components/settings/SectionBg';
import SettingItem from '@app/components/settings/SettingItem';
import SpinnerBar from '@app/components/ui/SpinnerBar';
import { useDeleteAvatar } from '@app/features/settings/hooks/useDeleteAvatar';
import {
  useInvalidateUserPofile,
  useGetUserProfile,
} from '@app/shared/hooks/useGetUserProfile';
import { supabase } from '@app/shared/lib/supabaseClient';
import {
  FingerPrintIcon,
  UserIcon,
  UserMinusIcon,
} from '@heroicons/react/24/outline';
import { XIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import MainContent from '@app/components/ui/MainContent';

function Settings() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const { data: profile, isPending } = useGetUserProfile();
  const invalidateProfile = useInvalidateUserPofile();

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
          toast.error(
            'Image size is too big to be accepted. Try a different image.',
          );
          setUploading(false);
          return;
        }

        fileToUpload = compressedFile;
      }

      const fileExt = 'jpg';
      const fileName = `${profile.id}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, fileToUpload, { upsert: true });

      if (uploadError) {
        toast.error('Failed to upload avatar.');
        setUploading(false);
        return;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      const avatarUrl = publicUrlData?.publicUrl;

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', profile.id);

      if (updateError) {
        toast.error('Failed to update profile.');
        setUploading(false);
        // Delete the just-uploaded file to avoid orphaned files
        await supabase.storage.from('avatars').remove([filePath]);
        return;
      }

      // Delete the old avatar if it exists and is different from the new one
      if (profile.avatar_url) {
        // Extract the path after '/avatars/' (handles double slashes)
        const match = profile.avatar_url.match(/\/avatars\/+(.+)$/);
        const oldPath = match ? match[1] : null;
        if (oldPath && oldPath !== filePath) {
          await supabase.storage.from('avatars').remove([oldPath]);
        }
      }

      invalidateProfile();
      // toast.success('Profile photo updated!');
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

  // Delete user avatar and invalidate user profile cache
  const { deleteAvatar, isDeleting } = useDeleteAvatar();

  if (isPending) return <div>Loading...</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div>
      <Header title="Settings" back="Profile">
        <LogoutButton />
      </Header>

      <MainContent className="space-y-5 pt-24">
        <div className="flex flex-col items-center justify-center gap-5">
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
                <SpinnerBar height={3} width={80} />
              ) : (
                <>
                  <Avatar src={profile.avatar_url} size={7} />
                  {profile.avatar_url ? (
                    <button
                      className="absolute right-0 top-0 rounded-full border bg-white p-1 shadow-sm dark:border-transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAvatar();
                      }}
                      disabled={isDeleting}
                    >
                      <XIcon className="h-4 w-4 stroke-[3] text-red-500" />
                    </button>
                  ) : (
                    <button className="absolute right-0 top-0 rounded-full border bg-white p-1">
                      <PlusIcon className="h-4 w-4 text-[#0094f6]" />
                    </button>
                  )}
                </>
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
            <SettingItem
              label="Personal Data"
              icon={<UserIcon />}
              handleClick={() => {}}
            />
          </NavLink>
          <NavLink to="passwordUpdate">
            <SettingItem
              label="Update Password"
              icon={<FingerPrintIcon />}
              handleClick={() => {}}
            />
          </NavLink>
        </SectionBg>

        <SectionBg>
          <NavLink to="deleteAccount">
            <SettingItem
              label="Delete Account"
              icon={<UserMinusIcon />}
              handleClick={() => {}}
              isDanger={true}
            />
          </NavLink>
        </SectionBg>
      </MainContent>
    </div>
  );
}

export default Settings;
