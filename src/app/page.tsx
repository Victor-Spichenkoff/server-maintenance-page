"use client"

import {Footer} from "@/components/template/Footer"
import {Header} from "@/components/template/Header"
import {TimeMonitoringArea} from "@/components/template/TimeMonitoringArea";
import {SelectServersArea} from "@/components/v3/toggleArea/SelectServersArea";
import {QuickActionV3} from "@/components/v3/Actions/QuickActions.v3";

export default function Home() {
    const useBorder = true//process.env.NODE_ENV == "development" ? "md:border border-black" : ""

    return (<div className={`max-w-[416px] ${useBorder} min-h-screen mx-auto relative`}>
        <Header title="Server"/>

        <div className={"p-8"}>
        <SelectServersArea />
        <div className="mt-12 w-full">
            <h2 className="text-2xl text-center">Actions</h2>
            <div className="w-full flex mt-5">
                <QuickActionV3 />
            </div>
        </div>
        <TimeMonitoringArea />

        </div>

        <Footer/>
    </div>)
}
