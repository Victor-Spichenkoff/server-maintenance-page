import { useEffect, useState } from "react"
import { Switch } from "../ui/switch"

interface IToggleItem {
    isChecked?: boolean
    label: string
    onCheckChange: () => any
    setForceUpdate?: any
}


export const ToggleItem = ({ isChecked, label, onCheckChange, setForceUpdate }: IToggleItem) => {

    const handleCheckChange = () => {
        onCheckChange()
        setForceUpdate(Math.random())
    }


    return (
        <div className="flex items-center w-fit">
            <Switch
                checked={isChecked || false}
                onCheckedChange={handleCheckChange}
            />
            <span className="ml-2">{label}</span>
        </div>
    )
}