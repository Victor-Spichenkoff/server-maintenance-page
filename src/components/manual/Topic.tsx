export const Topic = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center mt-3">
            <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
            <span className="text-gray-300">{ children }</span>
        </div>
    )
}