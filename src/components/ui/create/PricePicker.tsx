import { Ingredient } from '@app/types/recipe';
import BackSecondaryCard from '../controllers/BackSecondaryCard';
import FrontPrimaryCard from '../controllers/FrontPrimaryCard';
import FormSection from '../form/FormSection';
import { useState } from 'react';
import LabelPlaceholder from './LabelPlaceholder';
import QuantityStepper from '@app/components/ingredients/QuantityStepper';

type PricePickerProps = {
  form: {
    ingredients: Ingredient[];
    categories: string[];
    price: number;
    isPrivate: false;
  };
  updateForm: (fields: Partial<PricePickerProps['form']>) => void;
};

function PricePicker({ form, updateForm }: PricePickerProps) {
  const [ingredients] = useState(form.ingredients);
  const [price, setPrice] = useState(0);

  return (
    <FormSection>
      <BackSecondaryCard justify="normal" height="full">
        {ingredients.length > 0 ? (
          <div className="flex w-full flex-col gap-1">
            {ingredients.map((ing) => (
              <div className="flex justify-between">
                <FrontPrimaryCard>
                  <span className="px-2">
                    <span>1</span>
                    <span className="text-sm font-light text-gray-600">
                      {ing.unit}
                    </span>{' '}
                    <span>of </span>
                    <span>{ing.name}</span>
                  </span>
                </FrontPrimaryCard>
                <QuantityStepper value={price} onChange={setPrice} />
              </div>
            ))}
          </div>
        ) : (
          <LabelPlaceholder>empty</LabelPlaceholder>
        )}
      </BackSecondaryCard>
    </FormSection>
  );
}

export default PricePicker;
