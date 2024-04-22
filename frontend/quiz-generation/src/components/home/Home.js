import React, { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Header from "../auth/Header";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import "./Home.css";
import Contactus from "../contactus/Contactus";
import ServicePage from "../services/ServicePage";
import Typewriter from "./TypeWriter";
import LoginCard from "../auth/LoginCard"
import { Link } from "react-router-dom";
const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const components = document.querySelectorAll(".slow-reveal");
      components.forEach((component) => {
        if (component.getBoundingClientRect().top < window.innerHeight) {
          component.classList.add("loaded");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const phrases = ["Welcome To Our Platform !"];
  return (
    <div>
      <Navbar className="transparent-nav" />
      <div name="Home" className="home">
        <Typewriter texts={phrases} />
        <div>
          <button class="custom-btn btn-3">
            {" "}
            <Link to="/logincard" className="signtxt">
              {" "}
              <span>Log in</span>
            </Link>{" "}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
