import { CircleGraphic } from "@/components/functions/TimeMonitoring/Graphic"
import { baseUrl } from "@/global"
import { IRemaningResponse } from "@/types/remaning"
import axios from "axios"
import { useEffect, useState, useTransition } from "react"
import { RotateCw } from 'lucide-react'

export const TimeMonitoringArea = () => {
    const [times, setTimes] = useState<IRemaningResponse | null>(null)
    const [isLoading, startTransition] = useTransition()

    const getInfos = async () => {
        startTransition(async () => {
            try {
                const res = await axios(`${baseUrl}/usage/both`)
                setTimes(res.data)

            } catch {
                setTimes(null)
            }
        })

    }


    useEffect(() => {
        getInfos()
    }, [])


    return (
        <div className="mt-24 mb-40 w-full text-center">
            <div className="flex justify-center relative">
            <h2 className="text-2xl text-center">Tempos</h2>
                <div
                    onClick={getInfos}
                    className="absolute right-8"
                    >
                    <RotateCw className={`${isLoading && "animate-spin"} `}/>
                </div>
            </div>
            {times && (
                <div className="mt-8 flex flex-col flex-wrap w-full">
                    <CircleGraphic className="border-r border-gray-500"
                        remaningHours={times.main.hours}
                        remaningMinutes={times.main.minutes}
                        title="Main"
                    />
                    <CircleGraphic className="border-r border-gray-500"
                        remaningHours={times.this.hours}
                        remaningMinutes={times.this.minutes}
                        title="This"
                    />
                    {/* <CircleGraphic className="border-l border-gray-500" /> */}

                </div>
            )}

            {!times && (
                <div>SEM DADOS</div>
            )}
        </div>
    )
}