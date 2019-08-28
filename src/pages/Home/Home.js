import React from "react";
import { ReactComponent as StarsBG } from "../../svg/starsBG.svg";
import { ReactComponent as Logo } from "../../svg/logo.svg";
import "./Home.css";

function App() {
  return (
    <>
      <div className="main">
        <div className="stars-container">
          <StarsBG />
        </div>
      </div>
      <div className="main-area">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Logo />
          <div className="description">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore
          </div>
          <div className="lets-go-button">Let's go</div>
        </div>
      </div>
    </>
  );
}

export default App;
