import { ActionButton } from "@/components/template/ActionButton"
import { ActionStatus } from "./ActionStatus"
import { useState, useTransition } from "react"
import { baseUrl } from "@/global"
import { selectablePoints } from "@/data/selectablePoints"
import { ToggleItem } from "../ToggleItem"
import axios from "axios"


var currentTimeout: any

export const TestOne = () => {
    const [successStatus, setSuccessStatus] = useState("")
    const [showStatus, setShowStatus] = useState(false)
    const [isLoading, startTransition] = useTransition()
    const [errorStatus, setErrorStatus] = useState("")
    const [force, setForce] = useState(false)


    const handleTestOneClick = (id: string | number) => {
        setShowStatus(true)
        startTransition(async () => {
            try {
                const res = await axios(`${baseUrl}/test/one/${id}`)
                setSuccessStatus("Funcionando \n" + res.data)
            } catch {
                setErrorStatus("Não Funcionou")
            }
        })
    }



    //Para forçar
    const recursiveRequest = async (times: number, id: number) => {

        setErrorStatus("")
        setSuccessStatus("")
        startTransition(async () => {
            times += 1

            if (times > 10)
                return setErrorStatus("Excesso de tentativas atingido! (10)")

            try {
                const res = await axios(`${baseUrl}/test/one/${id}`, { timeout: 8_000 })


                return setSuccessStatus(`Ligado\n` + res.data)
            } catch (e: any) {

                if (e.code === 'ECONNABORTED')
                    setErrorStatus("Demorou Muito")

                if (e.status == 500)
                    setErrorStatus(`Erro: 
                        tentativa: ${times}/10
                        Espere 8 segundos...
                        `)
                else
                    setErrorStatus("Erro no request!")


            }

            currentTimeout = setTimeout(() => recursiveRequest(times, id), 10_000)
        })
    }


    const handleForceStartOne = (id: number) => {
        setShowStatus(true)
        recursiveRequest(0, id)
    }


    const handleForceChange = () => {
        setForce(!force)
    }


    const allButtons = selectablePoints.map((api, i) => {
        if (selectablePoints.length - 2 <= i)
            return null

        return (
            <ActionButton
                label={api.label}
                onClick={() => {
                    if (force)
                        handleForceStartOne(Number(api.id))
                    else
                        handleTestOneClick(Number(api.id))
                }}
                key={api.id}
            />
        )
    })


    return (<>
        <h2 className="text-2xl text-center mt-8 mb-4">Testar Um</h2>
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