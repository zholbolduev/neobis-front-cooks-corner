import React, { useState } from "react";
import closeBtn from "../../../../shared/assets/solar_close-circle-bold.svg";
import "./ModalUser.scss";
import axios from "axios";
import { baseAPI } from "../../../../shared/baseAPI";

interface ModalUserProps {
  closeModal: () => void;
}

const ModalUser: React.FC<ModalUserProps> = ({ closeModal }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const user = JSON.parse(localStorage.getItem("user") || "");
  const accessToken = user.accessToken;

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("dto", JSON.stringify({ name, biography: bio }));
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await axios.put(`${baseAPI}/api/users/update_profile`, formData, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      });

      closeModal();
    } catch (error) {
      console.error("Error updating profile:", error);
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

      <div className="modalUser__inputs">
        <label>
          Change your name
          <input
            type="text"
            name=""
            className="orangeInput"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Change your bio
          <input
            type="text"
            name=""
            className="greyInput"
            placeholder="Enter your bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>

        <p className="lastP">Add a recipe photo</p>
        <label>
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              width="80"
              height="80"
            />
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

      <button className="closeModalBtn" onClick={updateProfile}>
        Update Profile
      </button>
    </div>
  );
};

export default ModalUser;
