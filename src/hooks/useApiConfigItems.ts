import {baseUrl} from "@/global";
import {useQuery} from "@tanstack/react-query";

async function getApiConfigItem(){
    const response = await fetch(`${baseUrl}/apiStatus`);

    if (!response.ok) {
        throw new Error("Erro ao buscar config da API");
    }

    const data = await response.json()

    return data
}
export function useApiConfig() {
    const placeholderData = false

    return useQuery<boolean>({
        queryKey: ["api_config"],
        queryFn: getApiConfigItem,
        placeholderData,
    });
}
