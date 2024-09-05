import { ISelectItem } from "@/types/selectItem";

export const selectablePoints: ISelectItem[] = [
    {
        id: 0,
        label: "Portfolio",
        selected: false,
        endpoint: "portfolio"
    },
    {
        id: 1,
        label: "Artigos",
        selected: false,
        endpoint: "vss"
    },
    {
        id: 2,
        label: "Lista Compras",
        selected: false,
        endpoint: "lista"
    },
    {
        id: 3,
        label: "Paginação",
        selected: false,
        endpoint: "paginacao"
    },
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