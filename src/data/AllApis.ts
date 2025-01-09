import { baseUrl } from "@/global";
import { IAllApis } from "@/types/allApis";




export const allApis: IAllApis[] = [
    {
        id: 0,
        label: "Portfolio",
        url: "https://portfolio-api-i3t0.onrender.com/teste"
    },
    {
        id: 1,
        label: "VSS Artigos",
        url: "https://vss-artigos-backend.onrender.com/teste"
    },
    {
        id: 2,
        label: "Pagination",
        url: "https://pagination-api-ugwo.onrender.com/teste"
    },
    {
        id: 3,
        label: "Lista Mercado",
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
    }

]