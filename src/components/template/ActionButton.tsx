import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

interface IActionButton {
    label?: string
    onClick?: (e?: any) => void
    disabled?: boolean
    className?: string
}


export const ActionButton = ({ label, onClick, disabled, className }: IActionButton) => {
    return (
        <Button onClick={onClick} 
            className={cn("bg-highlight hover:bg-[#0a52a5] shadow-md", className)} 
            disabled={disabled}
        >
            { label }
        </Button>
    )
}