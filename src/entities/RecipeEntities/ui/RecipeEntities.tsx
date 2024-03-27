import React, { useState, useEffect } from "react";
import { fetchRecipes } from "../api/RecipeEntities";
import { IRecipe } from "../model/types";
import unliked from "../../../shared/assets/unlike.svg";
import liked from "../../../shared/assets/like.svg";
import saved from "../../../shared/assets/saved.svg";
import unsaved from "../../../shared/assets/unsaved.svg";
import "./RecipeEntities.scss";
// import axios from "axios";
// import { baseAPI } from "../../../shared/baseAPI";

const RecipeEntities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  // const [savedQuantity, setSavedQuantity] = useState(savesQuantity);
  // const [likedQuantity, setLikedQuantity] = useState(likesQuantity);
  // const [savedState, setSavedState] = useState<boolean>(isSaved);
  // const [likedState, setLikedState] = useState<boolean>(isLiked);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const accessToken = user.accessToken;

    const fetchData = async () => {
      const data = await fetchRecipes(searchQuery, accessToken);
      setRecipes(data);
    };

    fetchData();
  }, [searchQuery]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  // const handleLikeClick = async () => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem("user") || "");
  //     const accessToken = user.accessToken;
  //     console.log(accessToken);

  //     const response = await axios.put(
  //       `${baseAPI}/api/actions/like/${id}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setLikedState(!likedState);
  //       setLikedQuantity(likedState ? likedQuantity - 1 : likedQuantity + 1);
  //     }
  //   } catch (error) {
  //     console.error("Error occurred while liking:", error);
  //   }
  // };

  // const handleSaveClick = async () => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem("user") || "");
  //     const accessToken = user.accessToken;
  //     console.log(accessToken);

  //     const response = await axios.put(
  //       `${baseAPI}/api/actions/mark/${id}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setSavedState(!savedState);
  //       setSavedQuantity(savedState ? savedQuantity - 1 : savedQuantity + 1);
  //     }
  //   } catch (error) {
  //     console.error("Error occurred while saving:", error);
  //   }
  // };

  return (
    <div className="recipeEntities">
      <div className="recipeEntities__searchBlock">
        <input
          type="text"
          placeholder="Search Recipe"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <div className="recipeEntities__recipeBlock">
        {recipes.map((recipe, id) => (
          <div key={id} className="recipeEntities__recipeBlock--card">
            <img
              className="recipeEntities__recipeBlock--card--photo"
              src={recipe.imageUrl}
              alt="Photo"
            />
            <span className="recipeEntities__recipeBlock--card--name">
              {recipe.recipeName.length > 15
                ? `${recipe.recipeName.slice(0, 15)}...`
                : recipe.recipeName}
            </span>
            <p className="recipeEntities__recipeBlock--card--author">
              by {recipe.author}
            </p>
            <span className="recipeEntities__recipeBlock--card--btn marginFirst">
              <img
                src={recipe.isLiked ? liked : unliked}
                // onClick={handleLikeClick}
                alt="Icon"
              />
              {recipe.likesQuantity}
            </span>
            <span className="recipeEntities__recipeBlock--card--btn">
              <img
                src={recipe.isSaved ? saved : unsaved}
                // onClick={handleSaveClick}
                alt="Icon"
              />
              {recipe.savesQuantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeEntities;
