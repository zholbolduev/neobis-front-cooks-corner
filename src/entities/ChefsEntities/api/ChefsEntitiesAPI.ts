import axios from "axios";
import { baseAPI } from "../../../shared/baseAPI";
import { IChefs } from "../model/types";

export const fetchChefs = async (
  searchQuery: string,
  accessToken: string
): Promise<IChefs[]> => {
  try {
    const response = await axios.get(`${baseAPI}/api/users/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        query: searchQuery,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching chefs:", error);
    return [];
  }
};
