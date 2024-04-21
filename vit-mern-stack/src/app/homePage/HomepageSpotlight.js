"use client"
import React from "react";
import { useRouter } from 'next/navigation'
import './HomepageSpotlight.css';
import Header from "../components/layout/Header";
// import { useAppSelector } from "../../store/index.js";
import { useSelector } from "react-redux";
import NavBar from "../components/navbar/page.js";

const HomepageSpotlight = () => {
  const router = useRouter()
  const user = useSelector((state) => state.user);
  const userName = user.user.userName;
  console.log("adsasd",userName);

  const handle= ()=>{
    console.log("CLickc CLICckc",userName);
    router.push('/myProjects/onGoing');
  }

  return (

    <div className="homePageMasterContainer">
      <div style={{ "position": "fixed", "zIndex": "5", "width": "100%" }}>
        <Header />
        {userName}
      </div>


      <div className="homePageContentContainer">

        <div className="navBarContainer">
          <NavBar />
        </div>

        <div className="SpotLightContainer">
        

          <div className="SpotLightContainerHeader">
            <span className="headerSpotlight">Spotlight</span>
          </div>

          <div style={{ "height": "1000px" }}>
          <button onClick={handle}>Click</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default HomepageSpotlight;