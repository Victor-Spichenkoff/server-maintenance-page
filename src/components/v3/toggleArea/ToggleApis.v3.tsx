import axios from "axios";
import {baseUrlV2} from "@/global";
import {ToggleItem} from "@/components/utils/ToggleItem";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ActionButton} from "@/components/template/ActionButton";
import {useQueryClient} from "@tanstack/react-query";
import {useServers} from "@/hooks/useServerItems";
import {useToast} from "@/hooks/use-toast";
import {ShowMessage} from "@/components/utils/ShowMessage";
import {ServerEntity} from "@/types/responses/server";
import {isAllMarkedAsCallOnAllActive, ServersUtils} from "@/utils/serversUtils";
import {Loading} from "@/components/utils/Loading";

export const ToggleApisV3 = () => {
    const {
        data: servers,
        isLoading,
    } = useServers()
    const queryClient = useQueryClient()
    const { toast } = useToast()

    console.log("isLoagind" + isLoading)
    if(servers.length === 0)
        return null


    const changeCurrentOn = async (id: string | number) => {
        try {
            await axios(`${baseUrlV2}/toggle/${id}`)
            await queryClient.invalidateQueries({ queryKey: ['servers'] })
            await queryClient.invalidateQueries({ queryKey: ['api_config'] })
        } catch {
            ShowMessage("Can't change status", 'error', toast)
        }
    }

    const toggleMarkedAsMain = async () => {
        try {
            await axios(`${baseUrlV2}/toggle/all`)
            await queryClient.invalidateQueries({ queryKey: ['servers'] })
            await queryClient.invalidateQueries({ queryKey: ['api_config'] })
        } catch {
            ShowMessage("Can't change to \"ALL\"", 'error', toast)
        }
    }

    const allOff = async () => {
        try {
            await axios(`${baseUrlV2}/set/off`)
            await queryClient.invalidateQueries({ queryKey: ['servers'] })
            await queryClient.invalidateQueries({ queryKey: ['api_config'] })
        } catch {
            ShowMessage("Can't set all to \"OFF\"", 'error', toast)
        }
    }


    const elements = servers.map((item: ServerEntity) => (
        <ToggleItem
            key={item.shortLabel}
            label={item.shortLabel}
            isChecked={item.isActive}
            onCheckChange={() => changeCurrentOn(item.id)}
        />
    ))

    const extraElements = (<>
        <ToggleItem
            key={"all"}
            label={"Main API's"}
            isChecked={(ServersUtils.isAllMainActiveActive(servers))}
            onCheckChange={toggleMarkedAsMain}
        />
        <ToggleItem
            key={"off"}
            label={"OFF"}
            isChecked={(ServersUtils.isAllOff(servers))}
            onCheckChange={allOff}
        />
        </>)


    return (
        <div className="relative">
            <Loading isLoading={isLoading} />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <div>
                        <ActionButton label="Select"/>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    className=" bg-gray-blue w-[300px] px-4  -mr-[200px] text-gray-200 text-xl border-none border-high-border shadow-lg"
                    sideOffset={17}>
                    {elements}
                    {extraElements}
                </DropdownMenuContent>

            </DropdownMenu>
        </div>
    )
}
