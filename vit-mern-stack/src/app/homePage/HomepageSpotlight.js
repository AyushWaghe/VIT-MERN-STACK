"use client"
import React from "react";
import './HomepageSpotlight.css';
import Header from "../components/layout/Header";
// import { useAppSelector } from "../../store/index.js";
import { useSelector } from "react-redux";

const HomepageSpotlight = () => {
  const user = useSelector((state) => state.user);
  const userName = user.user.userName;
  // const user = useAppSelector((state)=>state.user.userName);
  console.log("adsasd",userName);
  return (

    <div className="homePageMasterContainer">
      <div style={{ "position": "fixed", "zIndex": "5", "width": "100%" }}>
        <Header />
      </div>


      <div className="homePageContentContainer">

        <div className="navBarContainer">
        sd
        </div>

        <div className="SpotLightContainer">

          <div className="SpotLightContainerHeader">
            <span className="headerSpotlight">Spotlight</span>
          </div>

          <div style={{ "height": "1000px" }}>

          </div>
        </div>

      </div>

    </div>
  )
}

export default HomepageSpotlight;