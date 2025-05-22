import Avatar from '../settings/Avatar';

interface RecipeHeaderProps {
  isPending: boolean;
  profile: {
    avatar_url: string;
  };
}

function RecipeHeader({ isPending, profile }: RecipeHeaderProps) {
  return (
    <div className="fixed left-0 right-0 top-0 flex items-center justify-between bg-white/70 px-5 pb-2 pt-1 shadow-sm backdrop-blur-sm dark:bg-black/70 dark:backdrop-blur-md">
      <h1 className="text-4xl font-bold">Recipes</h1>
      {isPending ? (
        <div className="h-10 w-10 rounded-full border bg-[#f9f9f9] dark:bg-[#212121]"></div>
      ) : (
        <Avatar
          src={profile.avatar_url}
          size={40}
          accent="bg-[#f6f6f6] dark:text-[#a0a0a0]"
        />
      )}
    </div>
  );
}

export default RecipeHeader;
