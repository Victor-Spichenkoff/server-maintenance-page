interface IActionStatus {
    isLoading: boolean
    showStatus: boolean
    errorStatus: string
    successStatus: string
}

export const ActionStatus = ({ isLoading, showStatus, errorStatus, successStatus }: IActionStatus) => {
    if (isLoading)
        return (
            <div className="flex flex-[2] justify-center items-center
                  border border-gray-blue ml-8 
                  rounded-md">
                Carregando...
            </div>)

    if (!showStatus)
        return <div className="flex flex-[2]"></div>


    return (<>

        <div className={`flex flex-[2] justify-center items-center
                  border ml-8
                  ${successStatus && 'border-sucess text-sucess p-2'}  
                  ${errorStatus && 'border-error text-error p-2'}
                  rounded-md`}>

            <div style={{ whiteSpace: 'pre-line' }}>
                {errorStatus}
            </div>
            <div style={{ whiteSpace: 'pre-line' }}>
                {successStatus}
            </div>
        </div>

    </>)
}