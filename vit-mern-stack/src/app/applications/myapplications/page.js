"use client"

import ReduxProvider from "../../../store/redux-provider.js";
import MyApplications from "./myApplications.js";


export default function loginPag() {
    return (
        <div>
            <ReduxProvider>
                <MyApplications />
            </ReduxProvider>

        </div>
    )
}