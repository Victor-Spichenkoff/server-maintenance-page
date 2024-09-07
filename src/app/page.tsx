"use client"

import { Footer } from "@/components/template/Footer";
import { Header } from "@/components/template/Header";
import { SettingsArea } from "@/components/template/SettingsArea";
import Image from "next/image";

export default function Home() {
  return (<div className="max-w-[416px] md:border border-black min-h-screen mx-auto relative">
    <Header title="Server"/>
    <SettingsArea />
    <Footer />
    </div> )
}
