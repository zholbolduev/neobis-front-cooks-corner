export interface IRecipe {
  id: number;
  imageUrl: string;
  recipeName: string;
  author: string;
  likesQuantity: number;
  savesQuantity: number;
  isSaved: boolean;
  isLiked: boolean;
}
