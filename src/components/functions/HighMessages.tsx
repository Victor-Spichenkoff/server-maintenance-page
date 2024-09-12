import { useEffect, useState, useTransition } from "react"
import { ToggleItem } from "./ToggleItem"
import axios from "axios"
import { baseUrl } from "@/global"
import { ShowMessage } from "./ShowMessage"
import { useToast } from "@/hooks/use-toast"
import { Loading } from "./Loading"
import { Toaster } from "../ui/toaster"

export const HighMessages = () => {
    const [isOn, setIsOn] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const { toast } = useToast()

    const handleClick = () => {
        startTransition(async () => {
            try {
                const res = await axios(`${baseUrl}/hightMenssages/toggle`)
                setIsOn(res.data)
                ShowMessage("Mudado High Message", "success", toast)
            } catch {
                ShowMessage("ERROR: Mudar High Messages", "error", toast)
            }
        })
    }

    useEffect(() => {
        axios(`${baseUrl}/hightMenssages/status`)
            .then(res => setIsOn(res.data))
            .catch(res => ShowMessage("ERROR: High Messages", "error", toast))
    }, [])

    return (
        <div className="mb-6">
            <ToggleItem
                label="High Messages"
                isChecked={isOn}
                onCheckChange={handleClick}
            />
            <Toaster /> 
            <Loading isLoading={isLoading} />
        </div>
    )
}