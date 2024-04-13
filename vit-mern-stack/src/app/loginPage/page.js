"use client"

import ReduxProvider from "../../store/redux-provider";
import LoginPage from "./loginPage";

export default function loginPag(){
    return(
        <ReduxProvider>
            <LoginPage />
        </ReduxProvider>
    )
}