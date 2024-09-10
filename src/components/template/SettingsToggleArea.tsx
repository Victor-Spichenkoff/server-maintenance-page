import { useEffect, useState } from "react"
import { SelectApi } from "../functions/SelectApi"
import { ToggleItem } from "../functions/ToggleItem"
import { QuickSettings } from "../functions/QuickSettings"
import axios from "axios"
import { baseUrl } from "@/global"
import { TimeMonitoringArea } from "./TimeMonitoringArea"

interface ISettingsArea {
    setForceUpdate: any
}


export const SettingsToggleArea = ({ setForceUpdate }: ISettingsArea) => {
    const [isApiOn, setIsApiOn] = useState(false)

    const handleApiStateChange = () => {
        const newStatus = !isApiOn

        const endpoint = newStatus ? "/keepApiOn" : '/turnOffThis'
        axios(`${baseUrl}${endpoint}`)
            .then(res => {
                console.log(res.data)
                if(res.data == "Iniciado")
                    setIsApiOn(true)
                else
                    setIsApiOn(false)
            })
    }

    useEffect(() => {
        axios(`${baseUrl}/apiStatus`)
            .then(res => setIsApiOn(res.data))
            .catch(res => setIsApiOn(false))
    }, [])


    return (<>
        <div className="self-start mt-12 flex items-center justify-between w-full">
            <SelectApi setForceUpdate={setForceUpdate} />

            <ToggleItem isChecked={isApiOn} onCheckChange={handleApiStateChange} label="Keep API ON" />

        </div>
        <div className="mt-12 w-full">
            <h2 className="text-2xl text-center">Ações</h2>
            <div className="w-full flex mt-5">
                <QuickSettings />

            </div>
        </div>
    </>)
}