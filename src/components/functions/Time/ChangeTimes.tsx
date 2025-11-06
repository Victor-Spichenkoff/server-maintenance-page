import { ActionButton } from "@/components/template/ActionButton"
import { Input } from "@/components/ui/input"
import { baseUrl } from "@/global"
import axios from "axios"
import { useState, useTransition } from "react"

export const ChangeTime = () => {
    const [hours, setHours] = useState<string>()
    const [minutes, setMinutes] = useState<string>()
    const [errorMessage, setErroMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isMainChecked, setIsMainChecked] = useState(true)
    const [isLoading, startTranstition] = useTransition()

    const checkData = (hours: number, minutes: number) => {
        setErroMessage("")
        setSuccessMessage("")

        if (hours < 0 || hours > 750 || minutes < 0 || minutes > 60)
            throw "Value out of bounds"
            // throw setErroMessage("Valor fora do limite")


        if (hours % 1 != 0)
            throw "No comma"
    }


    const handleChangeClick = async () => {

        startTranstition(async () => {
            try {
                checkData(Number(hours), Number(minutes))

                await axios.post(`${baseUrl}/setTime`, {
                    type: isMainChecked ? "main" : "this",
                    hours,
                    minutes
                })

                setSuccessMessage("Changed")
            } catch(e) {
                console.log(e)
                if(typeof e == "string")
                    return setErroMessage(e)

                setErroMessage("Error!")
            }
        })
    }


    const handleCheckChange = () => setIsMainChecked(!isMainChecked)


    return (
        <div>
            <h2 className="text-2xl text-center mt-16 mb-4">Change Usage</h2>

            <div className="gap-y-2 flex flex-col items-center">
                <Input
                    type="number"
                    placeholder="hours"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-[200px] bg-white/90 text-gray-700 text-center"
                />
                <Input
                    type="number"
                    placeholder="minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="w-[200px] bg-white/90 text-gray-700 text-center"
                />

                <label className="mt-4">
                    <input
                        type="checkbox"
                        readOnly
                        checked={isMainChecked}
                        className="mr-1"
                        onChange={handleCheckChange}
                    />
                    Main
                </label>
                <label className="mb-6">
                    <input
                        // readOnly
                        type="checkbox"
                        checked={!isMainChecked}
                        className="mr-1"
                        onChange={handleCheckChange}
                    // disabled
                    />
                    This
                </label>



                <ActionButton
                    label="Send"
                    onClick={handleChangeClick}
                    className="bg-green-500/90 hover:bg-green-700"
                />

            </div>

            {isLoading && (
                <div className={`min-w-40 w-fit h-12 self-center rounded-md shadow-md flex justify-center items-center mt-8 mx-auto
                bg-highlight/40 border border-highlight text-blue-400
                `}>
                    Loading...
                </div>
            )}

            {errorMessage || successMessage ? (
                <div className={`min-w-40 w-fit h-12 self-center rounded-md shadow-md flex justify-center items-center mt-8 mx-auto px-2
            ${errorMessage && "bg-red-500/40 border border-error text-red-200"}
            ${successMessage && "bg-emerald-500/40 border border-emerald-600 text-emerald-400"}
                `}>
                    {errorMessage}
                    {successMessage}
                </div>

            ) : null}
        </div>
    )
}
