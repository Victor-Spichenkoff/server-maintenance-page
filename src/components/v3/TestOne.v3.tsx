import {useServers} from "@/hooks/useServerItems";
import {ServerEntity} from "@/types/server";

export const TestOneV3 = () => {
    const {
        data: servers ,
        isLoading,
        error,
    } = useServers();

    const serversToShow: ServerEntity[] = servers?.filter((x:any) => x.isShowOnQuickActions)

    return (
        <div>
            { serversToShow?.map(s => <div>{s.shortLabel}</div>) }
        </div>
    )
}
