import React from "react";
import "./LoginCard.css";

import { Link } from "react-router-dom";
const Logincard = () => {
  return (
    <div className="Containercard">
      <div className="card">
        <div className="imgbox">
          {/* <img src={}></img> */}
        </div>
        <div className="boutonBox">
          <h2> Welcome Teacher</h2>
          <div className="btnlogindoctor">
            <Link className="myButton" to="/loginTeacher">
              {" "}
              Log in{" "}
            </Link>
          </div>
        </div>
      </div>
      {/* deuxieme carte */}
      <div className="card2">
        <div className="imgbox">
          {/* <img src={receptioniste}></img> */}
        </div>
        <div className="boutonBox">
          <h2>Welcome Student</h2>
          <div className="btnlogindoctor">
            <Link className="myButton" to="/loginStudent">
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
