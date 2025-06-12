import Header from '@app/components/layout/Header';
import BackLink from '@app/components/ui/BackLink';
import { useParams } from 'react-router-dom';

function Collection() {
  const { collectionId } = useParams<{ collectionId: string }>();

  console.log(collectionId);

  return (
    <div className="h-screen bg-white dark:bg-black">
      <Header
        title="Saved"
        back={<BackLink to="/recipes" label="Back to recipes" />}
      />
    </div>
  );
}

export default Collection;
