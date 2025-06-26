import { TransitionStartFunction, useState } from "react"

import axios from "axios"
import { baseUrl } from "@/global"
import { ActionButton } from "@/components/template/ActionButton"

interface ForceAll {
    setErrorStatus: (n: string) => void
    setSuccessStatus: (n: string) => void
    setShowStatus: (n: boolean) => void
    startTransition: TransitionStartFunction
}

//erro: NMão reinicia apos mandar cancelar
//mudei o tmepo para 1s entre cada

let currentTimeout: NodeJS.Timeout
export const ForceAll = ({ setSuccessStatus, setErrorStatus, setShowStatus, startTransition }: ForceAll) => {
    const [isCalling, setIsCalling] = useState(false)

    const recursiveRequest = async (times: number) => {
        // if(stop)
        //     return

        setErrorStatus("")
        setSuccessStatus("")
        startTransition(async () => {
            times += 1

            if (times + 1 >= 10)
                return setErrorStatus("Excesso de tentativas atingido! (10)")

            try {
                const res = await axios(`${baseUrl}/callAllOnce/force`, { timeout: 50_000 })

                if (res.data.isAllWorking) {
                    clearTimeout(currentTimeout)
                    return setSuccessStatus(`Todas as ${res.data.working} funcionando!`)
                }


                setErrorStatus(`Error: 
                Attempts: ${times}/10
                Wait 10 seconds...
                `)
            } catch (e: any) {
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
        setIsCalling(true)
        recursiveRequest(0)
    }


    const handleCancell = () => {
        setSuccessStatus("")
        setIsCalling(false)

        clearTimeout(currentTimeout)

        setErrorStatus(`CANCELLED`)
    }

    return (
        <ActionButton
            label={ isCalling ? "Cancel" : "Force All" }
            onClick={isCalling ? handleCancell : handleForceAllClick}
            className={isCalling ? "bg-error hover:bg-[#960404]" : "" }
        />
    )
}
