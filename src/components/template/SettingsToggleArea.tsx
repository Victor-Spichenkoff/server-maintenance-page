import { ToggleItem } from "../functions/ToggleItem"
import { ActionButton } from "./ActionButton"

export const SettingsToggleArea = () => {
    return (
        <div className="self-start mt-12">
            <ActionButton label="Selecionar"/>

            <ToggleItem value={true} setValue={()=>{}} />
        </div>
    )
}