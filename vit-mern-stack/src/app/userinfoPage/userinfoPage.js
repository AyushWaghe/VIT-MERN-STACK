"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import './userinfoPage.css';
import {useSearchParams } from 'next/navigation'
import Header from "../components/layout/Header.js";
import { useSelector } from "react-redux";
import NavBar from "../components/navbar/page.js";
import UserInfoComponent from "../components/userinfo/page";

const UserInfoPage = () => {

    const user = useSelector((state) => state.user);
    const userIDFromState = user.user.userName;

    const [userProfile, setUserProfile] = useState([]);
    let userID;
    const searchParams = useSearchParams();
    const userIDFromSearchParam= searchParams.get('userID');

    if(userIDFromSearchParam){
        userID=userIDFromSearchParam;
    }else{
        userID=userIDFromState
    }

    console.log("USER ID GOT IS ", userID);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('./api/getUserProfile', {
                method: 'POST',
                body: JSON.stringify({ userID }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setUserProfile(data.user);
            // console.log("USer data is ", data.user);
        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);

    console.log("Adasdasd",userProfile);

    return (
        <div className="userinfoPageMasterContainer">
            <div style={{ "position": "fixed", "zIndex": "5", "width": "100%" }}>
                <Header />
                {/* {userName} */}
            </div>


            <div className="userinfoPageContentContainer">

                <div className="navBarContainer">
                    <NavBar />
                </div>

                <div className="SpotLightContainer">

                    <div className="SpotLightContainerHeader">
                        <span className="headerSpotlight">Profile</span>
                    </div>

                    <div className="displayUserProfile">
                        {
                            userProfile.role===0 ? (
                                <UserInfoComponent
                                userid={"21BCE0717"}
                                email={userProfile.email}
                                school={userProfile.school}
                                branch={userProfile.branch}
                                degree={userProfile.degree}
                                skills={userProfile.skills}
                                links={userProfile.links}
                                name={userProfile.name}
                                />
                            ):(
                                <h1>sdfsfd</h1>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserInfoPage;