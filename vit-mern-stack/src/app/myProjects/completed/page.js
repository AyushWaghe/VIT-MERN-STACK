"use client"

import ReduxProvider from "../../../store/redux-provider.js";
import CompletedProject from "./CompletedProject.js";

export default function homepagespotlight(){
    return(
        <ReduxProvider>
            <CompletedProject />
        </ReduxProvider>
    )
}