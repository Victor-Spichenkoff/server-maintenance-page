import { Topic } from "./Topic"

export const ManualTitle = ({ text, level }: { text: string, level: 40 | 35 | 25 }) => {
    return ( 
        <h2 className={`text-[${level}px] mt-6`}>
            { text }
        </h2>

    )
}