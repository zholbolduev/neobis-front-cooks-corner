import axios from "axios";
import { baseAPI } from "../../../shared/baseAPI";
import { IRecipeDetails } from "../model/types";

export const fetchRecipeDetails = async (
  id: string
): Promise<IRecipeDetails | null> => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const accessToken = user.accessToken;
    const response = await axios.get<IRecipeDetails>(
      `${baseAPI}/api/recipes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};
