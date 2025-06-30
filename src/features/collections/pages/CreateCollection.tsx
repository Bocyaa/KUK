import { ChangeEvent, useState } from 'react';

import Header from '@app/components/layout/Header';
import Input from '@app/components/ui/Input';
import FormSection from '@app/components/form/FormSection';
import SpinnerBar from '@app/components/ui/SpinnerBar';
import RecipeTypes from '@app/shared/types/RecipeTypes';
import GridCol2 from '@app/components/ui/GridCol2';
import SelectRecipeCard from '@app/components/collections/SelectRecipeCardSquare';

import { useGetAllUserRecipes } from '@app/features/recipes/hooks/useGetAllUserRecipes';
import { useCreateCollection } from '../hooks/useCreateCollection';

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

  return (
    <div className="mx-4 pb-24 pt-20">
      <Header title={name ? name : 'New Collection'} back="Collections">
        <button
          onClick={handleDone}
          disabled={isProcessing || selectedRecipes.length < 1}
          className="text-lg font-semibold text-[#0094f6] active:text-[#005994]"
        >
          {isProcessing ? (
            <div className="relative mr-6">
              &nbsp;
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <SpinnerBar height={2} />
              </span>
            </div>
          ) : (
            'Save'
          )}
        </button>
      </Header>

      {step === 'form' ? (
        <div className="flex flex-col">
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
              disabled={name.length < 2 || isProcessing}
              className={`w-full rounded-lg py-1 text-center font-semibold transition-all ${
                name.length > 1 && !isProcessing
                  ? 'border border-transparent bg-[#1a1a1a] text-[#ffffff] active:bg-[#b4b4b4] dark:bg-[#e3e3e3] dark:text-[#0d0d0d]'
                  : 'border text-[#808080] dark:border-[#424242] dark:bg-transparent dark:text-[#7c7c7c]'
              }`}
            >
              {isProcessing ? (
                <div className="relative">
                  &nbsp;
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <SpinnerBar height={1} />
                  </span>
                </div>
              ) : (
                'Create'
              )}
            </button>
          </FormSection>
        </div>
      ) : (
        <>
          {isLoadingRecipes ? (
            <div className="flex justify-center pt-10">
              <SpinnerBar />
            </div>
          ) : (
            <GridCol2>
              <>
                {recipes?.map((recipe: RecipeTypes) => (
                  <SelectRecipeCard
                    recipe={recipe}
                    handleRecipeToggle={handleRecipeToggle}
                    selectedRecipes={selectedRecipes}
                  />
                ))}
              </>
            </GridCol2>
          )}
        </>
      )}
    </div>
  );
}

export default CreateCollection;
