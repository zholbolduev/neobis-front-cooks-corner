/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import CardEntities from "../../../entities/CardEntities/CardEntities";
import "./CardListWidget.scss";
import { fetchRecipesByCategory } from "../api/CardListWidgetAPI";

const CardListWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("breakfast");
  const [cardList, setCardList] = useState<any[]>([]);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "");
      const accessToken = user.accessToken;
      console.log(accessToken);
      const data = await fetchRecipesByCategory(activeTab, accessToken);
      setCardList(data);
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
