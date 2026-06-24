import {useQuery} from "@tanstack/react-query";
import {ServerEntity} from "@/types/responses/server";
import {baseUrl} from "@/global";

async function getServerStatus(): Promise<ServerEntity[]> {
    const response = await fetch(baseUrl + "/v2/status");

    if (!response.ok) {
        throw new Error("Erro ao buscar servers");
    }

    const data = await response.json()

    if (typeof window !== "undefined")
        localStorage.setItem("servers", JSON.stringify(data))

    return data
}

export function useServers() {
    const placeholderData = (() => {
        if (typeof window === "undefined")
            return undefined

        const cached = localStorage.getItem("servers")
        // ATENÇÃO: Sempre vem como desativado
        return cached ? mapToOfflineServers(JSON.parse(cached)) : undefined
    })()

    return useQuery<ServerEntity[]>({
        queryKey: ["servers"],
        queryFn: getServerStatus,
        placeholderData,
    });
}


const mapToOfflineServers = (servers: ServerEntity[]) => {
    return servers.map(x => {
        x.isActive = false
        x.shortLabel += "(off)"
        x.LastCalled = null
        x.LastCalledSuccessfully = null

        return x
    })
}
