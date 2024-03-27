/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./DeatilsWidget.scss";
import { fetchRecipeDetails } from "../api/DetailsWidgetAPI";
import { IRecipeDetails } from "../model/types";
import time from "../assets/lets-icons_time.svg";
import saved from "../../../shared/assets/saved.svg";
import unsaved from "../../../shared/assets/unsaved.svg";
import liked from "../../../shared/assets/like.svg";
import unliked from "../../../shared/assets/unlike.svg";
import axios from "axios";
import { baseAPI } from "../../../shared/baseAPI";

const DetailsWidget: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<IRecipeDetails | null>(null);

  const [likedQuantity, setLikedQuantity] = useState<number>();
  const [savedState, setSavedState] = useState<boolean>();
  const [likedState, setLikedState] = useState<boolean>();

  useEffect(() => {
    if (!id) return;
    const fetchRecipe = async () => {
      const data = await fetchRecipeDetails(id);
      setMeal(data);
      if (data) {
        setSavedState(data.isSaved);
        setLikedState(data.isLiked);
        setLikedQuantity(data.likeQuantity);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!meal) {
    return <div>Loading...</div>;
  }

  const {
    recipeName,
    imageUrl,
    author,
    cookingTime,
    difficulty,
    likeQuantity,
    description,
    ingredients,
  } = meal;

  const handleLikeClick = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "");
      const accessToken = user.accessToken;
      console.log(accessToken);

      const response = await axios.put(
        `${baseAPI}/api/actions/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setLikedState(!likedState);
        setLikedQuantity(likedState ? likeQuantity - 1 : likeQuantity + 1);
      }
    } catch (error) {
      console.error("Error occurred while liking:", error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "");
      const accessToken = user.accessToken;

      const response = await axios.put(
        `${baseAPI}/api/actions/mark/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setSavedState(!savedState);
      }
    } catch (error) {
      console.error("Error occurred while saving:", error);
    }
  };

  return (
    <div className="detailsWidget">
      <div className="detailsWidget__imgBlock">
        <img src={imageUrl} alt="Photo" />
      </div>

      <div className="detailsWidget__infoContainer">
        <h2>{recipeName}</h2>
        <span className="detailsWidget__infoContainer--author">
          by {author}
        </span>

        <div className="detailsWidget__infoContainer__time">
          <span>
            <img src={time} alt="Icon Time" />
            {cookingTime}
          </span>
        </div>

        <div className="detailsWidget__infoContainer--level">
          <span>{difficulty}</span>
        </div>

        <div className="detailsWidget__infoContainer__likedBlock">
          <span>
            <img
              src={likedState ? liked : unliked}
              alt={likedState ? "Liked" : "Unliked"}
              onClick={handleLikeClick}
            />
            {likedQuantity} likes
          </span>
          <span>
            <img
              src={savedState ? saved : unsaved}
              alt={savedState ? "Saved" : "Unsaved"}
              onClick={handleSaveClick}
            />
          </span>
        </div>

        <div className="detailsWidget__infoContainer__descBlock">
          <span>Description</span>
          <p>{description}</p>
        </div>

        <div className="detailsWidget__infoContainer__ingredBlock">
          <span>Ingredients</span>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                <span>{ingredient.name}</span>
                <span>{ingredient.amount}</span>
              </li>
            ))}
            <div></div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailsWidget;
