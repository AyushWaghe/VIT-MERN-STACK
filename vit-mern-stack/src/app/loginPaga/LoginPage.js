"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import Header from "../components/layout/Header.js";
import Footer from "../components/layout/Footer.js";
import './loginPage.css';
import { useAppDispatch } from "../../store/index.js";
import { login } from "../../store/userSlice.js";

const LoginPage=()=> {

    const dispatch=useAppDispatch();

    const router = useRouter()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        
    
        try {
            const response = await fetch("/api/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            const data = await response.json();
            console.log("Sexy ayu",data);
    
            if (data.success) {

                dispatch(login({userName:data.userID}));
                console.log("userID is",data.userID);

                console.log("Broyah!!!")
                router.push('/homePage');
            }

    
            // Handle other cases or display messages based on response data
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    

    // const handleCaptchaSubmit = () => { };

    return (
        <div className="Master" style={{}}>
            <div className="header" style={{ "height": "10vh", "width": "100%" }}>
                <Header />
            </div>
            <div className="wrapper">
                <div className="loginDiv">
                    <div className="blueLine"></div>
                    <div className="loginTextDiv">
                        <p className="loginHeader">Login</p>
                    </div>
                </div>

                <div className="inputDiv">
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <label htmlFor="username"></label>
                                <input
                                    type="text"
                                    className="inputField"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="inputBox">
                                <label htmlFor="password"></label>
                                <input
                                    type="password"
                                    className="inputField"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="captcha">
                                <div className="preview"></div>

                                <label htmlFor="Captcha"></label>
                                <input
                                    type="text"
                                    className="inputField"
                                    id="Captcha"
                                    name="Captcha"
                                    placeholder="Enter Captcha"
                                    required
                                    value={captcha}
                                    onChange={(e) => setCaptcha(e.target.value)}
                                />
                            </div>

                            <div className="submitButton">
                                <button type="submit" className="Submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="forgot">
                        <div className="forgot-Password">
                            <a href="#">Forgot Password</a>
                        </div>
                        <div className="forgot-login">
                            <a href="#">Forgot LoginID</a>
                        </div>
                        <div className="Go-to-home">
                            <a href="#">Go To Home Page</a>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ "display": "flex", "justifyContent": "center", "width": "100%", "backgroundColor": "black" }}>
                <Footer />
            </div>
        </div>
    )
}

export default LoginPage;
