"use client"

import ReduxProvider from "../../store/redux-provider";
import UserInfoPage from "./userinfoPage.js";

export default function homepagespotlight(){
    return(
        <ReduxProvider>
            <UserInfoPage />
        </ReduxProvider>
    )
}