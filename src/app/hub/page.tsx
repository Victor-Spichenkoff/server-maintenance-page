"use client"

import { TestOne } from "@/components/functions/Actions/TestOne"
import { HubItem } from "@/components/hub/HubItem"
import { ActionButton } from "@/components/template/ActionButton"
import { Footer } from "@/components/template/Footer"
import Link from "next/link"

const Hub = () => {
  return (
    <div className={`max-w-[416px] flex-col items-center min-h-screen mx-auto relative flex justify-center`}>
      <h1 className="text-3xl text-center mt-8">Navegar para</h1>

      <div className="w-[80%] flex justify-center gap-y-3 gap-x-2 mt-8">
        <div className="flex flex-col flex-1 gap-y-3">
          <HubItem
            label="Portfolio"
            href="https://victor-spichenkoff.github.io/portfolio/auth?notForce=true"
          />
          <HubItem
            label="Static"
            href="https://my-portfolio-lyart-pi-90.vercel.app/en?notForce=true"
          />
          <HubItem
            label="Pagination"
            href="https://victor-spichenkoff.github.io/test-pagination/"
          />
          <HubItem
            label="Criptografia"
            href="https://victor-spichenkoff.github.io/criptografia/"
          />
          <HubItem
            label="VSS Artigos"
            href=""
          />
          <HubItem
            label="Bingo"
            href=""
          />
        </div>

        <div className="flex flex-col flex-1 gap-y-3">
          <HubItem
            label="HTML & CSS"
            href="https://victor-spichenkoff.github.io/b7web-html-css/"
          />
          <HubItem
            label="JS"
            href="https://victor-spichenkoff.github.io/b7web-js/"
          />
          <HubItem
            label="Lista de Mercado"
            href="https://victor-spichenkoff.github.io/Lista-Mercado/"
          />
          <HubItem
            label="Tanto Faz"
            href="https://victor-spichenkoff.github.io/tanto_faz/"
          />
          <HubItem
            label="Tempo"
            href="https://victor-spichenkoff.github.io/weather"
          />
          <HubItem
            label="Jogo da Velha"
            href="https://victor-spichenkoff.github.io/Jogo-da-Velha/"
          />
        </div>
      </div>


      <div className="px-8 w-full mt-9">
        <TestOne isAllEndpoints />

      </div>



      <div className="w-full flex justify-end px-8 mt-14 mb-8">
        <Link href={"/"}>
          <ActionButton 
          label="Voltar"
            className="bg-transparent border-2 border-highlight"
          />
        </Link>
      </div>


      <div className="w-full">

        <Footer />
      </div>

    </div>
  )
}

export default Hub