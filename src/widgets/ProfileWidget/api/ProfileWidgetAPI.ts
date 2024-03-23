import axios from "axios";
import { baseAPI } from "../../../shared/baseAPI";
import { IUser } from "../model/types";

export const fetchUserData = async (): Promise<IUser | null> => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const accessToken = user.accessToken;

    if (!accessToken) {
      console.error("Access token not found in local storage");
      return null;
    }

    const response = await axios.get<IUser>(`${baseAPI}/api/users/my_profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchUserRecipes = async (selectedTab: string): Promise<any[]> => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const accessToken = user.accessToken;

    if (!accessToken) {
      console.error("Access token not found in local storage");
      return [];
    }

    let endpoint: string;
    if (selectedTab === "myRecipes") {
      endpoint = `${baseAPI}/api/recipes/my_recipes`;
    } else if (selectedTab === "savedRecipes") {
      endpoint = `${baseAPI}/api/recipes/my_flagged_recipes`;
    } else {
      console.error("Invalid selectedTab value");
      return [];
    }

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
