import { Link } from "react-router-dom";
import VerificationEntities from "../../../entities/AuthEntities/VerificationEntities/VerificationEntities";
import "./VerificationFeatures.scss";

const VerificationFeatures = () => {
  return (
    <div className="verificationFeatures">
      <VerificationEntities />

      <div className="verificationFeatures__block">
        <h2>
          If the letter has not arrived, do not rush to wait for the owl mail -
          it is better to
        </h2>
        <br />
        <span>check your Spam box</span>

        <Link className="verificationFeatures__block--link" to={"/login"}>
          confirmed
        </Link>
      </div>
    </div>
  );
};

export default VerificationFeatures;
