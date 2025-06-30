type RecipeTypes = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  difficulty: string;
  calories: number;
  portions: number;
  cook_time: number;
  price: number;
  categories: string[];
  image_url?: string;
  created_at: string;
  ingredients: {
    name: string;
    unit?: string;
    comment?: string;
    quantity?: number;
    pricePerUnit?: number;
  }[];
  owner: {
    username: string;
    avatar_url: string;
  }
};

export default RecipeTypes;
