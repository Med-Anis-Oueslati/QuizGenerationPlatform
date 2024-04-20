import React from "react";
import "./logincard.css";
import doctor from "../assets/doctorlog.png";
import receptioniste from "../assets/recepti.png";
import { Link } from "react-router-dom";
const Logincard = () => {
  return (
    <div className="Containercard">
      <div className="card">
        <div className="imgbox">
          <img src={doctor}></img>
        </div>
        <div className="boutonBox">
          <h2> Welcome DOCTOR</h2>
          <div className="btnlogindoctor">
            <Link className="myButton" to="/doctorauth">
              {" "}
              Log in{" "}
            </Link>
          </div>
        </div>
      </div>
      {/* deuxieme carte */}
      <div className="card2">
        <div className="imgbox">
          <img src={receptioniste}></img>
        </div>
        <div className="boutonBox">
          <h2>Welcome Receptioniste</h2>
          <div className="btnlogindoctor">
            <Link className="myButton" to="/recepauth">
              {" "}
              Log in{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Logincard;
