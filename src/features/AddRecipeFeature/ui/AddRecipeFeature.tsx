import { useState } from "react";
import "./AddRecipeFetures.scss";
import closeBtn from "./assets/solar_close-circle-bold (1).svg";
import plusBtn from "./assets/btnPlus.svg";

interface ModalUserProps {
  closeModal: () => void;
}

const AddRecipeFeature: React.FC<ModalUserProps> = ({ closeModal }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  //   const [name, setName] = useState<string>("");
  //   const [bio, setBio] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className="addRecipeFeature">
      <div className="addRecipeFeature__closeBlock">
        <h2>Manage profile</h2>

        <button onClick={closeModal}>
          <img src={closeBtn} alt="X" />
        </button>
      </div>

      <div className="addRecipeFeature__inputs">
        <p className="p">Add a recipe photo</p>
        <label className="imgLabel">
          {selectedImage && (
            <img src={selectedImage} alt="Selected" width="80" height="80" />
          )}

          <input
            onChange={handleImageChange}
            type="file"
            name=""
            className="imgInput"
            accept="image/*"
            placeholder="Select an image"
          />
        </label>
        <label>
          Name your recipe
          <input
            type="text"
            name=""
            className="nameInput"
            placeholder="Enter your recipe"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Add a description
          <input
            type="text"
            name=""
            className="descInput"
            placeholder="Description"
            // value={bio}
            // onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <p className="p">Add an ingredient</p>
        <label className="ingLabel">
          <input
            type="text"
            name=""
            className="ingInput"
            placeholder="Ingredient name"
          />
          <input
            type="text"
            name=""
            className="ingInputWeight"
            placeholder="0 kg"
          />
          <button className="plusBtn">
            <img src={plusBtn} alt="Plus Button" />
          </button>
        </label>

        <label>Difficulty</label>
        <div>
          <button type="button" id="easy" name="difficulty" value="easy">
            Easy
          </button>
          <button type="button" id="medium" name="difficulty" value="medium">
            Medium
          </button>
          <button type="button" id="hard" name="difficulty" value="hard">
            Hard
          </button>
        </div>
      </div>

      <button
        className="closeModalBtn"
        //    onClick={updateProfile}
      >
        Update Profile
      </button>
    </div>
  );
};

export default AddRecipeFeature;
