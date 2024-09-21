import { ActionButton } from "@/components/template/ActionButton"
import { Input } from "@/components/ui/input"
import { baseUrl } from "@/global"
import axios from "axios"
import { useState } from "react"

export const ChangeTime = () => {
    const [hours, setHours] = useState<number>()
    const [minutes, setMinutes] = useState<number>()
    const [errorMessage, setErroMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [isMainChecked, setIsMainChecke] = useState(true)

    const checkData = (hours: number, minutes: number) => {
        setErroMessage("")
        setSuccessMessage("")

        // if (hours < 0 || hours > 750 || minutes < 0 || minutes > 60)
        //     throw setErroMessage("Valor fora do limite")


        if (hours % 1 != 0)
            throw setErroMessage("Não deve ter vírgula")
    }


    const handleChangeClick = async () => {

        try {
            checkData(Number(hours), Number(minutes))

            await axios.post(`${baseUrl}/setTime`, {
                type: isMainChecked ? "main" : "this",
                hours,
                minutes
            })

            setSuccessMessage("Mudado")
        } catch { }
    }



    return (
        <div>
            <h2 className="text-2xl text-center mt-16 mb-4">Change Usage</h2>

            <div className="gap-y-2 flex flex-col items-center">
                <Input
                    type="number"
                    placeholder="horas"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-[200px] bg-white/90 text-gray-700 text-center"
                />
                <Input
                    type="number"
                    placeholder="minutos"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    className="w-[200px] bg-white/90 text-gray-700 text-center"
                />

                <label className="mt-4">
                    <input
                        type="checkbox"
                        readOnly
                        checked={isMainChecked}
                        className="mr-1"
                    />
                    Main
                </label>
                <label className="mb-6 opacity-55">
                    <input
                        readOnly
                        type="checkbox"
                        checked={!isMainChecked}
                        className="mr-1"
                        disabled
                    />
                    This
                </label>



                <ActionButton
                    label="Enviar"
                    onClick={handleChangeClick}
                    className=""
                />

            </div>

            {errorMessage || successMessage ? (
                <div className={`w-40 h-12 self-center rounded-md shadow-md flex justify-center items-center mt-8 mx-auto
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