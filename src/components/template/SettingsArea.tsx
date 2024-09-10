"use client"

import { useState } from "react"
import { Status } from "../functions/Status"
import { SettingsToggleArea } from "./SettingsToggleArea"
import { TimeMonitoringArea } from "./TimeMonitoringArea"

export const SettingsArea = () => {
    const [forceUpdate, setForceUpdate] = useState()

    return (
        <main className="flex flex-col items-center p-8">
            <Status update={forceUpdate} />
            <SettingsToggleArea setForceUpdate={setForceUpdate}/>
            <TimeMonitoringArea />
        </main>
    )
}