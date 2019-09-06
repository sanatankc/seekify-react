import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { ReactComponent as StarsBG } from "../../svg/starsBG.svg";
import { ReactComponent as Logo } from "../../svg/logo.svg";
import "./Home.css";
import debounce from "../../debounce";

function App() {
  useEffect(() => {
    window.addEventListener('resize', debounce(() => {
      console.log(window.innerHeight)
      document.querySelector('.main').style.height = `${window.innerHeight}px`
      document.querySelector('.main-area').style.height = `${window.innerHeight}px`
    }, 50))
  }, [])
  return (
    <>
      <div className="main" style={{ width: '100%', height: window.innerHeight }}>
        <div className="stars-container">
          <StarsBG />
        </div>
      </div>
      <div className="main-area" style={{ width: '100%', height: window.innerHeight }}>
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
          <Link to='/game' style={{ textDecoration: 'none' }}>
            <div className="lets-go-button">Let's go</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
