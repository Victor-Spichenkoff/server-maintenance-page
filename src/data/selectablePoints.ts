import { ISelectItem } from "@/types/selectItem";
import {ApiOperationsIds} from "@/data/_db_api_typing_and_values";

// usado na home
export const selectablePoints: ISelectItem[] = [
    {
        id: 0,
        label: "Portfolio",
        selected: false,
    },
    // {
    //     id: 1,
    //     label: "Artigos",
    //     selected: false,
    //
    // },
    // {
    //     id: 2,
    //     label: "Lista Mercado",
    //     selected: false,
    //
    // },
    {
        id: 3,
        label: "Pagination",
        selected: false,
    },
    {
        id: 4,
        label: "Z",
        selected: false,
    },
    {
        id: 5,
        label: "Tic Tac",
        selected: false,
    },
    {
        id: 6,
        label: "Million",
        selected: false,
    },
    {
        id: ApiOperationsIds.all,
        label: "All",
        selected: false,
    },
    {
        id:  ApiOperationsIds.nothing,
        label: "OFF",
        selected: true,
    },
]
