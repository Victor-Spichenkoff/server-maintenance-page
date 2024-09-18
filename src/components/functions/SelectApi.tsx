import { ActionButton } from "../template/ActionButton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ToggleItem } from "../utils/ToggleItem"
import { selectablePoints } from "@/data/selectablePoints"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "@/global"


interface ISelectApi {
  setForceUpdate: any
  forceUpdate?: any
}


export const SelectApi = ({ setForceUpdate, forceUpdate }: ISelectApi) => {

  const [currentOnIndex, setCurrentOnIndex] = useState(-2)

  useEffect(() => {
    axios(`${baseUrl}/currenton/id`)
      .then(res => {
        setCurrentOnIndex(res.data)
      })
      .catch(console.log)//arrumar catch
  }, [forceUpdate])



  const changeCurrentOn = async (endpoint: string, currentState: boolean) => {
    setForceUpdate(Math.random())//para recarregar o status de longe
    if (currentState) {
      try {
        const res = await axios(`${baseUrl}/turnoff`)
        setCurrentOnIndex(-1)
        return
      } catch {
        console.log("Erro ao setar para OFF")
        return
      }
    }

    axios(`${baseUrl}/${endpoint}`)
      .then(async () => {
        const newCurrentOnId = await axios(`${baseUrl}/currenton/id`)
        setCurrentOnIndex(newCurrentOnId.data)
      })
      .catch(console.log)//arrumar catch
  }


  const elemets = selectablePoints.map((item, i) => (
  <ToggleItem
      key={i}
      label={item.label}
      isChecked={item.id == currentOnIndex}
      onCheckChange={() => changeCurrentOn(item.endpoint, (item.id == currentOnIndex))}
    />
    ))



  return (
    <div className="relative">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <ActionButton label="Selecionar" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className=" bg-gray-blue w-[300px] px-4  -mr-[200px] text-gray-200 text-xl border-none border-hight-border shadow-lg" sideOffset={17}>
          {elemets}
        </DropdownMenuContent>

      </DropdownMenu>
    </div>
  )
}