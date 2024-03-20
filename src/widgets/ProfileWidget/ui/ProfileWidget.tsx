import { useState } from "react";
import CardEntities from "../../../entities/CardEntities/CardEntities";
import "./ProfileWidget.scss";
import Modal from "react-modal";
import ModalUser from "./modalUser/ModalUser";

const ProfileWidget: React.FC = () => {
  Modal.setAppElement("#root");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    setIsOpen(false);
    document.body.classList.remove("modal-open");
  }

  // ------------Временный  старт-------------
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
    <div className="profileWidget">
      <section className="profileWidget__userContainer">
        <div className="profileWidget__userContainer__img">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&usqp=CAU"
            alt="Photo User"
          />
        </div>

        <div className="profileWidget__userContainer__info">
          <div className="profileWidget__userContainer__info__numbers">
            <div>
              <span>29</span>
              <p>Recipe</p>
            </div>

            <div>
              <span>133</span>
              <p>Followers</p>
            </div>

            <div>
              <span>23</span>
              <p>Following</p>
            </div>
          </div>

          <span className="profileWidget__userContainer__info--name">
            Sarthak Ranjan Hota
          </span>

          <p className="profileWidget__userContainer__info--desc">
            I'm a passionate chef who loves creating delicious dishes with
            flair.
          </p>

          <button
            onClick={openModal}
            className="profileWidget__userContainer__info--btn"
          >
            Manage Profile
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="profileWidget__modal"
            overlayClassName="profileWidget__modal-overlay"
          >
            <ModalUser closeModal={closeModal} />
          </Modal>
        </div>
      </section>

      <div className="profileWidget__list">
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

export default ProfileWidget;
