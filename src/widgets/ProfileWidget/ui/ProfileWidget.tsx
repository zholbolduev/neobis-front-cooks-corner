/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import "./ProfileWidget.scss";
import Modal from "react-modal";
import ModalUser from "./modalUser/ModalUser";
import { IUser } from "../model/types";
import { baseAPI } from "../../../shared/baseAPI";
import axios from "axios";
import CardEntities from "../../../entities/CardEntities/CardEntities";

const ProfileWidget: React.FC = () => {
  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [selectedTab, setSelectedTab] = useState("myRecipes");
  const [cardList, setCardList] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "");
        const accessToken = user.accessToken;

        if (!accessToken) {
          console.error("Access token not found in local storage");
          return;
        }

        const response = await axios.get(`${baseAPI}/api/users/my_profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "");
        const accessToken = user.accessToken;

        if (!accessToken) {
          console.error("Access token not found in local storage");
          return;
        }

        let endpoint: string;
        if (selectedTab === "myRecipes") {
          endpoint = `${baseAPI}/api/recipes/my_recipes`;
        } else if (selectedTab === "savedRecipes") {
          endpoint = `${baseAPI}/api/recipes/my_flagged_recipes`;
        } else {
          console.error("Invalid selectedTab value");
          return;
        }

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCardList(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
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
