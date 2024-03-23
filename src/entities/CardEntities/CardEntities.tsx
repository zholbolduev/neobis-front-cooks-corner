import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { baseAPI } from "../../shared/baseAPI";
import axios from "axios";
import unlike from "../../shared/assets/unlike.svg";
import liked from "../../shared/assets/like.svg";
import unsaved from "../../shared/assets/unsaved.svg";
import saved from "../../shared/assets/saved.svg";
import { Card } from "./types";
import "./CardEntities.scss";

const CardEntities: FC<Card> = ({
  id,
  recipeName,
  imageUrl,
  author,
  likesQuantity,
  savesQuantity,
  isSaved,
  isLiked,
}: Card) => {
  const [savedQuantity, setSavedQuantity] = useState(savesQuantity);
  const [likedQuantity, setLikedQuantity] = useState(likesQuantity);
  const [savedState, setSavedState] = useState<boolean>(isSaved);
  const [likedState, setLikedState] = useState<boolean>(isLiked);

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
        setLikedQuantity(likedState ? likedQuantity - 1 : likedQuantity + 1);
      }
    } catch (error) {
      console.error("Error occurred while liking:", error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "");
      const accessToken = user.accessToken;
      console.log(accessToken);

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
        setSavedQuantity(savedState ? savedQuantity - 1 : savedQuantity + 1);
      }
    } catch (error) {
      console.error("Error occurred while saving:", error);
    }
  };

  return (
    <>
      <div
        className="card"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <Link className="link" to={`/details/${id}`} key={id}>
          <div className="card--name">{recipeName}</div>
          <p className="card--author">by {author}</p>
        </Link>

        <span className="card__likeBlock">
          <img
            src={likedState ? liked : unlike}
            alt={likedState ? "Liked" : "Unliked"}
            onClick={handleLikeClick}
          />
          {likedQuantity}
        </span>
        <span className="card__savedBlock">
          <img
            src={savedState ? saved : unsaved}
            alt={savedState ? "Saved" : "Unsaved"}
            onClick={handleSaveClick}
          />
          {savedQuantity}
        </span>
      </div>
    </>
  );
};

export default CardEntities;
