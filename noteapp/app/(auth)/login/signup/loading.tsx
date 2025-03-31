export default function Loading() {
    return (
      <div className="text-white md:w-[500px] mt-[120px] sm:w-[60%] mx-auto p-2">
                <div className="pt-5 bg-black/50 p-2 rounded-2xl h-[370px] shadow-black shadow-2xl md:px-4 animate-pulse">
                    <div className="h-6 w-3/4 bg-gray-700/50 rounded mx-auto"></div>

                    <div className="mt-6 p-4 flex justify-center flex-col space-y-4">
                        <div className="w-full h-10 bg-gray-700/50 rounded"></div>
                        <div className="w-full h-10 bg-gray-700/50 rounded"></div>
                        <div className="w-full h-10 bg-gray-700/50 rounded"></div>

                        <div className="h-6 w-1/2 bg-gray-700/50 rounded mx-auto mt-4"></div>

                        <div className="w-32 h-12 bg-gray-700/50 rounded mx-auto mt-4"></div>
                        <div className="w-full h-10 bg-gray-700/50 rounded mt-5"></div>

                    </div>
                </div>
            </div>
    );
  }