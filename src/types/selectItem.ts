export interface ISelectItem {
    id?: number
    label: string
    endpoint: "portfolio" | "vss" | "lista" | 'paginacao' | "all" | "turnoff" | "olx" | "z" | "velha"
    selected: boolean
}