import { baseUrl } from "@/global"
import axios from "axios"
import { useCallback, useEffect, useState, useTransition } from "react"

interface IStatus {
    update: any
}


export const Status = ({ update }: IStatus) => {
    const [status, setStatus] = useState("")
    const [isError, setIsError] = useState(false)
    const [ isLoading, startTransition ] = useTransition()

    useEffect(()=> {
        startTransition(async ()=> {
            try{
                const res = await axios(`${baseUrl}/currenton`)
                setIsError(false)
                setStatus(res.data)
            } catch {
                setIsError(true)
                setStatus("Can't get status")
            }
        })
    }, [update])

    let finalStatus = status

    switch (status) {
        case "Nenhum Selecionado":
            finalStatus = "Nothing Selected"; break;
        case "Paginação":
            finalStatus = "Pagination"; break;
        case "Velha":
            finalStatus = "Tic Tac Toe"; break;
        default:
            break
    }

    /*TRANSLATE → Nenhum selecionado == depende do backend:*/
    return (
        <div
            className={` text-slate-100 border border-gold min-w-[280px] text-center px-4 py-2 rounded-xl text-2xl
                ${finalStatus != "Nothing Selected" && "bg-gold text-gray-900"}
            ${isError && 'border-error bg-transparent text-error'}
        `}>
            {!isLoading && finalStatus}
            {isLoading && "Loading..."}
        </div>
    )
}
