import { Appbar } from "../components/Appbar"

export const Loadings = () => {
    return (
      <div>
       <Appbar/>
  
        <div className="flex  animate-pulse pt-16 lg:pt-24 max-w-screen-2xl mx-auto">
         
          <div className="w-[72%] ms-4 mt-2">
            < div className="h-8  bg-gray-200 rounded-full w-full lg:w-2/3"></div>
  
            <div className="mt-6 space-y-4 pl-10">
              <div className=" h-4 bg-gray-200 rounded"></div>
              <div className=" h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded "></div>
              <div className=" h-4 bg-gray-200 rounded "></div>

              <div className=" h-4 bg-gray-200 rounded"></div>
              <div className=" h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded "></div>
              <div className=" h-4 bg-gray-200 rounded "></div>
            </div>
          </div>
  
     
          <div className="border-r p-2 lg:p-8"></div>
  
     
          <div className="flex flex-col w-[28%] ms-4 space-y-4">
            <div className="bg-gray-200 rounded-full h-6 w-6"></div>
            
            <div className="">
              <div className="h-2 w-1/2   bg-gray-200 rounded-full  mb-2"></div>
              <div className="h-2 bg-gray-200 rounded-full  mb-2"></div>
              <div className="h-2 bg-gray-200 rounded-full  mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  