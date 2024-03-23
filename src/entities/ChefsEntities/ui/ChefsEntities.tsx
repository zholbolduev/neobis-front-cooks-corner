import React, { useState, useEffect } from "react";
import { fetchChefs } from "../api/ChefsEntitiesAPI";
import { IChefs } from "../model/types";
import "./ChefsEntities.scss";

const ChefsEntities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [chefs, setChefs] = useState<IChefs[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const accessToken = user.accessToken;

    const fetchData = async () => {
      const data = await fetchChefs(searchQuery, accessToken);
      setChefs(data);
    };

    fetchData();
  }, [searchQuery]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="chefsEntities">
      <div className="chefsEntities__searchBlock">
        <input
          type="text"
          placeholder="Search Chefs"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <div className="chefsEntities__cardsBlock">
        {chefs.map((chef, index) => (
          <div key={index} className="chefsEntities__cardsBlock--card">
            <img src={chef.photoUrl} alt="Ava" />
            <span>{chef.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefsEntities;
