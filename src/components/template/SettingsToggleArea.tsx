import { useEffect, useState, useTransition } from "react"
import { SelectApi } from "../functions/SelectApi"
import { ToggleItem } from "../functions/ToggleItem"
import { QuickSettings } from "../functions/QuickSettings"
import axios from "axios"
import { baseUrl } from "@/global"
import { TimeMonitoringArea } from "./TimeMonitoringArea"
import { Loading } from "../functions/Loading"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "../ui/toaster"
import { ShowMessage } from "../functions/ShowMessage"

interface ISettingsArea {
    setForceUpdate: any
    forceUpdate?: any
}


export const SettingsToggleArea = ({ setForceUpdate, forceUpdate }: ISettingsArea) => {
    const [isApiOn, setIsApiOn] = useState(false)
    const [isLoading, startTransition] = useTransition()

    useEffect(() => {}, [forceUpdate])

    const { toast } = useToast()

    const handleApiStateChange = () => {
        const newStatus = !isApiOn

        const endpoint = newStatus ? "/keepApiOn" : '/turnOffThis'
        startTransition(async () => {
            try {
                const res = await axios(`${baseUrl}${endpoint}`)
                if(res.data == "Iniciado")
                    setIsApiOn(true)
                else
                    setIsApiOn(false)

                ShowMessage("Mudado com Sucesso", 'success', toast)
            } catch {
                ShowMessage("Erro ao mudar API", 'error', toast)
            }
        })
    }

    useEffect(() => {
        axios(`${baseUrl}/apiStatus`)
            .then(res => setIsApiOn(res.data))
            .catch(res => setIsApiOn(false))
    }, [forceUpdate])


    return (<>
    <Loading isLoading={isLoading} />
    <Toaster /> 
        <div className="self-start mt-12 flex items-center justify-between w-full">
            

            <SelectApi 
                setForceUpdate={setForceUpdate} 
                forceUpdate={forceUpdate}
                />

            <ToggleItem 
            isChecked={isApiOn} 
            onCheckChange={handleApiStateChange} 
            label="Keep API ON" 
            setForceUpdate={setForceUpdate}
            />

        </div>
        <div className="mt-12 w-full">
            <h2 className="text-2xl text-center">Ações</h2>
            <div className="w-full flex mt-5">
                <QuickSettings />
            </div>
        </div>
    </>)
}