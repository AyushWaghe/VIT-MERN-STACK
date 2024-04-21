"use client"

import ReduxProvider from "../../../store/redux-provider.js";
import RecApplications from "./recApplications";

export default function loginPag() {
    return (
        <div>
            <ReduxProvider>
                <RecApplications />
            </ReduxProvider>

        </div>
    )
}