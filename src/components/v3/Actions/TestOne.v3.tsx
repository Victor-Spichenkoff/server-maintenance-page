import {useServers} from "@/hooks/useServerItems";
import {ServerEntity} from "@/types/responses/server";
import {useState, useTransition} from "react";
import {IAllApis} from "@/types/allApis";
import axios from "axios";
import {baseUrl, baseUrlV2} from "@/global";
import {selectablePoints} from "@/data/selectablePoints";
import {ActionButton} from "@/components/template/ActionButton";
import {allApis} from "@/data/AllApis";
import {ToggleItem} from "@/components/utils/ToggleItem";
import {ActionStatus} from "@/components/functions/Actions/ActionStatus";
import {TestExtraActions} from "@/components/functions/Actions/TestExtraActions";
import axiosExternalCall from "@/lib/externalCallAxios";

interface ITestOneV3 {
    isAllApi?: boolean
}

let currentTimeout: any

export const TestOneV3 = ({ isAllApi }: ITestOneV3) => {
    let {
        data: servers,
        error,
    } = useServers();

    const [force, setForce] = useState(false)
    const [successStatus, setSuccessStatus] = useState("")
    const [showStatus, setShowStatus] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const [errorStatus, setErrorStatus] = useState("")
    const [callingId, setCallingId] = useState(-1)
    const [abortController, setAbortController] = useState<AbortController | null>(null)


    //simples
    const testOnlyOne = (id: number, fullUrl: string) => {
        const controller = new AbortController()
        setAbortController(controller)

        startTransition(async () => {
            try {
                    const res = await axiosExternalCall(fullUrl, {
                        signal: controller.signal,
                        timeout: 10_000
                    })

                    setSuccessStatus("Woking \n" + servers.filter((x: any) => x.id == id)[0].shortLabel)
                    await axios(`${baseUrlV2}/success-called/${id}`)
            } catch (e: any) {
                if (callingId >= 0)
                    setErrorStatus("Doesn't work")
                else if (e.status == 500)
                    setErrorStatus("Timeout Error")
                else
                    setErrorStatus("Unexpected error")
            }

            setCallingId(-1)
        })
    }

    //Usado quando force=true
    const recursiveRequest = async (times: number, id: number, allApiItem?: IAllApis) => {
        const controller = new AbortController()
        setAbortController(controller)

        startTransition(async () => {
            times += 1

            if (times > 10)
                return setErrorStatus("Limit of attempts reached! (10)")

            try {
                if (isAllApi && allApiItem) {
                    const res = await axiosExternalCall(allApiItem?.url, {
                        timeout: 8_000,
                        signal: controller.signal
                    })

                    setSuccessStatus("Working: " + allApiItem.label)
                } else {
                    const res = await axios(`${baseUrl}/test/one/${id}`, {
                        timeout: 8_000,
                        signal: controller.signal
                    })

                    setSuccessStatus(`Ligado\n` + res.data)

                }

                setCallingId(-1)
                return
            } catch (e: any) {

                if (e.code === 'ECONNABORTED')
                    setErrorStatus("Took too long")
                else if (e.status == 500)
                    setErrorStatus(`Error:
                        attempts: ${times}/10
                        wait 8 seconds...
                        `)
                else
                    setErrorStatus("Erro no request!")
            }


            currentTimeout = setTimeout(() => recursiveRequest(times, id, allApiItem), 10_000)
        })
    }


    //btn sem force
    const handleTestOneClick = (id: number, fullUrl: string) => {
        setShowStatus(true)
        setCallingId(Number(id))
        setErrorStatus("")
        setSuccessStatus("")
        testOnlyOne(id, fullUrl)
    }


    //com FORCE
    const handleForceStartOne = (id: number, allApiItem?: IAllApis) => {
        setShowStatus(true)
        setCallingId(id)
        setErrorStatus("")
        setSuccessStatus("")
        recursiveRequest(0, id, allApiItem)
    }


    //Cancelar
    const handleCancel = () => {
        abortController?.abort()
        clearTimeout(currentTimeout)
        setSuccessStatus("")
        setCallingId(-1)

        setTimeout(() => setErrorStatus(`CANCELLED`), 20)
    }


    //definição dos botões de ação
    let allButtons
    if(!isAllApi)// faz filtragem
        servers = servers?.filter((x:any) => x.isShowOnQuickActions)

        allButtons = servers.map((server: ServerEntity) => {
                       return (
                <ActionButton
                    label={callingId == server.id ? "Cancel" : server.shortLabel}
                    className={callingId == server.id ? "bg-error hover:bg-[#8d0b0b]" : ""}
                    onClick={() => {
                        if (callingId == server.id)
                            return handleCancel()

                        if (force)
                            handleForceStartOne(Number(server.id))
                        else
                            handleTestOneClick(Number(server.id), server.fullUrl)
                    }}
                    key={server.id}
                />
            )
        })

    const handleForceChange = () => setForce(!force)

    return (<>
        <h2 className="text-2xl text-center mt-8 mb-4">Test one</h2>
        <ToggleItem
            onCheckChange={handleForceChange}
            label="Force"
            isChecked={force}
        />
        <div className="flex mt-4">
            <div className="flex flex-col gap-2">
                {allButtons}
            </div>
            <ActionStatus
                successStatus={successStatus}
                errorStatus={errorStatus}
                isLoading={isLoading}
                showStatus={showStatus}
            />

        </div>

    </>)
}
