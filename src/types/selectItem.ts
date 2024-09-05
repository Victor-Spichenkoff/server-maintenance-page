export interface ISelectItem {
    id?: number
    label: string
    endpoint: "portfolio" | "vss" | "lista" | 'paginacao' | "all" | "turnoff"
    selected: boolean
}