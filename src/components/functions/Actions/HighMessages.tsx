import { useEffect, useState, useTransition } from "react"

import axios from "axios"
import { baseUrl } from "@/global"

import { useToast } from "@/hooks/use-toast"
import { ShowMessage } from "@/components/utils/ShowMessage"
import { ToggleItem } from "@/components/utils/ToggleItem"
import { Toaster } from "@/components/ui/toaster"
import { Loading } from "@/components/utils/Loading"



export const HighMessages = () => {
    const [isOn, setIsOn] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const { toast } = useToast()

    const handleClick = () => {
        startTransition(async () => {
            try {
                const res = await axios(`${baseUrl}/hightMenssages/toggle`)
                setIsOn(res.data)
                ShowMessage("Changing High Message", "success", toast)
            } catch {
                ShowMessage("ERROR: Can't Change High Messages", "error", toast)
            }
        })
    }

    useEffect(() => {
        axios(`${baseUrl}/hightMenssages/status`)
            .then(res => setIsOn(res.data))
            .catch(res => ShowMessage("ERROR: Frequent Messages", "error", toast))
    }, [])

    return (
        <div className="mb-6">
            <ToggleItem
                label="Frequent Messages"
                isChecked={isOn}
                onCheckChange={handleClick}
            />
            <Toaster />
            <Loading isLoading={isLoading} />
        </div>
    )
}
