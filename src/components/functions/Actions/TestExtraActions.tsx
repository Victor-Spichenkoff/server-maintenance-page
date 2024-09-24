import { ActionButton } from "@/components/template/ActionButton"
import { baseUrl } from "@/global"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"

interface ITestExtraActions {
    setSuccessStatus: (...n: any) => void
    setErrorStatus: (...n: any) => void
    startTransition: any
    setShowStatus: (...n: any) => void
}

var currentTimeout: any
export const TestExtraActions =
    ({ setErrorStatus, setShowStatus, setSuccessStatus, startTransition }: ITestExtraActions) => {


        const [abortController, setAbortController] = useState<AbortController | null>(null)
        const [isThisLoading, setIsThisLoading] = useState(false)

        const recursiveCallThis = (times: number) => {
            const controller = new AbortController()
            setAbortController(controller)


            setIsThisLoading(true)

            startTransition(async () => {
                times += 1

                if (times > 10) {
                    setIsThisLoading(false)
                    setErrorStatus("Excesso de tentativas atingido! (10)")
                    return
                }

                try {
                    const res = await axios(`${baseUrl}/isOn`, {
                        timeout: 8_000,
                        signal: controller.signal
                    })
                    res.data

                    setIsThisLoading(false)
                    setSuccessStatus(`Ligado`)
                    return
                } catch (e: any) {
                    if (e.code === 'ECONNABORTED')
                        setErrorStatus(`Erro: 
                            tentativa: ${times}/10
                            Espere 8 segundos...
                            `)
                    else if (e.status == 500)
                        setErrorStatus(`Erro: 
                            tentativa: ${times}/10
                            Espere 8 segundos...
                            `)
                    else
                        setErrorStatus("Erro no request!")
                }


                currentTimeout = setTimeout(() => recursiveCallThis(times), 8_000)
            })
        }

        const handleStartClick = () => {
            setShowStatus(true)
            setErrorStatus("")
            setSuccessStatus(false)
            recursiveCallThis(0)
        }

        const handleCancell = () => {
            abortController?.abort()
            clearTimeout(currentTimeout)
            setSuccessStatus("")
            setIsThisLoading(false)

            setTimeout(() => setErrorStatus(`CANCELADO`), 20)
        }

        return (
            <div className="mt-8 flex justify-around">


                <ActionButton
                    label={isThisLoading ? "Cancelar" : "Forçar THIS"}
                    className={isThisLoading ? "bg-error hover:bg-[#8d0b0b]" : ""}
                    onClick={isThisLoading ? handleCancell : handleStartClick}
                />

                <Link href={"/hub"}>
                    <ActionButton label="HUB" />
                </Link>
            </div>
        )
    }