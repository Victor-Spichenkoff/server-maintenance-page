import { Topic } from "./Topic"

export const ManualTitle = ({ text, level }: { text: string, level: "45" | "40" | "35" | "25" }) => {
    return (
        <h2
            className={`mt-8 text-white`}
            style={{ fontSize: `${level}px` }}
        >
            {text}
        </h2>
    )
}