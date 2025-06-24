import { ChangeEvent, useState } from 'react';

import Header from '@app/components/layout/Header';
import Input from '@app/components/ui/Input';
import FormSection from '@app/components/form/FormSection';

import { useCreateCollection } from '@app/hooks/collections/useCreateCollection';
import { useGetAllUserRecipes } from '@app/hooks/recipes/useGetAllUserRecipes';
import SpinnerBar from '@app/components/ui/SpinnerBar';
import RecipeTypes from '@app/types/RecipeTypes';
import { truncateText } from '@app/utility/truncateDescription';
import Checkbox from '@app/components/ui/Checkbox';

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
      <Header title={name ? name : 'New Collection'} back="Collections" />

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
              className={`w-full rounded-lg py-1 text-center font-semibold transition-all ${
                name.length > 1 && !isProcessing
                  ? 'border border-transparent bg-[#1a1a1a] text-[#ffffff] active:bg-[#b4b4b4] dark:bg-[#e3e3e3] dark:text-[#0d0d0d]'
                  : 'border text-[#808080] dark:border-[#424242] dark:bg-transparent dark:text-[#7c7c7c]'
              }`}
              disabled={name.length < 2 || isProcessing}
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
            <div className="grid grid-cols-2 place-items-center gap-x-4 gap-y-4">
              {recipes?.map((recipe: RecipeTypes) => (
                <div
                  key={recipe.id}
                  onClick={() => handleRecipeToggle(recipe.id)}
                  className="relative"
                >
                  {/* Image: */}
                  <div className="h-32 w-44 flex-shrink-0 rounded-t-lg shadow-sm">
                    <img
                      src={recipe.image_url}
                      alt="Recipe image"
                      className="h-32 w-44 rounded-t-lg"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="flex items-center justify-between rounded-b-lg border-x border-b border-[#e6e6e6] bg-white p-2 shadow-sm dark:border-transparent dark:bg-[#212121]">
                    <h3 className="line-clamp-1 overflow-hidden text-ellipsis font-medium leading-5 text-[#0d0d0d] dark:text-[#ffffff]">
                      {truncateText(recipe.title, 6)}
                    </h3>
                  </div>

                  {/* Front Layer for Selected */}
                  <div
                    className={`absolute inset-0 rounded-lg ${selectedRecipes.includes(recipe.id) ? 'bg-white/30' : 'bg-transparent'}`}
                  ></div>

                  <div className="absolute right-0 top-0 p-1">
                    <Checkbox
                      id={`recipe-${recipe.id}`}
                      checked={selectedRecipes.includes(recipe.id)}
                      onChange={() => handleRecipeToggle(recipe.id)}
                    />
                  </div>
                </div>
              ))}

              <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-200 bg-white px-8 pb-9 pt-3 dark:border-gray-800 dark:bg-black">
                <button
                  onClick={handleDone}
                  disabled={isProcessing || selectedRecipes.length < 1}
                  className={`w-full rounded-lg py-1 text-center font-semibold transition-all ${isProcessing || selectedRecipes.length < 1 ? 'border text-[#808080] dark:border-[#424242] dark:bg-transparent dark:text-[#7c7c7c]' : 'border border-transparent bg-[#1a1a1a] text-[#ffffff] active:bg-[#b4b4b4] dark:bg-[#e3e3e3] dark:text-[#0d0d0d]'}`}
                >
                  {isProcessing ? (
                    <div className="relative">
                      &nbsp;
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <SpinnerBar height={1} />
                      </span>
                    </div>
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CreateCollection;
