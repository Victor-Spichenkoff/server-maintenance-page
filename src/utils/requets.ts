import { baseUrl } from "@/global"
import axios, { AxiosError, AxiosResponse } from "axios"


/**
 * 
 * @param endpoint colocar "/"
 * @param timeout opcional, colocar o tempo máximo em segs (10)
 * *retorno: dados da res, { error: "msg" }, erro mesmo
 */
export const requestEndPointWithTimeout = async (endpoint: string, timeout: number = 10)
:Promise<AxiosResponse<any, any> | { error: any }> => {
    try {
        const response = await axios.get(`${baseUrl}${endpoint}`, {
            timeout: timeout * 1000
        })

        return response
    } catch (e: any) {
        if (e.code === 'ECONNABORTED')
            return { error:  "Demorou muito"  }
            

        return { error:  e as AxiosError }//erro aqui
    }
}