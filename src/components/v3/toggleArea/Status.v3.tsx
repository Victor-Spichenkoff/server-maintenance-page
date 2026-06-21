import {useServers} from "@/hooks/useServerItems";
import {ServerEntity} from "@/types/server";
import {ServersActiveStatus, ServersUtils} from "@/utils/serversUtils";

export const StatusV3 = () => {
    const {
        data: servers,
        isLoading,
        error,
    } = useServers();

    const { label, type } = ServersUtils.mapToActiveStatus(servers)

    return (
        <div
            className={` text-slate-100 border border-gold min-w-[280px] text-center px-4 py-2 rounded-xl text-2xl
                ${type == ServersActiveStatus.allOff && "bg-gold text-gray-900"}
            ${error && 'border-error bg-transparent text-error'}
        `}>
            {!isLoading && label}
            {isLoading && "Loading..."}
        </div>
    )
}
