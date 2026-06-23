import {ServerEntity} from "@/types/responses/server";
import {baseUrl} from "@/global";
import {useQuery} from "@tanstack/react-query";

//TODO: Configurar para usar esse também
async function getApiConfigItem(){
    const response = await fetch(`${baseUrl}/apiStatus`);

    if (!response.ok) {
        throw new Error("Erro ao buscar config da API");
    }

    const data = await response.json()
    console.log(data)

    localStorage.setItem("api_config", JSON.stringify(data))

    console.log("DAta:" + data)
    return data
}
export function useApiConfig() {
    const initialData = false

    return useQuery<boolean>({
        queryKey: ["api_config"],
        queryFn: getApiConfigItem,
        initialData,
    });
}
