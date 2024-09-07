import { ManualTitle } from "@/components/manual/ManualTitle"
import { Topic } from "@/components/manual/Topic"
import { ActionButton } from "@/components/template/ActionButton"
import Link from "next/link"

export default () => {
    return (
        <div className="w-screen max-w-[700px] p-6 mx-auto">
            <Link href="/"><ActionButton label="Voltar" /></Link>
 
            <ManualTitle text="Manual" level={40}/>
            <ManualTitle text="Menu 1" level={35}/>
            <Topic>Selecionar - Escolher qual API manter ON, já mantém o servidor principal (this) no modo ON</Topic>
            <Topic>Keep API ON -  A resposta vem diretamente da API, ou é false em caso de erro.</Topic>

            <ManualTitle text="Ações" level={35}/>
            <Topic>Chamar API - Chama a API principal 1 vezes, tem timeout de 10s </Topic>
            <Topic>Chamar todos - Vai realizar um request para cada um deles, timeout de 30s</Topic>
            <Topic>Forçar Todos - Vai ficar fazendo requests até que todos retornem algo</Topic>

            <ManualTitle text="Manual" level={25}/>
        </div>
    )
}