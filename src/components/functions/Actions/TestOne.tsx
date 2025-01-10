import { ActionButton } from "@/components/template/ActionButton"
import { ActionStatus } from "./ActionStatus"
import { useState, useTransition } from "react"
import { baseUrl } from "@/global"
import { selectablePoints } from "@/data/selectablePoints"
import { ToggleItem } from "../../utils/ToggleItem"
import axios from "axios"
import { TestExtraActions } from "./TestExtraActions"
import { allApis } from "@/data/AllApis"
import { IAllApis } from "@/types/allApis"

interface ITestOne {
   isAllEndpoints?: boolean
}

var currentTimeout: any

export const TestOne = ({ isAllEndpoints }: ITestOne) => {
   const [successStatus, setSuccessStatus] = useState("")
   const [showStatus, setShowStatus] = useState(false)
   const [isLoading, startTransition] = useTransition()
   const [errorStatus, setErrorStatus] = useState("")
   const [force, setForce] = useState(false)
   const [callingId, setCallingId] = useState(-1)
   const [abortController, setAbortController] = useState<AbortController | null>(null)


   //simples
   const testOnlyOne = (id: string | number, allApiItem?: IAllApis) => {
      const controller = new AbortController()
      setAbortController(controller)

      startTransition(async () => {

         try {
            console.log(allApiItem?.url)
            if (isAllEndpoints && allApiItem) {
               console.log(allApiItem.url)
               const res = await axios(allApiItem?.url, {
                  signal: controller.signal,
                  timeout: 10_000
               })

               setSuccessStatus("Funcionando: " + allApiItem.label)
            } else {
               const res = await axios(`${baseUrl}/test/one/${id}`, {
                  signal: controller.signal,
                  timeout: 10_000
               })

               setSuccessStatus("Funcionando \n" + res.data)
            }
         } catch (e: any) {
            if (callingId >= 0)
               setErrorStatus("Não Funcionou")
            else if (e.status == 500)
               setErrorStatus("Erro de Timeout")
            else
               setErrorStatus("Erro inesperado")
         }

         setCallingId(-1)
      })
   }

   //Para forçar
   const recursiveRequest = async (times: number, id: number, allApiItem?: IAllApis) => {
      const controller = new AbortController()
      setAbortController(controller)

      startTransition(async () => {
         times += 1

         if (times > 10)
            return setErrorStatus("Excesso de tentativas atingido! (10)")

         try {
            if (isAllEndpoints && allApiItem) {
               const res = await axios(allApiItem?.url, {
                  timeout: 8_000,
                  signal: controller.signal
               })

               setSuccessStatus("Funcionando: " + allApiItem.label)
            } else {
               const res = await axios(`${baseUrl}/test/one/${id}`, {
                  timeout: 8_000,
                  signal: controller.signal
               })

               setSuccessStatus(`Ligado\n` + res.data)

            }

            setCallingId(-1)
            return
         } catch (e: any) {

            if (e.code === 'ECONNABORTED')
               setErrorStatus("Demorou Muito")
            else if (e.status == 500)
               setErrorStatus(`Erro: 
                        tentativa: ${times}/10
                        Espere 8 segundos...
                        `)
            else
               setErrorStatus("Erro no request!")
         }


         currentTimeout = setTimeout(() => recursiveRequest(times, id, allApiItem), 10_000)
      })
   }


   //btn sem force
   const handleTestOneClick = (id: number, allApiItem?: IAllApis) => {
      setShowStatus(true)
      setCallingId(Number(id))
      setErrorStatus("")
      setSuccessStatus("")
      testOnlyOne(id, allApiItem)
   }


   //com FORCE
   const handleForceStartOne = (id: number, allApiItem?: IAllApis) => {
      setShowStatus(true)
      setCallingId(id)
      setErrorStatus("")
      setSuccessStatus("")
      recursiveRequest(0, id, allApiItem)
   }


   //Cancelar
   const handleCancell = () => {
      abortController?.abort()
      clearTimeout(currentTimeout)
      setSuccessStatus("")
      setCallingId(-1)

      setTimeout(() => setErrorStatus(`CANCELADO`), 20)
   }



   const handleForceChange = () => setForce(!force)

   //definição dos botões de ação
   var allButtons
   if (!isAllEndpoints) {
      allButtons = selectablePoints.map((api, i) => {
         if (selectablePoints.length - 2 <= i)
            return null

         return (
            <ActionButton
               label={callingId == api.id ? "Cancelar" : api.label}
               className={callingId == api.id ? "bg-error hover:bg-[#8d0b0b]" : ""}
               onClick={() => {
                  if (callingId == api.id)
                     return handleCancell()

                  if (force)
                     handleForceStartOne(Number(api.id))
                  else
                     handleTestOneClick(Number(api.id))
               }}
               key={api.id}
            />
         )
      })
   } else {//caso HUB
      allButtons = allApis.map((allApiItem, i) => {
         return (
            <ActionButton
               label={callingId == allApiItem.id ? "Cancelar" : allApiItem.label}
               className={callingId == allApiItem.id ? "bg-error hover:bg-[#8d0b0b]" : ""}
               onClick={() => {
                  if (callingId == allApiItem.id)
                     return handleCancell()

                  if (force)
                     handleForceStartOne(Number(allApiItem.id), allApiItem)
                  else
                     handleTestOneClick(Number(allApiItem.id), allApiItem)
               }}
               key={allApiItem.id}
            />
         )
      })
   }


   return (<>
      <h2 className="text-2xl text-center mt-8 mb-4">Testar Um</h2>
      <ToggleItem
         onCheckChange={handleForceChange}
         label="Force"
         isChecked={force}
      />
      <div className="flex mt-4">
         <div className="flex flex-col gap-2">
            {allButtons}
         </div>
         <ActionStatus
            successStatus={successStatus}
            errorStatus={errorStatus}
            isLoading={isLoading}
            showStatus={showStatus}
         />

      </div>

      {!isAllEndpoints && (
         <div>
            <TestExtraActions
               setErrorStatus={setErrorStatus}
               setShowStatus={setShowStatus}
               startTransition={startTransition}
               setSuccessStatus={setSuccessStatus}
            />
         </div>

      )}
   </>)
}