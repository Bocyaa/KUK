interface CollectionCardProps {
  images: [];
}

function CollectionCard({ images }: CollectionCardProps) {
  return (
    <div className="flex w-44 flex-shrink-0 snap-center">
      <div className="h-36 w-44 rounded-lg bg-neutral-200"></div>
    </div>
  );
}

export default CollectionCard;
