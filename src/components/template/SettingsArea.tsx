"use client"

import { Status } from "../functions/Status"
import { SettingsToggleArea } from "./SettingsToggleArea"

export const SettingsArea = () => {
    return (
        <main className="flex flex-col items-center p-8">
            <Status update={""} />
            <SettingsToggleArea />
        </main>
    )
}