"use client"

import ReduxProvider from "../../../store/redux-provider.js";
// import LoginPage from "./loginPage";
import OnGoingProjects from "./onGoingProjects";

export default function loginPag(){
    return(
        <ReduxProvider>
            <OnGoingProjects />
        </ReduxProvider>
    )
}