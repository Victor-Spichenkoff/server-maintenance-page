"use client"

import { TestOne } from "@/components/functions/Actions/TestOne"
import { HubItem } from "@/components/hub/HubItem"
import { ActionButton } from "@/components/template/ActionButton"
import { Footer } from "@/components/template/Footer"
import Link from "next/link"

const Hub = () => {
  return (
    <div className={`max-w-[416px] flex-col items-center min-h-screen mx-auto relative flex justify-center`}>
      <h1 className="text-3xl text-center mt-8">All Projects</h1>

      <div className="w-[80%] flex justify-center gap-y-3 gap-x-2 mt-8">
        <div className="flex flex-col flex-1 gap-y-3">
          <HubItem
            label="Portfolios"
            href="https://victor-spichenkoff.github.io/portfolio/auth?notForce=true"
          />
          <HubItem
            label="My Porfolio"
            href="https://my-portfolio-lyart-pi-90.vercel.app/en?notForce=true"
          />
          <HubItem
            label="Pagination"
            href="https://victor-spichenkoff.github.io/test-pagination/"
          />
          <HubItem
            label="Cryptography"
            href="https://victor-spichenkoff.github.io/criptografia/"
          />
          <HubItem
            label="VSS Articles"
            href="https://victor-spichenkoff.github.io/vss-artigos-frontend/#/"
          />
          <HubItem
            label="Bingo"
            href="https://victor-spichenkoff.github.io/bingo-build/"
          />
          <HubItem
            label="Weather"
            href="https://victor-spichenkoff.github.io/weather/"
          />
          <HubItem
            label="Online Tic Tac Toe"
            href="https://tic-tac-toe-online-six.vercel.app/"
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
            label="Market List"
            href="https://victor-spichenkoff.github.io/Lista-Mercado/"
          />
          <HubItem
            label="Whatever"
            href="https://victor-spichenkoff.github.io/tanto_faz/"
          />
          <HubItem
            label="Weather"
            href="https://victor-spichenkoff.github.io/weather"
          />
          <HubItem
            label="Tic Tac Toe"
            href="https://victor-spichenkoff.github.io/Jogo-da-Velha/"
          />
          <HubItem
            label="Flappy Bird"
            href="https://victor-spichenkoff.github.io/flappy-bird/"
          />
          <HubItem
            label="Z"
            href="https://z-frontend-seven.vercel.app/home"
          />
        </div>
      </div>


      <div className="px-8 w-full mt-9">
        <TestOne isAllEndpoints />

      </div>



      <div className="w-full flex justify-end px-8 mt-14 mb-8">
        <Link href={"/"}>
          <ActionButton
          label="Back"
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
