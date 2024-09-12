export interface IRemaning {
    hours: number
    minutes: number
}

export interface IRemaningResponse {
    main: IRemaning
    this: IRemaning
    lastStart?: string,
    lastDiscount?: string
}