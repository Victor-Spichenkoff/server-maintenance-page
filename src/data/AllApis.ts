import { baseUrl } from "@/global";
import { IAllApis } from "@/types/allApis";


//usando no hub
export const allApis: IAllApis[] = [
    //id serve para mostrar o cancelar corretamente
    {
        id: 0,
        label: "Portfolio",
        url: "https://portfolio-api-i3t0.onrender.com/teste"
    },
    {
        id: 1,
        label: "VSS Articles",
        url: "https://vss-artigos-backend.onrender.com/teste"
    },
    {
        id: 2,
        label: "Pagination",
        url: "https://pagination-api-ugwo.onrender.com/teste"
    },
    {
        id: 3,
        label: "Market List",
        url: "https://lista-mercado-api.onrender.com/teste"
    },
    {
        id: 4,
        label: "THIS",
        url: baseUrl + "/teste"
    },
    {
        id: 5,
        label: "Z",
        url: "https://z-backend-t3zn.onrender.com/teste"
    },
    {
        id: 6,
        label: "Tic Tac",
        url: "https://tic-tac-toe-online-backend-jjv9.onrender.com/teste"
    }

]
