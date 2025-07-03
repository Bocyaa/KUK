import { useGetUserProfile } from '@app/shared/hooks/useGetUserProfile';
import SettingsButton from '../components/SettingsButton';
import { useGetUserRecipes } from '@app/features/recipes/hooks/useGetUserRecipes';
import { useGetCollectionsPreview } from '@app/features/collections/hooks/useGetCollectionsPreview';
import ProfileButton from '../components/ProfileButton';

function Profile() {
  const { data: user, isLoading: isLoadingUserData } = useGetUserProfile();
  const { data: recipes, isFetching: isFetchingReci } = useGetUserRecipes();
  const { data: collectionsPreview, isFetching: isFetchingCol } =
    useGetCollectionsPreview();

  if (isFetchingReci || isFetchingCol || isLoadingUserData) return 'Loading ...';

  return (
    <div className="min-h-screen pb-24">
      {/* Transparent Header */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-2">
        <span></span>
        <div className="flex gap-2">
          <ProfileButton src={user.avatar_url} />
          <SettingsButton />
        </div>
      </div>

      {/* <ProfileComponent
        user={user}
        recipes={recipes || []}
        collections={collectionsPreview || []}
        isLoading={isFetchingReci || isFetchingCol || isLoadingUserData}
      /> */}
    </div>
  );
}

export default Profile;
