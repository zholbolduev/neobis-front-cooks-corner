/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import "./ProfileWidget.scss";
import Modal from "react-modal";
import ModalUser from "./modalUser/ModalUser";
import { IUser } from "../model/types";
import { fetchUserData, fetchUserRecipes } from "../api/ProfileWidgetAPI";
import CardEntities from "../../../entities/CardEntities/CardEntities";

const ProfileWidget: React.FC = () => {
  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [selectedTab, setSelectedTab] = useState("myRecipes");
  const [cardList, setCardList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      setUser(userData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesData = await fetchUserRecipes(selectedTab);
      setCardList(recipesData);
    };
    fetchRecipes();
  }, [selectedTab]);

  function openModal() {
    setIsOpen(true);
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    setIsOpen(false);
    document.body.classList.remove("modal-open");
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const {
    imageUrl,
    recipeQuantity,
    followerQuantity,
    followingQuantity,
    name,
    biography,
  } = user;

  return (
    <div className="profileWidget">
      <section className="profileWidget__userContainer">
        <div className="profileWidget__userContainer__img">
          <img src={imageUrl} alt="Photo User" />
        </div>

        <div className="profileWidget__userContainer__info">
          <div className="profileWidget__userContainer__info__numbers">
            <div>
              <span>{recipeQuantity}</span>
              <p>Recipe</p>
            </div>

            <div>
              <span>{followerQuantity}</span>
              <p>Followers</p>
            </div>

            <div>
              <span>{followingQuantity}</span>
              <p>Following</p>
            </div>
          </div>

          <span className="profileWidget__userContainer__info--name">
            {name}
          </span>

          <p className="profileWidget__userContainer__info--desc">
            {biography}
          </p>

          <button
            onClick={openModal}
            className="profileWidget__userContainer__info--btn"
          >
            Manage Profile
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="profileWidget__modal"
            overlayClassName="profileWidget__modal-overlay"
          >
            <ModalUser closeModal={closeModal} />
          </Modal>
        </div>
      </section>

      <div className="profileWidget__btnsBlock">
        <button onClick={() => setSelectedTab("myRecipes")}>My recipe</button>{" "}
        <button onClick={() => setSelectedTab("savedRecipes")}>
          Saved recipe
        </button>{" "}
      </div>
      <div className="profileWidget__list">
        {cardList.map((card: any) => (
          <CardEntities
            key={card.id}
            id={card.id}
            recipeName={card.recipeName}
            imageUrl={card.imageUrl}
            author={card.author}
            likesQuantity={card.likesQuantity}
            savesQuantity={card.savesQuantity}
            isSaved={card.isSaved}
            isLiked={card.isLiked}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileWidget;
