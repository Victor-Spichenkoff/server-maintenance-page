import { useState } from "react"
import { SelectApi } from "../functions/SelectApi"
import { ToggleItem } from "../functions/ToggleItem"

interface ISettingsArea {
    setForceUpdate: any
}


export const SettingsToggleArea = ({ setForceUpdate }: ISettingsArea) => {
    return (
        <div className="self-start mt-12 flex items-center justify-between w-full">
            <SelectApi setForceUpdate={setForceUpdate}/>

            <ToggleItem isChecked={true} onCheckChange={()=>{}} label="Keep API ON"/>
        </div>
    )
}