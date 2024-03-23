import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChefsEntities.scss";
import { baseAPI } from "../../../shared/baseAPI";
import { IChefs } from "../model/types";

const ChefsEntities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chefs, setChefs] = useState<IChefs[]>([]);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "");
        const accessToken = user.accessToken;

        const response = await axios.get(`${baseAPI}/api/users/search`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            query: searchQuery,
          },
        });

        setChefs(response.data);
      } catch (error) {
        console.error("Error searching chefs:", error);
      }
    };

    fetchChefs();
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
