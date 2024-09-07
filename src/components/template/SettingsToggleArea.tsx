import { useState } from "react"
import { SelectApi } from "../functions/SelectApi"
import { ToggleItem } from "../functions/ToggleItem"
import { QuickSettings } from "../functions/QuickSettings"

interface ISettingsArea {
    setForceUpdate: any
}


export const SettingsToggleArea = ({ setForceUpdate }: ISettingsArea) => {


    return (<>
        <div className="self-start mt-12 flex items-center justify-between w-full">
            <SelectApi setForceUpdate={setForceUpdate} />

            <ToggleItem isChecked={true} onCheckChange={() => { }} label="Keep API ON" />

        </div>
        <div className="mt-12 w-full">
            <h2 className="text-2xl text-center">Ações</h2>
            <div className="w-full flex mt-5">
                <QuickSettings />

            </div>

        </div>
    </>)
}