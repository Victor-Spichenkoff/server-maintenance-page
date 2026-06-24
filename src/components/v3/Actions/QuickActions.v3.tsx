"use client"

import {useState, useTransition} from "react";
import {requestEndPointWithTimeout} from "@/utils/requets";
import axios, {AxiosError} from "axios";
import {HighMessages} from "@/components/functions/Actions/HighMessages";
import {ActionButton} from "@/components/template/ActionButton";
import {ForceAll} from "@/components/functions/Actions/ForceAll";
import {ActionStatus} from "@/components/functions/Actions/ActionStatus";
import {TestOneV3} from "@/components/v3/Actions/TestOne.v3";
import {useServers} from "@/hooks/useServerItems";
import axiosExternalCall from "@/lib/externalCallAxios";
import {ServerEntity} from "@/types/responses/server";
import {useQueryClient} from "@tanstack/react-query";
import {baseUrlV2} from "@/global";

let currentTimeout: NodeJS.Timeout

export const QuickActionV3 = () => {
    const [successStatus, setSuccessStatus] = useState("")
    const [showStatus, setShowStatus] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const [errorStatus, setErrorStatus] = useState("")
    const [abortController, setAbortController] = useState<AbortController | null>(null)
    let times = 0

    let notWorkingLabels: string[] = []
    let workingLabels: string[] = []
    let {
        data: servers
    } = useServers()
    const queryClient = useQueryClient()

    const resetValues = () => {
        setShowStatus(false)
        setErrorStatus("")
        setSuccessStatus("")
        notWorkingLabels = []
        times = 0
    }

    // useCallback(() => {
    //     clearTimeout(currentTimeout)
    //     currentTimeout = setTimeout(() => resetValues(), 5000)
    // }, [successStatus, errorStatus])

    const callThisApiOnce = () => {
        startTransition(async () => {
            resetValues()

            //para testes
            // const res: any = await requestEndPointWithTimeout('/timeout', 2)
            const res: any = await requestEndPointWithTimeout('/isOn', 10)
            if (typeof res.error == "string")
                setErrorStatus(res.error)

            if (res.error) {
                setErrorStatus("Unexpected error!")
                console.log("Error calling api once")
            }

            setShowStatus(true)
            setSuccessStatus(res.data)
        })
    }

    const allOnce = async () => {
        if(!servers)
            return
        resetValues()
        setShowStatus(true)
        const controller = new AbortController()
        setAbortController(controller)
        for (let server of servers) {
            startTransition(async () => {
                try {
                    await axiosExternalCall(server.fullUrl, {timeout: 6_000, signal: controller.signal})

                    workingLabels.push(server.shortLabel)
                    await axios(`${baseUrlV2}/success-called/${server.id}`)
                    await queryClient.invalidateQueries({queryKey: ['servers']})
                    setSuccessStatus(controller ? `Working: ${server.shortLabel}` : `Working: ${servers.length - notWorkingLabels.length}/${servers.length}`)

                    // se último, mostrar apenas o resumo:
                    if(workingLabels.length + notWorkingLabels.length >= servers.length) {
                        setSuccessStatus(`Working: ${workingLabels.join(", ")}\n${workingLabels.length}/${servers.length}`)
                        setAbortController(null)
                    }
                } catch (e) {
                    console.log(e)
                    const error = e as AxiosError
                    notWorkingLabels.push(server.shortLabel)

                    if (error.code === 'ECONNABORTED')
                        return setErrorStatus("Timeout exception" +
                            `\nNotWorking: ${notWorkingLabels.join((", "))}`+
                            `\n${servers.length - notWorkingLabels.length}/${servers.length}`)

                    setAbortController(null)
                    setErrorStatus("Unexpected Error")
                }
            })
        }


    }

    const handleCancel = () => {
        abortController?.abort()
        clearTimeout(currentTimeout)
        setSuccessStatus("")
        setAbortController(null)

        setTimeout(() => setErrorStatus(`CANCELED: Call all`), 20)
    }

    return (
        <div className="flex flex-col w-full">
            <HighMessages/>
            <div className="flex">

                <div className="w-full flex flex-col items gap-y-2 flex-[1]">
                    <ActionButton label="Call API" onClick={callThisApiOnce}/>
                    <ActionButton
                        label={!abortController ? "Call All" : "Cancel"}
                        onClick={!abortController ? allOnce : handleCancel}
                        className={!abortController ? "" : "bg-error hover:bg-[#8d0b0b]"}
                    />
                    <ForceAll
                        setSuccessStatus={setSuccessStatus}
                        setErrorStatus={setErrorStatus}
                        setShowStatus={setShowStatus}
                        startTransition={startTransition}
                    />
                </div>
                <ActionStatus
                    successStatus={successStatus}
                    errorStatus={errorStatus}
                    isLoading={isLoading}
                    showStatus={showStatus}
                />
            </div>

            <TestOneV3/>
        </div>
    )
}


const mapNotWorking = (servers: ServerEntity[], workingLabels: string) => {
    return servers.filter(s => !workingLabels.includes(s.shortLabel))
}
