import { useState } from "react";
import Modal from "react-modal";
import AddRecipeFeature from "../../features/AddRecipeFeature/ui/AddRecipeFeature";
import plus from "./assets/solar_add-circle-bold.svg";
import "./AddRecipeBtnEntities.scss";

const AddRecipeBtnEntities = () => {
  Modal.setAppElement("#root");

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button className="addRecipeBtnEntities" onClick={openModal}>
        <img src={plus} alt="Plus" width={24} height={24} />
        Add your Recipe
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="addRecipeModal"
        overlayClassName="addRecipeModalOverlay"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <AddRecipeFeature closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default AddRecipeBtnEntities;
