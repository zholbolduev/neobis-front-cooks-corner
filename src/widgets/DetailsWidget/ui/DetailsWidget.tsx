import { useEffect } from "react";
import { useParams } from "react-router";
import "./DeatilsWidget.scss";
import time from "../assets/lets-icons_time.svg";
// import unsaved from "../../../shared/assets/unsaved.svg";
import saved from "../../../shared/assets/saved.svg";
import like from "../../../shared/assets/like.svg";
// import unliked from "../../../shared/assets/unlike.svg";

const DetailsWidget = () => {
  const { id } = useParams();
  // const [meal, setMeal] = useState([]);

  //   console.log(id);

  useEffect(() => {
    const fetchOneMeal = async () => {
      // const oneMeal = await getOneMeal(id);
      // setMeal(oneMeal);
    };
    fetchOneMeal();
  }, [id]);

  return (
    <div className="detailsWidget">
      <div className="detailsWidget__imgBlock">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&usqp=CAU"
          alt="Photo"
        />
      </div>

      <div className="detailsWidget__infoContainer">
        <h2>Ainsley’s Jerk Chicken</h2>
        <span className="detailsWidget__infoContainer--author">
          by Ainsley Harriott
        </span>

        <div className="detailsWidget__infoContainer__time">
          <span>
            {" "}
            <img src={time} alt="Icon Time" />
            20-30min
          </span>
        </div>

        <div className="detailsWidget__infoContainer--level">
          <span>Easy</span>
        </div>

        <div className="detailsWidget__infoContainer__likedBlock">
          <span>
            <img src={like} alt="Liked" />
            12 likes
          </span>
          <span>
            {" "}
            <img src={saved} alt="Saved" />
          </span>
        </div>

        <div className="detailsWidget__infoContainer__descBlock">
          <span>Description</span>
          <p>
            You pick up your palette knife and then work that into. Give your
            meat a good old rub. That’s it, nice and hot, hot and spicy meat.
            He-he boy...You pick up your palette knife and then work that into.
            Give your meat a good old rub. That’s it, nice and hot, hot and
            spicy meat. He-he boy...You pick up your palette knife and then work
            that into. Give your meat a good old rub. That’s it, nice and hot,
            hot and spicy meat. He-he boy...
          </p>
        </div>

        <div className="detailsWidget__infoContainer__ingredBlock">
          <span>Ingredients</span>

          <ul>
            <li>
              <span>Chicken</span>
              <span>1kg</span>
            </li>
            <div></div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailsWidget;
