export type ServerEntity = {
    id  : number
    label: string
    shortLabel: string
    fullUrl: string
    isActive?: boolean
    LastCalled?: Date
    LastCalledSuccessfully?: Date
    isMain: boolean
    isShowOnQuickActions: boolean
}
