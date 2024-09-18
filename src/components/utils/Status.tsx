import { baseUrl } from "@/global"
import axios from "axios"
import { useCallback, useEffect, useState, useTransition } from "react"

interface IStatus {
    update: any
}


export const Status = ({ update }: IStatus) => {
    const [status, setStatus] = useState("")
    const [isError, setIsError] = useState(false)
    const [ isLoading, startTrantiotion ] = useTransition()

    useEffect(()=> {
        startTrantiotion(async ()=> {
            try{
                const res = await axios(`${baseUrl}/currenton`)
                setIsError(false)
                setStatus(res.data)
            } catch {
                setIsError(true)
                setStatus("Erro ao pegar staus")
            }
        })
    }, [update])


    return (
        <div 
            className={` text-slate-100 border border-gold min-w-[280px] text-center px-4 py-2 rounded-xl text-2xl
            ${status != "Nenhum Selecionado" && "bg-gold text-gray-900"}
            ${isError && 'border-error bg-transparent text-error'}
        `}>
            {!isLoading && status}
            {isLoading && "Carregando..."}
        </div>
    )
}