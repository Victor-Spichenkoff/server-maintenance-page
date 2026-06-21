import {ServerEntity} from "@/types/server";
import {baseUrl} from "@/global";
import {useQuery} from "@tanstack/react-query";

//TODO: Configurar para usar esse também
async function getApiConfigItem(){
    const response = await fetch(baseUrl + "/v2/status");

    if (!response.ok) {
        throw new Error("Erro ao buscar servers");
    }

    const data = await response.json()

    localStorage.setItem("servers", JSON.stringify(data))

    return data
}
export function useServers() {
    const initialData = (() => {
        const cached = localStorage.getItem("servers")
        return cached ? JSON.parse(cached) : undefined
    })()

    return useQuery<ServerEntity[]>({
        queryKey: ["api_config"],
        queryFn: getServerStatus,
        initialData,
    });
}
