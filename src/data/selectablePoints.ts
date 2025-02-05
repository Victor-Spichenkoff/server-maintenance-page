import { ISelectItem } from "@/types/selectItem";

export const selectablePoints: ISelectItem[] = [
    {
        id: 0,
        label: "Portfolio",
        selected: false,
        endpoint: "portfolio"
    },
    // {
    //     id: 1,
    //     label: "Artigos",
    //     selected: false,
    //     endpoint: "vss"
    // },
    // {
    //     id: 2,
    //     label: "Lista Mercado",
    //     selected: false,
    //     endpoint: "lista"
    // },
    {
        id: 3,
        label: "Paginação",
        selected: false,
        endpoint: "paginacao"
    },
    {
        id: 4,
        label: "Z",
        selected: false,
        endpoint: "z"
    },
    {
        id: 5,
        label: "Velha",
        selected: false,
        endpoint: "velha"
    },
    // {
    //     id: 3,
    //     label: "OLX",
    //     selected: false,
    //     endpoint: "olx"
    // },
    {
        id: 17,
        label: "All",
        selected: false,
        endpoint: "all"
    },
    {
        id: -1,
        label: "OFF",
        selected: false,
        endpoint: "turnoff"
    },
]