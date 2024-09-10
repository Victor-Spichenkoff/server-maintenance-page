import { CircleGraphic } from "@/components/functions/TimeMonitoring/Graphic"
import { baseUrl } from "@/global"
import { IRemaningResponse } from "@/types/remaning"
import axios from "axios"
import { useEffect, useState } from "react"

export const TimeMonitoringArea = () => {
    const [times, setTimes] = useState<IRemaningResponse |null>(null)
    
    useEffect(()=> {
        axios(`${baseUrl}/usage/both`)  
            .then(res => {
                setTimes(res.data)
            })
            .catch(()=> setTimes(null))
    }, [])


    return (
        <div className="mt-24 mb-40 w-full text-center">
            TEMPO
            { times && (
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
            ) }

            { !times && (
                <div>SEM DADOS</div>
            )  }
        </div>
    )
}