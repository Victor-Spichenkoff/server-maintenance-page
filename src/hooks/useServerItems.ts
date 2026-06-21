import { useQuery } from "@tanstack/react-query";
import {ServerEntity} from "@/types/server";
import {baseUrl} from "@/global";

async function getServerStatus(): Promise<ServerEntity[]> {
    const response = await fetch(baseUrl + "/v2/status");

    if (!response.ok) {
        throw new Error("Erro ao buscar servers");
    }

    return response.json();
}

export function useServers() {
    return useQuery({
        queryKey: ["servers"],
        queryFn: getServerStatus,
    });
}
