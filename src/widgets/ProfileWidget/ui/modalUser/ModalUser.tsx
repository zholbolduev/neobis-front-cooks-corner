import React, { useState } from "react";
import closeBtn from "../../../../shared/assets/solar_close-circle-bold.svg";
import "./ModalUser.scss";

interface ModalUserProps {
  closeModal: () => void;
}

const ModalUser: React.FC<ModalUserProps> = ({ closeModal }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className="modalUser">
      <div className="modalUser__closeBlock">
        <h2>Manage profile</h2>

        <button onClick={closeModal}>
          <img src={closeBtn} alt="X" />
        </button>
      </div>

      <div className="modalUser__inpust">
        <label>
          Change your name
          <input
            type="text"
            name=""
            className="orangeInput"
            placeholder="Enter your Name"
          />
        </label>

        <label>
          Change your bio
          <input
            type="text"
            name=""
            className="greyInput"
            placeholder="Enter your bio"
          />
        </label>

        <p className="lastP">Add a recipe photo</p>
        <label>
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
      </div>

      <button>Close Modal</button>
    </div>
  );
};

export default ModalUser;
