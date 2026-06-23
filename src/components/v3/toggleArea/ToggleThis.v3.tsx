import {Loading} from "@/components/utils/Loading";
import {StatusV3} from "@/components/v3/toggleArea/Status.v3";
import {ToggleItem} from "@/components/utils/ToggleItem";
import {useEffect, useState, useTransition} from "react";
import axios from "axios";
import {ShowMessage} from "@/components/utils/ShowMessage";
import {baseUrl, baseUrlV2} from "@/global";
import {useToast} from "@/hooks/use-toast";
import {useApiConfig} from "@/hooks/useApiConfigItems";
import {useQueryClient} from "@tanstack/react-query";

export const ToggleThisV3 = () => {
    // const [isThisApiOn, setIsThisApiOn] = useState(false)
    const { toast } = useToast()
    // const [isLoading, startTransition] = useTransition()
    const {
        data: isThisApiOn,
        isLoading
    } = useApiConfig()
    const queryClient = useQueryClient()

    const handleApiStateChange = async () => {
        // startTransition(async () => {
            try {
                console.log("ISTHIS ON: ")
                console.log(isThisApiOn)
                const res = await axios(`${baseUrlV2}/set/this/${!isThisApiOn ? "on" : "off"}`)

                // setIsThisApiOn(res.data)
                await queryClient.invalidateQueries({ queryKey: ['servers'] })
                await queryClient.invalidateQueries({ queryKey: ['api_config'] })
                ShowMessage("Successfully Changed", 'success', toast)
            } catch {
                ShowMessage("Can't change API", 'error', toast)
            }
        // })
    }

    useEffect(() => {
        // axios(`${baseUrl}/apiStatus`)
        //     .then(res => setIsThisApiOn(res.data))
        //     .catch(_ => setIsThisApiOn(false))
    }, [])


    return (<div>
        <Loading isLoading={isLoading} />
        <ToggleItem
            isChecked={isThisApiOn}
            onCheckChange={handleApiStateChange}
            label="Keep API ON"
        />
    </div>
    )
}
