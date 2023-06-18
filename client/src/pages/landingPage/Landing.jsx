import React from "react";
import epassport from "../../assets/images/epassport.jpg";
import { Wrapper } from "./landing.styles";
//import { Logo } from "../../components/index";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        {/*<Logo />*/}

        <h4>Welcome on board.</h4>

      </nav>

      <div className="container page">
        {" "}
        <div className="info">
          <h1>
            <span>Electronic passport booking and application platform</span>
          </h1>
          <p>
            Book and apply for your e-passport of choice at the comfort of your
            homes now!
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img
          src={epassport}
          alt="E-passport application"
          className="img main-img"
        />
      </div>
    </Wrapper>
  );
};

export default Landing;
