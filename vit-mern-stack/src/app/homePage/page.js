"use client"

import ReduxProvider from "../../store/redux-provider";
import HomepageSpotlight from "./HomepageSpotlight";

export default function loginPag(){
    return(
        <ReduxProvider>
            <HomepageSpotlight />
        </ReduxProvider>
    )
}