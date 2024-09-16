interface IActionStatus {
    isLoading: boolean
}

export const ActionStatus = ({ isLoading }: IActionStatus) => {
    if (isLoading)
        return  <div className="flex flex-[2]"></div>

    
}