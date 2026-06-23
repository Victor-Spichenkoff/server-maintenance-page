import { useQuery } from "@tanstack/react-query";
import {ServerEntity} from "@/types/responses/server";
import {baseUrl} from "@/global";

async function getServerStatus(): Promise<ServerEntity[]> {
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
        queryKey: ["servers"],
        queryFn: getServerStatus,
        initialData,
    });
}
