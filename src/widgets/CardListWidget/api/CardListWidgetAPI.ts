/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { baseAPI } from "../../../shared/baseAPI";

export const fetchRecipesByCategory = async (
  activeTab: string,
  accessToken: string
): Promise<any[]> => {
  try {
    const response = await axios.get(
      `${baseAPI}/api/recipes/get_by_category?category=${activeTab}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe data:", error);
    return [];
  }
};
