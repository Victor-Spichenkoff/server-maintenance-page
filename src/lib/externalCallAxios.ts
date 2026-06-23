import axios from "axios"
import {Cons} from "@/utils/console";
import {notReq} from "@/global";

/*
* Comportamento importante:
*  * On NOT_REQ = retorna NULL + avisa no console
*  * Erro real = propaga
* */
const axiosExternalCall = axios.create()


/*
* Logar erros
* */
axiosExternalCall.interceptors.response.use(
    (response) => {
        Cons.Blue(
            `[${new Date().toISOString()}] ${response.config.method?.toUpperCase()} ${response.config.url} -> ${response.status}`
        )

        return response
    },
    (error) => {
        // não é erro real, apenas tratamento meu
        if(error instanceof NotReqException) {

            return null
        }
        Cons.Red(
            `[ERROR] [${new Date().toISOString()}] ${error.config?.method?.toUpperCase()} ${error.config?.url} -> ${error.response?.status ?? "NETWORK_ERROR"}`,
        )

        return Promise.reject(error)
    }
)

/*
* Não fazer request, caso NOT_REQ = TRUE
* */
axiosExternalCall.interceptors.request.use((config) => {
    if (notReq) {
        Cons.Yellow(
            `[ NOT_REQ ]  ${config.method?.toUpperCase()} ${config.url}`
        );

        throw new NotReqException();
    }

    return config;
});

export default axiosExternalCall


class NotReqException extends Error {
    constructor() {
        super("Request blocked by NOT_REQ");
    }
}
