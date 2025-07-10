export function AllRoomLoad() {
    return (
        <div className="rounded-xl px-2 flex flex-col gap-2  overflow-y-scroll min-h-[290px] scrollhide cursor-pointer">
            <div className="flex gap-2 borde rounded-lg animate-pulse">
                <div className="w-[50px] flex items-center justify-center h-[50px] rounded-full borde bg-gray-300"></div>
                <div className="flex flex-col gap-1">
                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                    <div className="w-16 h-3 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div className="flex gap-2 borde rounded-lg animate-pulse">
                <div className="w-[50px] flex items-center justify-center h-[50px] rounded-full borde bg-gray-300"></div>
                <div className="flex flex-col gap-1">
                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                    <div className="w-16 h-3 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div className="flex gap-2 borde rounded-lg animate-pulse">
                <div className="w-[50px] flex items-center justify-center h-[50px] rounded-full borde bg-gray-300"></div>
                <div className="flex flex-col gap-1">
                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                    <div className="w-16 h-3 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    )
}