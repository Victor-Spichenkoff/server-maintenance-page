import { CircleGraphic } from "@/components/functions/Time/Graphic"
import { baseUrl } from "@/global"
import { IRemaningResponse } from "@/types/remaning"
import axios from "axios"
import { useEffect, useState, useTransition } from "react"
import { RotateCw } from 'lucide-react'
import { Loading } from "../utils/Loading"
import { ChangeTime } from "../functions/Time/ChangeTimes"

export const TimeMonitoringArea = () => {
    const [times, setTimes] = useState<IRemaningResponse | null>(null)
    const [isLoading, startTransition] = useTransition()
    const [isError, setIsError] = useState(false)

    const getInfos = async () => {
        startTransition(async () => {
            try {
                const res = await axios(`${baseUrl}/usage/both`)
                setTimes(res.data)
                setIsError(false)

            } catch {
                setTimes(null)
                setIsError(true)
            }
        })

    }


    useEffect(() => {
        axios(`${baseUrl}/usage/both`)
            .then(res => {
                setTimes(res.data)
                setIsError(false)
            })
            .catch(() => {
                setTimes(null)
                setIsError(true)
            })
    }, [])


    return (
        <div className="mt-24 mb-40 w-full text-center">
            <Loading isLoading={isLoading} />
            <div className="flex justify-center relative">
                <h2 className="text-2xl text-center">Time Monitoring</h2>
                <div
                    onClick={getInfos}
                    className="absolute right-8"
                >
                    <RotateCw className={`
                        ${isLoading && "animate-spin"} 
                        hover:animate-spin
                        `} />
                </div>
            </div>
            {times && (<>
                <div className="mt-5 p-4 rounded-lg bg-gray-800 text-white shadow-md">
                    <div className="flex items-center gap-2">
                        <span className="text-green-400">🕒</span>
                        <span className="font-semibold">Start:</span>
                        <span>{times.lastStart ?? "Not started yet"}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-red-400">🔻</span>
                        <span className="font-semibold">Last Discount:</span>
                        <span>{times.lastDiscount ?? "Undone"}</span>
                    </div>
                </div>

                <div className="mt-8 flex flex-col flex-wrap w-full">
                    <CircleGraphic className="border-r border-gray-500"
                        remaningHours={times.main.hours}
                        remaningMinutes={times.main.minutes}
                        title="Main"
                    />
                    <CircleGraphic
                        className="border-r border-gray-500"
                        remaningHours={times.this.hours}
                        remaningMinutes={times.this.minutes}
                        title="This"
                    />

                </div>


            </>)}

            {!times && !isError && (
                <div className="mt-24 text-highlight">NO DATA</div>
            )}
            {!times && isError && (
                <div className="mt-24 text-error">ERRO: Can&apos;t get data</div>
            )}


            <ChangeTime />


        </div>
    )
}
