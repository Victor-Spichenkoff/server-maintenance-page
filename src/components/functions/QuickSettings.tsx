import { useCallback, useState, useTransition } from "react"
import { ActionButton } from "../template/ActionButton"
import { requestEndPointWithTimeout } from "@/utils/requets"
import axios, { AxiosError, isAxiosError } from "axios"
import { baseUrl } from "@/global"
import { ForceAll } from "./ForceAll"


var currentTimeout: NodeJS.Timeout
export const QuickSettings = () => {
    const [successStatus, setSuccessStatus] = useState("")
    const [showStatus, setShowStatus] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const [errorStatus, setErrorStatus] = useState("")
    // const []

    const resetValues = () => {
        setShowStatus(false)
        setErrorStatus("")
        setSuccessStatus("")
    }

    useCallback(() => {
        clearTimeout(currentTimeout)
        currentTimeout = setTimeout(() => resetValues(), 5000)
    }, [successStatus, errorStatus])

    const callApiOnce = () => {
        startTransition(async () => {
            resetValues()
            //para testes
            // const res: any = await requestEndPointWithTimeout('/timeout', 2)
            const res: any = await requestEndPointWithTimeout('/isOn', 10)

            if (typeof res.error == "string")
                setErrorStatus(res.error)

            if (res.error) {
                setErrorStatus("Erro inesperado!")
                console.log("Erro ao chamar a api 1 vez")
            }

            setShowStatus(true)
            setSuccessStatus(res.data)
        })
    }

    const allOnce = async () => {
        resetValues()
        setShowStatus(true)
        try {
            const res = await axios(`${baseUrl}/callAllOnce`, { timeout: 50_000 })

            console.log(res.data)

            if (res.data.isAllWorking)
                return setSuccessStatus(`Tudo funcionando \n${res.data.working}de${res.data.total}`)
            //nem todos

            const notWorkingNames = res.data.errors.join(", ")

            return setErrorStatus(`ERRO:
                ${res.data.working} de ${res.data.total}
                Errados: ${notWorkingNames}`)

        } catch (e) {
            console.log(e)
            const error = e as AxiosError

            if (error.code === 'ECONNABORTED')
                return setErrorStatus("Demorou Muito")

            setErrorStatus("Erro na requisição")
        }
    }

    //ERROR QUNADO TODAS ESTÂO FUNCIONANOD, FORCEaLL == TRUE, O FORCE ONCE RETORNA UM ERRO
    //DICAS> QUANDO TUDO CERTO, A API RETORNA 10004 no número das que estão funcoiando (worknig)

    return (<>
        <div className="w-full flex flex-col items gap-y-2 flex-[1]">
            <ActionButton label="Chamar API" onClick={callApiOnce} />
            <ActionButton label="Chamar Todos" onClick={allOnce} />
            <ForceAll 
                setSuccessStatus={setSuccessStatus} 
                setErrorStatus={setErrorStatus}
                setShowStatus={setShowStatus}
                startTransition={startTransition}
            />
        </div>
        {showStatus && !isLoading ? (
            <div className={`flex flex-[2] justify-center items-center
                border ml-8
                ${successStatus && 'border-sucess text-sucess p-2'}  
                ${errorStatus && 'border-error text-error p-2'}
                rounded-md`}>

                <div style={{ whiteSpace: 'pre-line' }}>
                    {errorStatus}
                </div>
                <div style={{ whiteSpace: 'pre-line' }}>
                    {successStatus}
                </div>
            </div>

        ) : (
            !isLoading && (<div className="flex flex-[2]"></div>)
        )}

        {isLoading && (
            <div className="flex flex-[2] justify-center items-center
                border border-gray-blue ml-8 
                rounded-md">
                Carregando...
            </div>)}
    </>)
}