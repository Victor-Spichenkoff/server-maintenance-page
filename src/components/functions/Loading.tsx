import React from "react"
import { CircularProgress } from "@nextui-org/progress"
// import {CircularProgress} from "@nextui-org/react"

interface ILoading {
    isLoading: boolean
}

export const Loading = ({ isLoading }: ILoading) => {
    if (!isLoading) return null

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-50">
            <div className="flex h-full w-full items-center justify-center overflow-hidden">
                <CircularProgress
                    classNames={{
                        svg: "w-[160px] h-[160px]",
                        indicator: "stroke-highlight",
                        track: "stroke-white/10",
                        value: "text-3xl font-semibold text-white w-full",
                    }}
                    strokeWidth={4}
                    size="lg"
                    aria-label="Loading..."
                    color="success"
                />

            </div>
        </div>
    )
}