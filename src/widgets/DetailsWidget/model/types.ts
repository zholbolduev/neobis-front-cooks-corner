export interface IDeatails {
  recipeName: string;
  imageUrl: string;
  author: string;
  cookingTime: string;
  difficulty: string;
  likeQuantity: number;
  isLiked: boolean;
  isSaved: boolean;
  description: string;
  ingredients: [
    {
      name: string;
      amount: string;
    }
  ];
}
