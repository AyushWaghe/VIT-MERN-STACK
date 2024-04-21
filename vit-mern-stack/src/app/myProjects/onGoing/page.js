"use client"

import ReduxProvider from "../../../store/redux-provider.js";
// import LoginPage from "./loginPage";
import OnGoingProjects from "./onGoingProjects";

export default function page(){
    return(
        <ReduxProvider>
            <OnGoingProjects />
        </ReduxProvider>
    )
}