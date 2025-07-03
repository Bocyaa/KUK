import SpinnerBar from '@app/components/ui/SpinnerBar';
import { useAuth } from '@app/shared/contexts/hooks/useAuth';
import { CollectionPreview } from '@app/shared/types/CollectionTypes';
import RecipeTypes from '@app/shared/types/RecipeTypes';
import {
  BookOpenIcon as BookOpenIconOutline,
  // PresentationChartLineIcon as ChartLineOutline,
  Squares2X2Icon as SquaresOutline,
} from '@heroicons/react/24/outline';
import {
  BookOpenIcon as BookOpenIconSolid,
  ChatBubbleOvalLeftIcon as ChatBubbleSolid,
  // PresentationChartLineIcon as ChartLineSolid,
  Squares2X2Icon as SquaresSolid,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

interface ProfileComponentProps {
  user: {
    id: string;
    avatar_url: string;
    first_name: string;
    last_name: string;
    username: string;
    followers: number;
    following: number;
    bio: string;
  };
  recipes: RecipeTypes[];
  collections: CollectionPreview[];
  isLoading: boolean;
}

function ProfileComponent({ user, recipes, isLoading }: ProfileComponentProps) {
  const [activeBar, setActiveBar] = useState('recipes');
  const currentUserId = useAuth().session?.user?.id;

  return (
    <div>
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
        <div className="absolute bottom-0 left-0 mb-2 ml-4 w-28 overflow-hidden rounded-3xl border border-[#e6e6e6] bg-black/20 shadow-sm backdrop-blur-sm dark:border-transparent dark:bg-white/30">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              draggable={false}
              alt="User avatar"
              className="rounded-3xl border-8 border-white dark:border-[#212121]"
            />
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-28 w-28 text-white dark:text-black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="8" r="4" fill="currentColor" />
              <path
                d="M4 20c0-4 4-6 8-6s8 2 8 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
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
            <ChatBubbleSolid className="h-6 w-6" />
          </div>

          {/* Follow button */}
          {user.id !== currentUserId && (
            <div className="flex items-center justify-center self-start rounded-full border bg-white px-4 py-2 shadow-sm dark:border-transparent dark:bg-[#212121]">
              <span className="font-semibold dark:text-[#e3e3e3]">Follow</span>
            </div>
          )}
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
      {user.bio ? (
        <div className="mb-10 line-clamp-3 px-5 text-sm font-light">{user.bio}</div>
      ) : (
        <div className="mb-10"></div>
      )}

      {/* Profile NavBar */}
      <div className="flex justify-evenly border-b dark:border-transparent">
        <button
          className={`flex w-full justify-center pb-2 ${activeBar === 'recipes' && 'border-b border-black dark:border-white'}`}
          onClick={() => setActiveBar('recipes')}
        >
          {activeBar === 'recipes' ? (
            <BookOpenIconSolid className="h-6 w-6" />
          ) : (
            <BookOpenIconOutline className="h-6 w-6" />
          )}
        </button>
        <button
          className={`flex w-full justify-center pb-2 ${activeBar === 'collections' && 'border-b border-black dark:border-white'}`}
          onClick={() => setActiveBar('collections')}
        >
          {activeBar === 'collections' ? (
            <SquaresSolid className="h-6 w-6" />
          ) : (
            <SquaresOutline className="h-6 w-6" />
          )}
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center pt-20">
          <SpinnerBar height={2} width={100} />
        </div>
      ) : (
        <>
          {activeBar === 'recipes' && (
            <div className="align-items-center grid grid-cols-2 gap-[1px]">
              {recipes?.map((r) => (
                <div>
                  <img src={r.image_url} alt="Recipe image" />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProfileComponent;
