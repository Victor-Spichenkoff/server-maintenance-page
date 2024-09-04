import { Button } from "../ui/button"

interface IActionButton {
    label: string
    onClick?: (e?: any) => void
    disabled?: boolean
}


export const ActionButton = ({ label, onClick, disabled }: IActionButton) => {
    return (
        <Button onClick={onClick} 
            className="bg-highlight hover:bg-[#0a52a5] shadow-md" 
            disabled={disabled}
        >
            { label }
        </Button>
    )
}