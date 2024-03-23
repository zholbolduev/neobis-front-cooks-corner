/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import CardEntities from "../../../entities/CardEntities/CardEntities";
import "./CardListWidget.scss";
import axios from "axios";
import { baseAPI } from "../../../shared/baseAPI";

const CardListWidget = () => {
  const [activeTab, setActiveTab] = useState<string>("breakfast");
  const [cardList, setCardList] = useState([]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "");
        const accessToken = user.accessToken;
        console.log(accessToken);

        const response = await axios.get(
          `${baseAPI}/api/recipes/get_by_category?category=${activeTab}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        setCardList(response.data);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="cardListWidget">
      <h2>Category</h2>

      <ul>
        <li className={activeTab === "breakfast" ? "active" : ""}>
          <a onClick={() => handleTabClick("breakfast")}>Breakfast</a>
          {activeTab === "breakfast" && <p className="breackP"></p>}
        </li>

        <li className={activeTab === "lunch" ? "active" : ""}>
          <a onClick={() => handleTabClick("lunch")}>Lunch</a>
          {activeTab === "lunch" && <p className="lunchP"></p>}
        </li>

        <li className={activeTab === "dinner" ? "active" : ""}>
          <a onClick={() => handleTabClick("dinner")}>Dinner</a>
          {activeTab === "dinner" && <p className="dinnerP"></p>}
        </li>
      </ul>

      <div className="cardListWidget__list">
        {cardList.slice(0, 12).map((card: any) => (
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

export default CardListWidget;
