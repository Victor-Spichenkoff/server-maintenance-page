import { AlertTriangle } from "lucide-react"

export const Alert = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="border-2 border-error bg-error/65 px-4 py-2 text-sm rounded-lg shadow-lg mt-4 mb-8">
            <div className="flex items-center justify-center gap-x-2 ">
                <AlertTriangle />
                {children}
            </div>

        </div>
    )
}