import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./DeatilsWidget.scss";
import time from "../assets/lets-icons_time.svg";
import saved from "../../../shared/assets/saved.svg";
import unsaved from "../../../shared/assets/unsaved.svg";
import liked from "../../../shared/assets/like.svg";
import unliked from "../../../shared/assets/unlike.svg";
import { baseAPI } from "../../../shared/baseAPI";
import axios from "axios";

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

const DetailsWidget = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState<IDeatails | null>(null);

  useEffect(() => {
    const fetchOneRecipe = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "");
        const accessToken = user.accessToken;
        console.log(accessToken);

        const response = await axios.get<IDeatails>(
          `${baseAPI}/api/recipes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        setMeal(response.data);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };
    fetchOneRecipe();
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
    isLiked,
    isSaved,
    description,
    ingredients,
  } = meal;

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
            <img src={isLiked ? liked : unliked} alt="Liked" />
            {likeQuantity} likes
          </span>
          <span>
            <img src={isSaved ? saved : unsaved} alt="Saved" />
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
