type CollectionTypes = {
  id: string;
  created_at: string;
  description: string | null;
  name: string;
  recipe_collections: {
    recipe_id: string;
    recipes: {
      id: string;
      title: string;
      description: string;
      difficulty: string;
      calories: number;
      cook_time: number;
      image_url: string;
      portions: number;
      price: number;
    };
  }[];
};

type CollectionPreview = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  recipe_collections: {
    image_url: string;
  }[];
};

export default CollectionTypes;
export type { CollectionPreview };
