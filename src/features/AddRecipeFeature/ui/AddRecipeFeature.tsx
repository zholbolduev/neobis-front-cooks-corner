import React, { useState } from "react";
import axios from "axios";
import "./AddRecipeFetures.scss";
import closeBtn from "./assets/solar_close-circle-bold (1).svg";
import plusBtn from "./assets/btnPlus.svg";
import { baseAPI } from "../../../shared/baseAPI";

interface ModalUserProps {
  closeModal: () => void;
}

interface Ingredient {
  name: string;
  weight: string;
}

const AddRecipeFeature: React.FC<ModalUserProps> = ({ closeModal }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("easy");

  const [recipeData, setRecipeData] = useState<{
    recipeName: string;
    description: string;
    ingredients: Ingredient[];
    difficulty: string;
    category: string;
    cookingTime: string;
  }>({
    recipeName: "",
    description: "",
    ingredients: [],
    difficulty: "",
    category: "",
    cookingTime: "",
  });

  const handleMealCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setRecipeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDifficultyChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { value } = event.currentTarget;
    setSelectedDifficulty(value);
    setRecipeData((prevData) => ({ ...prevData, difficulty: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRecipeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleIngredientAdd = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: "", weight: "" }],
    }));
  };

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    setRecipeData((prevData) => {
      const updatedIngredients = [...prevData.ingredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [name]: value,
      };
      return { ...prevData, ingredients: updatedIngredients };
    });
  };

  const addRecipe = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const accessToken = user.accessToken;

      const formData = new FormData();
      formData.append("recipeDto", JSON.stringify(recipeData));
      if (selectedImage) {
        formData.append("photo", selectedImage);
      }

      const response = await axios.post(
        `${baseAPI}/api/recipes/add_recipe`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Recipe added successfully!");
      } else {
        console.error("Failed to add recipe");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="addRecipeFeature">
      <div className="addRecipeFeature__closeBlock">
        <h2>Add Recipe</h2>
        <button onClick={closeModal}>
          <img src={closeBtn} alt="X" />
        </button>
      </div>
      <div className="addRecipeFeature__inputs">
        <p className="p">Add a recipe photo</p>
        <label className="imgLabel">
          <input
            onChange={handleImageChange}
            type="file"
            name="image"
            className="imgInput"
            accept="image/*"
            placeholder="Select an image"
          />
        </label>
        <label>
          Name your recipe
          <input
            type="text"
            name="recipeName"
            className="greyInput"
            placeholder="Enter your recipe"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Add a description
          <input
            type="text"
            name="description"
            className="greyInput"
            placeholder="Description"
            onChange={handleInputChange}
          />
        </label>
        <p className="p">Add an ingredient</p>
        {recipeData.ingredients.map((ingredient, index) => (
          <div key={index} className="ingLabel">
            <input
              type="text"
              name="name"
              className="ingInput"
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(e, index)}
            />
            <input
              type="text"
              name="weight"
              className="ingInputWeight"
              placeholder="0 kg"
              value={ingredient.weight}
              onChange={(e) => handleIngredientChange(e, index)}
            />
          </div>
        ))}
        <div className="plusBtn">
          <button onClick={handleIngredientAdd}>
            <img src={plusBtn} alt="Plus Button" />
          </button>
        </div>

        <label>Difficulty</label>
        <div className="difficulty">
          <button
            type="button"
            id="easy"
            name="difficulty"
            value="easy"
            className={selectedDifficulty === "easy" ? "selected" : ""}
            onClick={handleDifficultyChange}
          >
            Easy
          </button>
          <button
            type="button"
            id="medium"
            name="difficulty"
            value="medium"
            className={selectedDifficulty === "medium" ? "selected" : ""}
            onClick={handleDifficultyChange}
          >
            Medium
          </button>
          <button
            type="button"
            id="hard"
            name="difficulty"
            value="hard"
            className={selectedDifficulty === "hard" ? "selected" : ""}
            onClick={handleDifficultyChange}
          >
            Hard
          </button>
        </div>
        <label>
          Category of meal
          <select
            className="greyInput"
            name="category"
            onChange={handleMealCategoryChange}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </label>
        <label>
          Preparation time
          <input
            type="text"
            name="cookingTime"
            className="greyInput"
            placeholder="How much time does it need?(minutes)"
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button className="closeModalBtn" onClick={addRecipe}>
        Add Recipe
      </button>
    </div>
  );
};

export default AddRecipeFeature;
