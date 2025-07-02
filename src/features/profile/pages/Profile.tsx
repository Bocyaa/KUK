import { useGetUserProfile } from '@app/shared/hooks/useGetUserProfile';
import SettingsButton from '../components/SettingsButton';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import { useGetUserRecipes } from '@app/features/recipes/hooks/useGetUserRecipes';
import SpinnerBar from '@app/components/ui/SpinnerBar';

function Profile() {
  const { data: user, isLoading } = useGetUserProfile();
  const { data: recipes, isFetching } = useGetUserRecipes();

  if (isLoading) return 'Loading ...';

  return (
    <div className="min-h-screen pb-24">
      {/* Transparent Header */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-2">
        <span></span>
        {/* <LogoutButton /> */}
        <SettingsButton />
      </div>

      {/* Background Image */}
      <div className="relative h-60 overflow-hidden">
        {/* Default Bg Image */}
        <img
          src="/DefaultBgPhoto.png"
          alt="Default Background Image"
          className="opacity-40"
        />

        {/* Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-black"></div>
        <div className="absolute inset-x-0 bottom-24 top-0 bg-gradient-to-b from-white to-transparent dark:from-black"></div>

        {/* Avatar Image */}
        <div className="absolute bottom-0 left-0 mb-2 ml-4 w-28 overflow-hidden rounded-3xl border border-[#e6e6e6] shadow-sm dark:border-transparent">
          <img
            src={user.avatar_url}
            draggable={false}
            alt="User avatar"
            className="rounded-3xl border-8 border-white dark:border-[#212121]"
          />
        </div>
      </div>

      {/* User Info & Action buttons section */}
      <div className="mb-4 flex justify-between px-5">
        <div className="flex flex-col">
          {/* Names */}
          <h1 className="text-2xl font-semibold text-[#0d0d0d] dark:text-[#e3e3e3]">
            {user.first_name} {user.last_name}
          </h1>

          {/* Username */}
          <span className="font-medium text-[#5d5d5d] dark:text-[#afafaf]">
            @{user.username}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Chat button */}
          <div className="flex items-center justify-center self-start rounded-full border bg-white p-2 shadow-sm dark:border-transparent dark:bg-[#212121]">
            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          </div>

          {/* Follow button */}
          <div className="flex items-center justify-center self-start rounded-full border bg-white px-4 py-2 shadow-sm dark:border-transparent dark:bg-[#212121]">
            <span className="font-semibold dark:text-[#e3e3e3]">Follow</span>
          </div>
        </div>
      </div>

      {/* Follow section */}
      <div className="mb-3 flex gap-4 px-5">
        <div>
          <span className="font-bold">21</span> Followers
        </div>
        <div>
          <span className="font-bold">50</span> Following
        </div>
      </div>

      {/* Bio section (158 chars max.) */}
      <div className="mb-10 line-clamp-3 px-5 text-sm font-light">
        Passionate home cook sharing family recipes and culinary adventures. Lover of
        fresh ingredients and bold flavors. Always experimenting in the kitchen!
      </div>

      <div className="flex justify-evenly border-b">
        <span className="w-full border-black pb-2 text-center font-bold">Stats</span>
        <span className="w-full border-b border-black pb-2 text-center font-bold">
          Recipes
        </span>
        <span className="w-full text-center font-bold">Collections</span>
      </div>

      {isFetching ? (
        <div className="flex flex-col items-center justify-center pt-20">
          <SpinnerBar height={2} width={100} />
        </div>
      ) : (
        <div className="align-items-center grid grid-cols-2 gap-[0.1rem]">
          {recipes?.map((r) => (
            <div>
              <img src={r.image_url} alt="Recipe image" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
