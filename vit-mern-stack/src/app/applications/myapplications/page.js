"use client"

import ReduxProvider from "../../../store/redux-provider.js";
import MyApplications from "./myApplications";

export default function loginPag() {
    return (
        <div>
            <ReduxProvider>
                <MyApplications />
            </ReduxProvider>

        </div>
    )
}