import { CollectionPreview } from '@app/shared/types/CollectionTypes';

interface CollectionCardProps {
  collection: CollectionPreview;
  onClick: () => void;
}

function CollectionCard({ collection, onClick }: CollectionCardProps) {
  const recipeCount = collection.recipe_collections.length;

  const getGridClasses = () => {
    if (recipeCount <= 1) return 'grid-cols-1';
    if (recipeCount === 2) return 'grid-cols-1 grid-rows-2';
    return 'grid-cols-2';
  };

  return (
    <div className="w-44 flex-shrink-0 snap-center" onClick={onClick}>
      <div
        className={`grid h-36 w-full gap-1 overflow-hidden rounded-lg bg-[#f9f9f9] p-1 dark:bg-[#212121] ${getGridClasses()}`}
      >
        {recipeCount > 0 ? (
          <>
            {collection.recipe_collections.map((item, i) => (
              <img
                src={item.image_url}
                key={i}
                alt="Recipes images from this collection"
                className="h-full w-full rounded-md object-cover"
              />
            ))}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-bold uppercase text-[#5d5d5d]/50 dark:text-[#afafaf]">
            empty
          </div>
        )}
      </div>

      <div className="ml-2">
        <h3 className="font-semibold capitalize">{collection.name}</h3>
      </div>
    </div>
  );
}

export default CollectionCard;
