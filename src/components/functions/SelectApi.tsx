import {ActionButton} from "../template/ActionButton"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ToggleItem} from "../utils/ToggleItem"
import {selectablePoints} from "@/data/selectablePoints"
import {TransitionStartFunction, useEffect, useState, useTransition} from "react"
import axios from "axios"
import {baseUrl} from "@/global"
import {ApiOperationsIds} from "@/data/_db_api_typing_and_values";


interface ISelectApi {
    setForceUpdate: any
    forceUpdate?: any
    startTransition: TransitionStartFunction
}


export const SelectApi = ({setForceUpdate, forceUpdate, startTransition}: ISelectApi) => {

    const [currentOnIndex, setCurrentOnIndex] = useState(-2)

    useEffect(() => {
        axios(`${baseUrl}/currenton/id`)
            .then(res => {
                setCurrentOnIndex(res.data)
            })
            .catch(console.log)
    }, [forceUpdate])


    const changeCurrentOn = async (id: string | number, currentState: boolean) => {
        if (process.env.NODE_ENV != "development")//lidar com o lag maior
            setTimeout(() => setForceUpdate(Math.random()), 4000)

        if (currentState) {
            try {
                startTransition(async () => {
                    await axios(`${baseUrl}/set/turnoff`)
                    setCurrentOnIndex(ApiOperationsIds.nothing)
                })
            } catch {
                console.log("Erro ao setar para OFF")
            }
            return
        }

        try {
            startTransition(async () => {
                await axios(`${baseUrl}/set/${id}`)
                const newCurrentOnId = await axios(`${baseUrl}/currenton/id`)
                setCurrentOnIndex(newCurrentOnId.data)
                setForceUpdate(Math.random())//para recarregar o status de longe
            })
        } catch (e) {
            console.log(e)
        }
    }


    const elements = selectablePoints.map((item, i) => (
        <ToggleItem
            key={i}
            label={item.label}
            isChecked={item.id == currentOnIndex}
            onCheckChange={() => changeCurrentOn(item.id??-1, (item.id == currentOnIndex))}
        />
    ))


    return (
        <div className="relative">
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
                </DropdownMenuContent>

            </DropdownMenu>
        </div>
    )
}
