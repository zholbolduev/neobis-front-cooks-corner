import axios from "axios";
import { baseAPI } from "../../../shared/baseAPI";
import { IRecipe } from "../model/types";

export const fetchRecipes = async (
  searchQuery: string,
  accessToken: string
): Promise<IRecipe[]> => {
  try {
    const response = await axios.get(`${baseAPI}/api/recipes/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        query: searchQuery,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching recipes:", error);
    return [];
  }
};
