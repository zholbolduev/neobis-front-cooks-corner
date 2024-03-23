import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeEntities.scss";
import unliked from "../../../shared/assets/unlike.svg";
import liked from "../../../shared/assets/like.svg";
import saved from "../../../shared/assets/saved.svg";
import unsaved from "../../../shared/assets/unsaved.svg";
import { IRecipe } from "../model/types";
import { baseAPI } from "../../../shared/baseAPI";
// import { useNavigate } from "react-router";

const RecipeEntities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "");
        const accessToken = user.accessToken;

        const response = await axios.get(`${baseAPI}/api/recipes/search`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            query: searchQuery,
          },
        });

        setRecipes(response.data);
      } catch (error) {
        console.error("Error searching recipes:", error);
      }
    };

    fetchRecipes();
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
          <div
            // onClick={() => navigate(`/details/${id}`)}
            key={id}
            className="recipeEntities__cardsBlock--card"
          >
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
