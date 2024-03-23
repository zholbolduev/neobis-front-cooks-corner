export interface IIngredient {
  name: string;
  amount: string;
}

export interface IRecipeDetails {
  recipeName: string;
  imageUrl: string;
  author: string;
  cookingTime: string;
  difficulty: string;
  likeQuantity: number;
  isLiked: boolean;
  isSaved: boolean;
  description: string;
  ingredients: IIngredient[];
}
