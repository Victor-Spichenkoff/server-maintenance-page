export interface ISelectItem {
    id?: number | string
    label: string
    endpoint: "portfolio" | "vss" | "lista" | 'paginacao' | "all" | "turnoff" | "olx" | "z" | "velha" | "million"
    selected: boolean
}
