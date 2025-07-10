export function MainDashSkeleton() {
    console.log("main dash sckeleton")
    return (
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
                <div key={index} className="border shadow-lg py-4 px-3 animate-pulse bg-gray-100 rounded-lg">
                    
                    <div className="w-[80px] mt-1 bg-black h-6 rounded-lg border"></div>
                    <div className="w-[90%] h-6 bg-black rounded-md mt-2 ml-[38px]"></div>
                    
                    <div className="border p-2 mt-2">
                        <div className="w-[90%] ml-[38px] flex justify-end gap-8">
                            <div className="h-4 w-20 bg-black rounded"></div>
                            <div className="h-4 w-20 bg-black rounded"></div>
                        </div>
                    </div>

                    <div className="w-full border p-2 flex justify-end">
                        <div className="border w-[40%] flex justify-between px-4 text-xl">
                            <div className="h-8 w-8 bg-black rounded-lg"></div>
                            <div className="h-8 w-8 bg-black rounded-lg"></div>
                            <div className="h-8 w-8 bg-black rounded-lg"></div>
                        </div>
                    </div>

                    <div className="w-[100%] text-md border p-2 overflow-hidden flex justify-end">
                        <div className="line-clamp-4 w-[90%] h-[100px] bg-black rounded-lg p-1"></div>
                    </div>

                </div>
            ))}
        </div>

    );
}
