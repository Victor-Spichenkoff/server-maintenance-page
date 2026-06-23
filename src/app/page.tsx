"use client"

import {Footer} from "@/components/template/Footer"
import {Header} from "@/components/template/Header"
import {SettingsArea} from "@/components/template/SettingsArea"
import {useServers} from "@/hooks/useServerItems";
import {ServerEntity} from "@/types/responses/server";
import {useQueryClient} from "@tanstack/react-query";
import {TimeMonitoringArea} from "@/components/template/TimeMonitoringArea";
import {SelectServersArea} from "@/components/v3/toggleArea/SelectServersArea";
import {QuickSettings} from "@/components/functions/Actions/QuickSettings";
import {TestOneV3} from "@/components/v3/TestOne.v3";

export default function Home() {
    const useBorder = false//process.env.NODE_ENV == "development" ? "md:border border-black" : ""

    return (<div className={`max-w-[416px] ${useBorder} min-h-screen mx-auto relative`}>
        <Header title="Server"/>

        <SelectServersArea />
        {/*Quick actions*/}
        <TestOneV3 />
        <TimeMonitoringArea />

        <Footer/>
    </div>)
}
