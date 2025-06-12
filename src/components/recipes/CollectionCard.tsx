import { CollectionPreview } from '@app/types/CollectionTypes';

interface CollectionCardProps {
  collection: CollectionPreview;
  onClick: () => void;
}

function CollectionCard({ collection, onClick }: CollectionCardProps) {
  const recipeCount = collection.recipe_collections.length;
  // const itemsToShow = collection.recipe_collections.slice(0, 4);

  const getGridClasses = () => {
    if (recipeCount === 1) return 'grid-cols-1';
    if (recipeCount === 2) return 'grid-cols-1 grid-rows-2';
    return 'grid-cols-2';
  };

  return (
    <div className="w-44 flex-shrink-0 snap-center" onClick={onClick}>
      <div
        className={`grid h-36 w-full gap-1 overflow-hidden rounded-lg p-1 dark:bg-[#212121] ${getGridClasses()}`}
      >
        {collection.recipe_collections.map((item, i) => (
          <img
            src={item.image_url}
            key={i}
            alt="Recipes images from this collection"
            className="h-full w-full rounded-md object-cover"
          />
        ))}
      </div>

      <div className="mt-1">
        <h3 className="text-sm">{collection.name}</h3>
        <span className="line-clamp-1 text-xs dark:text-[#afafaf]">
          {collection.description}
        </span>
      </div>
    </div>
  );
}

export default CollectionCard;
