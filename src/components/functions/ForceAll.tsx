import { TransitionStartFunction, useState } from "react"
import { ActionButton } from "../template/ActionButton"
import axios from "axios"
import { baseUrl } from "@/global"

interface ForceAll {
    setErrorStatus: (n: string) => void
    setSuccessStatus: (n: string) => void
    setShowStatus: (n: boolean) => void
    startTransition: TransitionStartFunction
}

var currentTimeout: NodeJS.Timeout
export const ForceAll = ({ setSuccessStatus, setErrorStatus, setShowStatus, startTransition }: ForceAll) => {
    const [times, setTimes] = useState(0)

    const recursiveRequest = async (times: number) => {
        setErrorStatus("")
        setSuccessStatus("")
        startTransition(async () => {
            // setTimes(times => times + 1)
            times += 1

            if (times + 1 >= 10)
                return setErrorStatus("Excesso de tentativas atingido! (10)")

            try {
                const res = await axios(`${baseUrl}/callAllOnce/force`, { timeout: 50_000 })
    
                if (res.data.isAllWorking)
                    return setSuccessStatus(`Todas as ${res.data.working} funcionando!`)
    
                //deu errado
                setErrorStatus(`Erro: 
                tentativa: ${times + 1}/10
                Espere 10 segundos...
                `)
            } catch(e: any) {
                if (e.code === 'ECONNABORTED')
                    setErrorStatus("Demorou Muito")
                else 
                    setErrorStatus("Erro no request!")
            }


            currentTimeout = setTimeout(() => recursiveRequest(times), 10_000)
        })
        
    }

    const handleForceAllClick = () => {
        clearTimeout(currentTimeout)
        setShowStatus(true)
        recursiveRequest(0)
    }

    return (
        <ActionButton label="Forçar Todos" onClick={handleForceAllClick} />
    )
}