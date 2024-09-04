import { Footer } from "@/components/template/Footer";
import { Header } from "@/components/template/Header";
import { SettingsArea } from "@/components/template/SettingsArea";
import Image from "next/image";

export default function Home() {
  return (<>
    <Header title="Server"/>
    <SettingsArea />
    <Footer />
    </> )
}
