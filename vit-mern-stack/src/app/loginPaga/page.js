"use client"

import ReduxProvider from "../../store/redux-provider.js";
import LoginPage from "./LoginPage.js";

const loginPag=()=>{
    return(
        <ReduxProvider>
            <LoginPage />
        </ReduxProvider>
    )
}
export default loginPag;