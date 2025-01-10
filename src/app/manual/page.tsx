import { Alert } from "@/components/manual/Alert"
import { ManualTitle } from "@/components/manual/ManualTitle"
import { Topic } from "@/components/manual/Topic"
import { ActionButton } from "@/components/template/ActionButton"
import Link from "next/link"

export default function Manual() {
    return (
        <div className="w-screen max-w-[700px] p-6 mx-auto relative">
            <Link href="/"><ActionButton label="Voltar" /></Link>

            <ManualTitle text="Manual" level="45" />

            <ManualTitle text="Menu 1" level="35" />
            <Topic><strong>Selecionar</strong> - Escolher qual API manter ON, já mantém o servidor principal (this) no modo ON</Topic>
            <Topic><strong>Keep API ON</strong> -  A resposta vem diretamente da API, ou é false em caso de erro.</Topic>


            <ManualTitle text="Ações" level="35" />
            <Topic><strong>Chamar API</strong> - Chama a API principal 1 vezes, tem timeout de 10s </Topic>
            <Topic><strong>Chamar todos -</strong> Vai realizar um request para cada um deles, timeout de 30s</Topic>
            <Topic><strong>Forçar Todos</strong> - Vai ficar fazendo requests até que todos retornem algo</Topic>
            <Topic>Os gráficos mostram o usado (azul) e o restante (cinza)</Topic>

            <Alert>As api em &ldquo;/&rdquo; são verificadas usando o THIS. No Hub é separado do This</Alert>


            <Alert>O tempo para o mês só é resetado (verificado) quando rodo um start</Alert>



            <ManualTitle text="Monitoramento do tempo" level="35" />
            <Topic><strong>Last Start</strong> - Última vez que iniciou</Topic>
            <Topic><strong>Last Discount</strong> - Última vez que fez o desconto</Topic>


            <ManualTitle text="Modificar Tempo" level="35" />
            <Topic><strong>/resetTime</strong> - Só em dev, reinicia os tempos</Topic>
            <Topic><strong>/setTime</strong> - enviar POST com os dados do novo tempo (h e m) + type (main, this)</Topic>


            <ManualTitle text="Modificar Usage" level="35" />
            <Topic>Se refe a quanto já usou. Começa em no mês</Topic>
            <Topic>Ao não mandar, ele mantém o que está já estava salvo</Topic>
            <Alert>Se tiver com 0, ele não muda</Alert>



            <ManualTitle text="Mudança render -> vercel" level="35" />
            <Topic>Não faz mais req para manter o this ON</Topic>
            <Topic>O this vai ter a mesma medida do MaIN, nos tempos</Topic>




            <ManualTitle text="Hub" level="35" />
            <Topic>A primeira parte, serve para visitar meus projetos</Topic>
            <Topic>A segunda, é feita para testar/iniciar todas as minhas APIs</Topic>
            <Topic>O HUb tem o Force para todos</Topic>


            <div className="mt-16">
                <footer
                    className="mt-6 px-4 py-2 text-xs bg-black w-fit absolute bottom-0 right-0 rounded-md shadow-md"
                >
                    &copy; Victor Spichenkoff 2024
                </footer>

            </div>
        </div>
    )
}