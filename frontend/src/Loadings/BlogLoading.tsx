import { Appbar } from "../components/Appbar";

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="p-4 border-b border-slate-200 pb-4  animate-pulse ">
          <div className="flex">
            <div className="bg-gray-200 rounded-full h-6 w-6"></div>

            <div className="bg-gray-200 ml-2 p-1 h-3 w-1/3 rounded mt-2"></div>
          </div>

          <div className=" flex flex-col w-80 lg:w-[500px] space-y-2">
            <div className="bg-gray-200 h-2  rounded mt-3"></div>
            <div className="bg-gray-200 h-2 rounded mt-2"></div>
            <div className="bg-gray-200 h-2 rounded mt-2"></div>
            <div className="bg-gray-200 h-2 rounded mt-2"></div>
             <div>
             <div className="bg-gray-200 h-2 w-1/2 rounded mt-1"></div>
             <div className="bg-gray-200 h-2 w-1/2 rounded mt-1"></div>
             </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};



export const BlogLoading = () => {
    return(
        <div className="">
             <Appbar/>

             
           <div className="pt-16"> 
           <Loading/>
           </div>
            <Loading/>
            <Loading/>
            <Loading/>
            <Loading/> 
           
          
        </div>

    )
}
