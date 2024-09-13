export const Topic = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex mt-3">
            <div className="min-w-2 min-h-2 max-w-2 max-h-2 rounded-full bg-white mt-2 mr-2"></div>

            <span className="text-gray-300">{ children }</span>
        </div>
    )
}