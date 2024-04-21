"use client"

import ReduxProvider from "../../store/redux-provider";
import HomepageSpotlight from "./HomepageSpotlight";

export default function homepagespotlight(){
    return(
        <ReduxProvider>
            <HomepageSpotlight />
        </ReduxProvider>
    )
}