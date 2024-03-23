import { useState } from "react";
import ChefsEntities from "../../../entities/ChefsEntities/ui/ChefsEntities";
import RecipeEntities from "../../../entities/RecipeEntities/ui/RecipeEntities";
import "./SearchWidget.scss";
import AddRecipeBtnEntities from "../../../entities/AddRecipeBtnEntities/AddRecipeBtnEntities";

const SearchWidget = () => {
  const [displayChefs, setDisplayChefs] = useState(true);

  const handleDisplayToggle = (isChefs: boolean) => {
    setDisplayChefs(isChefs);
  };

  return (
    <div className="searchWidget">
      <h2 className="searchWidget--h2">What to eat today?</h2>

      <div className="searchWidget__btnsBlock">
        <div className="searchWidget__btnsBlock__radius">
          <button
            className={displayChefs ? "active" : ""}
            onClick={() => handleDisplayToggle(true)}
          >
            Chefs
          </button>
          <button
            className={displayChefs ? "" : "active"}
            onClick={() => handleDisplayToggle(false)}
          >
            Recipes
          </button>
        </div>
      </div>

      <div>{displayChefs ? <ChefsEntities /> : <RecipeEntities />}</div>

      <div className="searchWidget__addRecipe">
        <AddRecipeBtnEntities />
      </div>
    </div>
  );
};

export default SearchWidget;
