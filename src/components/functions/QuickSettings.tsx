import { useCallback, useState, useTransition } from "react"
import { ActionButton } from "../template/ActionButton"
import { requestEndPointWithTimeout } from "@/utils/requets"
import axios from "axios"

export const QuickSettings = () => {
    const [successStatus, setSuccessStatus] = useState("")
    const [showStatus, setShowStatus] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const [errorStatus, setErrorStatus] = useState("")

    const resetValues = () => {
        setShowStatus(false)
        setErrorStatus("")
        setSuccessStatus("")
    }

    useCallback(() => setTimeout(() => resetValues(), 5000), [successStatus, errorStatus])

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
        const res = await axios("/")
    }


    return (<>
        <div className="w-full flex flex-col items gap-y-2 flex-[1]">
            <ActionButton label="Chamar API" onClick={callApiOnce} />
            <ActionButton label="Chamar Todos" />
            <ActionButton label="Forçar Todos" />
        </div>
        {showStatus && !isLoading ? (
            <div className={`flex flex-[2] justify-center items-center
                border ml-8
                ${ successStatus && 'border-sucess text-sucess'}  
                ${errorStatus && 'border-error text-error'}
                rounded-md`}>
                { successStatus }
                {errorStatus}
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