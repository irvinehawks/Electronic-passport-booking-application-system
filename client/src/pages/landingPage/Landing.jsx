import React from "react";
import main from "../../assets/images/main.svg";
import { Wrapper } from "./landing.styles";
import { Logo } from "../../components/index";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        {/*<Logo />*/}
        <p>Welcome on board. Acquire you passport travel documents the smart way.</p>
      </nav>

      <div className="container page">
        {" "}
        <div className="info">
          <h1>
            <span>Electronic passport application web platform</span>
          </h1>
          <p>Apply for your e-passport of choice at the comfort of your homes now!</p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
