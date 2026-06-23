export type ServerEntity = {
    id  : number
    label: string
    shortLabel: string
    fullUrl: string
    isActive?: boolean
    LastCalled?: Date | null
    LastCalledSuccessfully?: Date | null
    isMain: boolean
    isShowOnQuickActions: boolean
}
