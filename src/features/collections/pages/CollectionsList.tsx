import { PlusIcon } from '@app/components/Icons/PlusIcon';
import Header from '@app/components/layout/Header';
import CollectionCard from '@app/components/recipes/CollectionCard';
import HeaderButtonLink from '@app/components/ui/HeaderButtonLink';
import { useGetCollectionsPreview } from '@app/features/collections/hooks/useGetCollectionsPreview';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function CollectionsList() {
  const { data: collectionsData, isFetching } = useGetCollectionsPreview();
  const collections = collectionsData || [];

  const navigate = useNavigate();
  const location = useLocation();

  const handleCollectionClick = (collectionId: string) => {
    navigate(`/recipes/collection/${collectionId}`, {
      state: { from: location.pathname },
    });
  };

  if (isFetching) return 'Fetching ...';

  return (
    <div className="pb-24 pt-20">
      <Header title="Collections" back="Recipes">
        {collections.length > 5 && (
          <HeaderButtonLink to="/recipes/create-collection" icon="plus" />
        )}
      </Header>

      <div className="mx-4 grid grid-cols-2 place-items-center gap-y-5">
        {collections?.map((item, i) => (
          <CollectionCard
            key={i}
            collection={item}
            onClick={() => handleCollectionClick(item.id)}
          />
        ))}
        <PlaceholderCardButton />
      </div>
    </div>
  );
}

export default CollectionsList;

function PlaceholderCardButton() {
  const location = useLocation();

  return (
    <NavLink to="/recipes/create-collection" state={{ from: location.pathname }}>
      <div className="flex h-36 w-44 items-center justify-center rounded-lg border-2 border-dashed bg-[#f9f9f9] active:bg-[#e0e0e0] dark:border-transparent dark:bg-[#212121] dark:active:bg-[#2c2c2e]">
        <PlusIcon />
      </div>

      <div className="ml-2">
        <h3 className="font-semibold">New Collection</h3>
      </div>
    </NavLink>
  );
}
