import React, { useState, useEffect } from "react";
import { fetchRecipes } from "../api/RecipeEntities";
import { IRecipe } from "../model/types";
import unliked from "../../../shared/assets/unlike.svg";
import liked from "../../../shared/assets/like.svg";
import saved from "../../../shared/assets/saved.svg";
import unsaved from "../../../shared/assets/unsaved.svg";
import "./RecipeEntities.scss";

const RecipeEntities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

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

      <div className="recipeEntities__cardsBlock">
        {recipes.map((recipe, id) => (
          <div key={id} className="recipeEntities__cardsBlock--card">
            <img
              className="recipeEntities__cardsBlock--card--photo"
              src={recipe.imageUrl}
              alt="Photo"
            />
            <span className="recipeEntities__cardsBlock--card--name">
              {recipe.recipeName}
            </span>
            <p className="recipeEntities__cardsBlock--card--author">
              by {recipe.author}
            </p>
            <span className="recipeEntities__cardsBlock--card--btn marginFirst">
              <img src={recipe.isLiked ? liked : unliked} alt="Icon" />
              {recipe.likesQuantity}
            </span>
            <span className="recipeEntities__cardsBlock--card--btn">
              <img src={recipe.isSaved ? saved : unsaved} alt="Icon" />
              {recipe.savesQuantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeEntities;
