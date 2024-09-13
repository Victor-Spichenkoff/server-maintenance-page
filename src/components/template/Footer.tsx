import Link from "next/link";
import { ActionButton } from "./ActionButton";

export const Footer = () => (
    // <div className="absolute bottom-0 right-0 flex w-full bg-gray-950 flex-col px-4 py-8">
    //     <Link href={"/v1"} className="hover:opacity-70 my">
    //         V1
    //     </Link> <br />

    //     <Link href={"/manual"} className="hover:opacity-70 mt">
    //         {/* <ActionButton label="Para o Manual 📗" /> */}
    //         Para o Manual 📗
    //     </Link>

    //     <div className="flex justify-end">
    //         <footer className=" text-xs px-2 py-1 rounded-lg items-center">
    //             &copy; Victor Spichenkoff 2024
    //         </footer>

    //     </div>
    // </div>
    <footer className="bg-gray-900  shadow-2xl text-white py-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6">
          <Link href="/manual" className="hover:text-green-500 transition-colors">
            Manual 📗
          </Link>
          <Link href="/v1" className="hover:text-green-500 transition-colors">
            V1
          </Link>
        </div>
        <p className="mt-4">&copy; Victor Spichenkoff 2024</p>
      </div>
    </footer>
)