"use client"

import {Footer} from "@/components/template/Footer"
import {Header} from "@/components/template/Header"
import {SettingsArea} from "@/components/template/SettingsArea"
import {BackendConnectionTest} from "@/components/utils/BackendConnectionTest";
import {useEffect} from "react";

export default function Home() {
    const useBorder = process.env.NODE_ENV == "development" ? "md:border border-black" : ""


    return (<div className={`max-w-[416px]  ${useBorder} min-h-screen mx-auto relative`}>
        <Header title="Server"/>
        <SettingsArea/>
        <Footer/>
    </div>)
}
