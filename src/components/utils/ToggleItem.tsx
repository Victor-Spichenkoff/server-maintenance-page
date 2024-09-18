import { useEffect, useState } from "react"
import { Switch } from "../ui/switch"
import { cn } from "@/lib/utils"

interface IToggleItem {
    isChecked?: boolean
    label: string
    onCheckChange: () => any
    setForceUpdate?: any
    className?: string
}


export const ToggleItem = ({ isChecked, label, onCheckChange, setForceUpdate, className }: IToggleItem) => {

    const handleCheckChange = () => {
        onCheckChange()
        setForceUpdate(Math.random())
    }


    return (
        <div className={cn("flex items-center w-fit", className)}>
            <Switch
                checked={isChecked || false}
                onCheckedChange={handleCheckChange}
            />
            <span className="ml-2">{label}</span>
        </div>
    )
}