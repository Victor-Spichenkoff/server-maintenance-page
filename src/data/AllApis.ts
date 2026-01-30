import { baseUrl } from "@/global";
import { IAllApis } from "@/types/allApis";
import {ApiUrls} from "@/data/_db_api_typing_and_values";

const testEndpoint = "/teste"
//used on hub, nothing related to "this" API
export const allApis: IAllApis[] = [
    //id is used for cancel properly
    {
        id: 0,
        label: "Portfolio",
        url: ApiUrls.portfolios + testEndpoint// all endpoints must be with their test endpoints
    },
    {
        id: 1,
        label: "VSS Articles",
        url: ApiUrls.articles + testEndpoint
    },
    {
        id: 2,
        label: "Pagination",
        url: ApiUrls.pagination + testEndpoint
    },
    {
        id: 3,
        label: "Market List",
        url: ApiUrls.shoppingList + testEndpoint
    },
    {
        id: 4,
        label: "THIS",
        url: baseUrl + "/teste"
    },
    {
        id: 5,
        label: "Z",
        url: ApiUrls.z + testEndpoint
    },
    {
        id: 6,
        label: "Tic Tac",
        url: ApiUrls.ticTacToe + testEndpoint
    },

    {
        id: 7,
        label: "Million",
        url: ApiUrls.million + testEndpoint
    }
]
