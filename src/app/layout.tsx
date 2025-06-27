import type { Metadata } from "next"
import { Inter, Roboto,Poppins, Rubik, } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { NextUiProvider } from "@/providers/next-ui"

import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] })
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] })
const rubik = Rubik({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Server Maintenance",
  description: "New I",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <head>
        {/* <link rel="shortcut icon" href="./logo.png" type="image/x-icon" /> */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#111C2E2e" />
      </head>
      <body className={cn(inter.className, roboto.className, poppins.className, rubik.className,
        "bg-main text-gray-200  min-h-screen mx-auto relative overflow-x-hidden" +
          " font-poppins")}>
        <NextUiProvider>
          <ToastContainer />
          {children}
        </NextUiProvider>
      </body>
    </html>
  )
}
