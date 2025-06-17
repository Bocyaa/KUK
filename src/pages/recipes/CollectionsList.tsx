import { PlusIcon } from '@app/components/Icons/PlusIcon';
import Header from '@app/components/layout/Header';
import CollectionCard from '@app/components/recipes/CollectionCard';
import BackLink from '@app/components/ui/BackLink';
import HeaderButtonLink from '@app/components/ui/HeaderButtonLink';
import { useGetCollectionsPreview } from '@app/hooks/recipes/collections/useGetCollectionsPreview';
import { useNavigate } from 'react-router-dom';

function CollectionsList() {
  const { data: collectionsData } = useGetCollectionsPreview(); // isFetching: isLoadingCollections
  const collections = collectionsData || [];
  const navigate = useNavigate();

  const handleCollectionClick = (collectionId: string) => {
    navigate(`/recipes/collection/${collectionId}`);
  };

  return (
    <div className="pb-24 pt-20">
      <Header
        title="My Collections"
        back={<BackLink to="/recipes" label="Back to recipes" />}
      >
        <HeaderButtonLink to="/create-collection" icon="plus" />
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
  return (
    <div className="flex h-36 w-44 items-center justify-center rounded-lg border-2 border-dashed bg-[#f9f9f9] dark:border-transparent dark:bg-[#212121]">
      <PlusIcon />
    </div>
  );
}
