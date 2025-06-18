import { ChangeEvent, useState } from 'react';

import Header from '@app/components/layout/Header';
import BackLink from '@app/components/ui/BackLink';
import Input from '@app/components/ui/Input';
import FormSection from '@app/components/form/FormSection';

import { useBackNavigation } from '@app/hooks/useBackNavigation';
import { useCreateCollection } from '@app/hooks/collections/useCreateCollection';
import { useGetAllUserRecipes } from '@app/hooks/recipes/useGetAllUserRecipes';
import SpinnerBar from '@app/components/ui/SpinnerBar';

type Collection = {
  id: string;
  name: string;
};

function CreateCollection() {
  const [step, setStep] = useState<'form' | 'addRecipes'>('form');
  const [name, setName] = useState('');
  const [createdCollection, setCreatedCollection] = useState<Collection | null>(
    null,
  );
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);

  const {
    createCollection,
    addRecipesToCollection,
    isLoading: isProcessing,
  } = useCreateCollection();

  const { data: recipes, isLoading: isLoadingRecipes } = useGetAllUserRecipes();

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  const handleCreateCollection = async () => {
    const newCollection = await createCollection(name);
    if (newCollection) {
      setCreatedCollection(newCollection);
      setStep('addRecipes');
    }
  };

  const handleRecipeToggle = (recipeId: string) => {
    setSelectedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId],
    );
  };

  const handleDone = () => {
    if (!createdCollection) {
      console.error('Something went wrong, collection not found.');
      return;
    }
    addRecipesToCollection(createdCollection.id, selectedRecipes);
  };

  const backLinkData = useBackNavigation({
    defaultTo: '/recipes/collections-list',
    defaultLabel: 'Back to Collections',
    routes: {
      '/recipes$': {
        to: '/recipes',
        label: 'Back to Recipes',
      },
    },
  });

  return (
    <div className="pb-24 pt-20">
      <Header
        title={name ? name : 'New Collection'}
        back={<BackLink to={backLinkData.to} label={backLinkData.label} />}
      />

      <div className="mx-4 flex flex-col">
        <FormSection>
          <Input
            label="Name"
            id="title"
            name="title"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Collection name"
            className="mb-5"
          />

          <button
            onClick={handleCreateCollection}
            className={`w-full rounded-lg py-1 text-center font-semibold transition-all ${
              name.length > 1 && !isProcessing
                ? 'border border-transparent bg-[#1a1a1a] text-[#ffffff] active:bg-[#b4b4b4] dark:bg-[#e3e3e3] dark:text-[#0d0d0d]'
                : 'border text-[#808080] dark:border-[#424242] dark:bg-transparent dark:text-[#7c7c7c]'
            }`}
            disabled={name.length < 2 || isProcessing}
          >
            {!isProcessing ? (
              <div className="relative">
                &nbsp;
                <span className="absolute inset-0">
                  <SpinnerBar height={1} />
                </span>
              </div>
            ) : (
              'Create'
            )}
          </button>
        </FormSection>
      </div>
    </div>
  );
}

export default CreateCollection;
