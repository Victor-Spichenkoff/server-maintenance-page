"use client"

import {Footer} from "@/components/template/Footer"
import {Header} from "@/components/template/Header"
import {TimeMonitoringArea} from "@/components/template/TimeMonitoringArea";
import {SelectServersArea} from "@/components/v3/toggleArea/SelectServersArea";
import {QuickActionV3} from "@/components/v3/Actions/QuickActions.v3";

export default function Home() {
    const useBorder = false//process.env.NODE_ENV == "development" ? "md:border border-black" : ""

    return (<div className={`max-w-[416px] ${useBorder} min-h-screen mx-auto relative`}>
        <Header title="Server"/>

        <SelectServersArea />
        {/*Quick actions*/}
        <QuickActionV3 />
        <TimeMonitoringArea />

        <Footer/>
    </div>)
}
