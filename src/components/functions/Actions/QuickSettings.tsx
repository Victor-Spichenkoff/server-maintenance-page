import { useCallback, useState, useTransition } from "react"
import { ActionButton } from "../../template/ActionButton"
import { requestEndPointWithTimeout } from "@/utils/requets"
import axios, { AxiosError, isAxiosError } from "axios"
import { baseUrl } from "@/global"
import { ForceAll } from "./ForceAll"
import { ToggleItem } from "../../utils/ToggleItem"
import { HighMessages } from "./HighMessages"
import { ActionStatus } from "./ActionStatus"
import { TestOne } from "./TestOne"


var currentTimeout: NodeJS.Timeout
export const QuickSettings = () => {
  const [successStatus, setSuccessStatus] = useState("")
  const [showStatus, setShowStatus] = useState(false)
  const [isLoading, startTransition] = useTransition()
  const [errorStatus, setErrorStatus] = useState("")
  // const []

  const resetValues = () => {
    setShowStatus(false)
    // setErrorStatus("")
    // setSuccessStatus("")
  }

  useCallback(() => {
    clearTimeout(currentTimeout)
    currentTimeout = setTimeout(() => resetValues(), 5000)
  }, [successStatus, errorStatus])

  const callApiOnce = () => {
    startTransition(async () => {
      resetValues()
      //para testes
      // const res: any = await requestEndPointWithTimeout('/timeout', 2)
      const res: any = await requestEndPointWithTimeout('/isOn', 10)

      if (typeof res.error == "string")
        setErrorStatus(res.error)

      if (res.error) {
        setErrorStatus("Unexpected error!")
        console.log("Error calling api once")
      }

      setShowStatus(true)
      setSuccessStatus(res.data)
    })
  }

  const allOnce = async () => {
    resetValues()
    setShowStatus(true)
    startTransition(async () => {
      try {
        const res = await axios(`${baseUrl}/callAllOnce`, { timeout: 50_000 })

        console.log(res.data)

        if (res.data.isAllWorking)
          return setSuccessStatus(`Everithing is working \n${res.data.working} of ${res.data.total}`)
        //nem todos

        const notWorkingNames = res.data.errors.join(", ")

        return setErrorStatus(`ERRO:
                  ${res.data.working} of ${res.data.total}
                  Wrong: ${notWorkingNames}`)

      } catch (e) {
        console.log(e)
        const error = e as AxiosError

        if (error.code === 'ECONNABORTED')
          return setErrorStatus("Demorou Muito")

        setErrorStatus("Erro na requisição")
      }
    })
  }

  return (
    <div className="flex flex-col w-full">
      <HighMessages />
      <div className="flex">

        <div className="w-full flex flex-col items gap-y-2 flex-[1]">
          <ActionButton label="Call API" onClick={callApiOnce} />
          <ActionButton label="Call All" onClick={allOnce} />
          <ForceAll
            setSuccessStatus={setSuccessStatus}
            setErrorStatus={setErrorStatus}
            setShowStatus={setShowStatus}
            startTransition={startTransition}
          />
        </div>
        <ActionStatus
          successStatus={successStatus}
          errorStatus={errorStatus}
          isLoading={isLoading}
          showStatus={showStatus}
        />


      </div>


      <TestOne />

    </div>
  )
}
