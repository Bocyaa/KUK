import { useGetUserProfile } from '@app/hooks/useGetUserProfile';
import Avatar from './Avatar';

function ProfileCard() {
  const { data: profile, isPending } = useGetUserProfile();

  if (isPending) return <div>Loading...</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div className="flex h-24 items-center justify-between rounded-2xl bg-white px-5 dark:border-[#1c1c1c] dark:bg-[#1c1c1c] dark:text-[#f3f3f3]">
      <div className="flex items-center gap-5">
        <Avatar src={profile.avatar_url} size={64} accent="bg-[#f6f6f6] dark:text-[#a0a0a0]" />
        <div className="flex flex-col">
          <span className="font-semibold text-[#0b0b0b] dark:text-[#f3f3f3]">
            {profile.first_name}
          </span>
          <span className="text-sm text-gray-600 dark:text-[#a0a0a0]">
            Manage your account settings
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
