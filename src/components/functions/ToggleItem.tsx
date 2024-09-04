import { Switch } from "../ui/switch"

interface IToggleItem {
    value: boolean
    setValue: (v: boolean) => void
}


export const ToggleItem = ({value, setValue}: IToggleItem) => {
    const toggleValue = () => {
        setValue(!value)
    }


    return (
        <div>
            <Switch 
                checked={value}
                onCheckedChange={toggleValue}
                />
            
        </div>
    )
}