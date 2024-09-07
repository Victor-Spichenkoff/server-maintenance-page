import Link from "next/link";
import { ActionButton } from "./ActionButton";

export const Footer = () => (
    <div className="absolute bottom-0 right-0 flex justify-between w-full">
        <div className="px-4 hover:opacity-70">
            <Link href={"/manual"}>
                <ActionButton label="Para o Manual 📗" />
            </Link>
        </div>
        <footer className=" bg-black text-xs px-2 py-1 rounded-lg flex items-center">
            &copy; Victor Spichenkoff 2024
        </footer>
    </div>
)