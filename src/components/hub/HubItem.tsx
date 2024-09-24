import Link from "next/link"
import { ActionButton } from "../template/ActionButton"

interface IHUbITem {
    label: string
    href: string
}

export const HubItem = ({ label, href }: IHUbITem) => {
    return (
        <div className="flex justify-center w-full">
            <Link href={href} className="w-full">
                <ActionButton label={label} className="bg-green-500/90 hover:bg-emerald-700 w-full"/>
            </Link>
        </div>
    )
}