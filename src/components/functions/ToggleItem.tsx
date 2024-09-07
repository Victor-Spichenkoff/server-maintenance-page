import { useEffect, useState } from "react"
import { Switch } from "../ui/switch"

interface IToggleItem {
    isChecked?: boolean
    label: string
    onCheckChange: () => any
}


export const ToggleItem = ({ isChecked, label, onCheckChange }: IToggleItem) => {

    const handleCheckChange = () => {
        onCheckChange()
    }


    return (
        <div className="flex items-center">
            <Switch
                checked={isChecked || false}
                onCheckedChange={handleCheckChange}
            />
            <span className="ml-2">{label}</span>
        </div>
    )
}