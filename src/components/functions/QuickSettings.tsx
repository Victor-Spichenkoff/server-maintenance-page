import { useCallback, useState, useTransition } from "react"
import { ActionButton } from "../template/ActionButton"
import { requestEndPointWithTimeout } from "@/utils/requets"

export const QuickSettings = () => {
    const [status, setStatus] = useState()
    const [showStatus, setShowStatus] = useState(false)
    const [isLoading, startTransition] = useTransition()

    useCallback(() => {
        setTimeout(() => setShowStatus(false), 5000)
    }, [status])

    const callApiOnce = () => {
        startTransition( async () => {
            //para testes
            const res: any = await requestEndPointWithTimeout('/timeout', 2)
            // const res: any = await requestEndPointWithTimeout('/isOn')

            if (typeof res.error == "string")
                return setStatus(res.error)

            if (res.error)
                return console.log("Erro ao chamar a api 1 vez")

            setStatus(res.data)
        })
    }


    return (<>
        <div className="w-full flex flex-col items gap-y-2 flex-[1]">
            <ActionButton label="Chamar API" onClick={callApiOnce} />
            <ActionButton label="Chamar Todos" />
            <ActionButton label="Forçar Todos" />
        </div>
        {showStatus ? (
            <div className="flex flex-[2] justify-center items-center
                border border-gray-blue ml-8 
                rounded-md">
                NO DATA
            </div>

        ) : (
            <div className="flex flex-[2]"></div>
        )}

        {isLoading && (
            <div className="flex flex-[2] justify-center items-center
                border border-gray-blue ml-8 
                rounded-md">
                Carregando...
            </div>)}
    </>)
}