import { useState } from "react";
import CardEntities from "../../../entities/CardEntities/CardEntities";
import "./CardListWidget.scss";

const CardListWidget = () => {
  const [activeTab, setActiveTab] = useState<string>("Breakfast");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  // в конце useEffcet
  //   setActiveTab("Popular");

  // ------------Временный старт-------------
  const cardlist = [];

  for (let i = 0; i < 20; i++) {
    const id = i + 1;
    const name = `Card ${id}`;
    const author = `Author ${id}`;
    const img = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&usqp=CAU`;

    cardlist.push({ id, name, author, img });
  }
  // ------------Временный финиш-------------

  return (
    <div className="cardListWidget">
      <h2>Category</h2>

      <ul>
        <li className={activeTab === "Breakfast" ? "active" : ""}>
          <a onClick={() => handleTabClick("Breakfast")}>Breakfast</a>
          {activeTab === "Breakfast" && <p className="breackP"></p>}
        </li>

        <li className={activeTab === "Lunch" ? "active" : ""}>
          <a onClick={() => handleTabClick("Lunch")}>Lunch</a>
          {activeTab === "Lunch" && <p className="lunchP"></p>}
        </li>

        <li className={activeTab === "Dinner" ? "active" : ""}>
          <a onClick={() => handleTabClick("Dinner")}>Dinner</a>
          {activeTab === "Dinner" && <p className="dinnerP"></p>}
        </li>
      </ul>

      <div className="cardListWidget__list">
        {cardlist.slice(0, 12).map((card) => (
          <CardEntities
            key={card.id}
            id={card.id}
            name={card.name}
            author={card.author}
            img={card.img}
          />
        ))}
      </div>
    </div>
  );
};

export default CardListWidget;
