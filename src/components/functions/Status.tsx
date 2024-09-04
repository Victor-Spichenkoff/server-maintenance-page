import { baseUrl } from "@/global"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

interface IStatus {
    update: any
}


export const Status = ({ update }: IStatus) => {
    const [status, setStatus] = useState("Carregando...")
    
    useEffect(()=> {
        setStatus("Carregando...")

        axios(`${baseUrl}/currenton`)
            .then(res => {
                setStatus(res.data)
            })
            .catch(()=> setStatus("erro ao pegar staus"))
    }, [update])



    return (
        <div className="bg-[#CFA34B] min-w-[280px] text-center text-gray-900 px-4 py-2 rounded-xl text-2xl">
            {status}
        </div>
    )
}