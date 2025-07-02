import { useState } from 'react';
import { supabase } from '@app/shared/lib/supabaseClient';
import toast from 'react-hot-toast';
import { useInvalidateUserPofile } from '@app/shared/hooks/useGetUserProfile';

export function useDeleteAvatar() {
  const [isDeleting, setIsDeleting] = useState(false);
  const invalidateProfile = useInvalidateUserPofile();

  const deleteAvatar = async () => {
    setIsDeleting(true);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error('User not authenticated');
        return { error: 'User not authenticated' };
      }

      // Get current profile to check for existing avatar
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();

      if (profileError) {
        toast.error('Failed to get profile information');
        return { error: profileError.message };
      }

      // If there's an avatar URL, delete the file from storage
      if (profile.avatar_url) {
        // Extract the file path from the URL
        const match = profile.avatar_url.match(/\/avatars\/+(.+)$/);
        const filePath = match ? match[1] : null;

        if (filePath) {
          const { error: storageError } = await supabase.storage
            .from('avatars')
            .remove([filePath]);

          if (storageError) {
            console.error('Failed to delete avatar from storage:', storageError);
            // Don't return here - still try to update the database
          }
        }
      }

      // Update the profiles table to remove avatar_url
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', user.id);

      if (updateError) {
        toast.error('Failed to update profile');
        return { error: updateError.message };
      }

      // Invalidate the user profile cache to refresh the UI
      invalidateProfile();

      toast.success('Avatar deleted successfully');
      return { error: null };
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
      return { error: 'Unexpected error occurred' };
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteAvatar, isDeleting };
}
