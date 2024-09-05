import { ActionButton } from "../template/ActionButton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ToggleItem } from "./ToggleItem"
import { selectablePoints } from "@/data/selectablePoints"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "@/global"


interface ISelectApi {
  setForceUpdate: any
}


export const SelectApi = ({ setForceUpdate }: ISelectApi) => {

  const [currentOnIndex, setCurrentOnIndex] = useState(-2)

  useEffect(() => {
    axios(`${baseUrl}/currenton/id`)
      .then(res => {
        setCurrentOnIndex(res.data)
      })
      .catch(console.log)//arrumar catch
  }, [])



  const changeCurrentOn = async (endpoint: string, currentState: boolean) => {
    setForceUpdate(Math.random())//para recarregar o status de longe
    if (currentState) {// está desligando (mudou o item para off)
    // if (itemID == currentOnIndex) {// está desligando (mudou o item para off)
      try {
        console.log("Entrou para deixar off")
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
        // console.log("Resposta da API, ID = " + newCurrentOnId.data)
      })
      .catch(console.log)//arrumar catch
  }


  // const elemets = selectablePoints.map((item, i) => (
  //   <ToggleItem
  //     key={i}
  //     label={item.label}
  //     startValue={item.id == currentOnIndex}
  //     onCheckChange={() => changeCurrentOn(item.endpoint, Number(item.id))}
  //   />
  // ))
  const elemets = selectablePoints.map((item, i) => {
    // console.log("Item com id " + item.id + "; valor checke: " + (item.id == currentOnIndex) )
    return (<ToggleItem
      key={i}
      label={item.label}
      isChecked={item.id == currentOnIndex}
      onCheckChange={() => changeCurrentOn(item.endpoint, (item.id == currentOnIndex))}
      // onCheckChange={() => changeCurrentOn(item.endpoint, Number(item.id))}
    />
    )
  })


  return (
    <div className="relative w-full">
      <DropdownMenu modal={false} defaultOpen>
        <DropdownMenuTrigger>
          <ActionButton label="Selecionar"/>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="border-none bg-gray-blue w-[300px] px-4  -mr-[200px] text-gray-200 text-xl" sideOffset={17}>
          {elemets}
        </DropdownMenuContent>

      </DropdownMenu>

    </div>
  )
}