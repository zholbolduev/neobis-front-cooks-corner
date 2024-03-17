import { Link } from "react-router-dom";
import "./CardEntities.scss";
import unlike from "./assets/unlike.svg";
import liked from "./assets/like.svg";
import unsaved from "./assets/unsaved.svg";
import saved from "./assets/saved.svg";
import { FC, useState } from "react";
import { Card } from "./types";

const CardEntities: FC<Card> = ({ id, name, img, author }: Card) => {
  const [isLike, setIslike] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <>
      <div
        className="card"
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        <Link className="link" to={`/details/${id}`} key={id}>
          <div className="card--name">{name}</div>
          <p className="card--author">by {author}</p>
        </Link>

        <span className="card__likeBlock">
          <img
            src={isLike ? liked : unlike}
            alt="Like"
            onClick={() => setIslike(true)}
          />
          112
        </span>
        <span className="card__savedBlock">
          <img
            src={isSaved ? saved : unsaved}
            alt="Save"
            onClick={() => setIsSaved(true)}
          />
          112
        </span>
      </div>
    </>
  );
};

export default CardEntities;
