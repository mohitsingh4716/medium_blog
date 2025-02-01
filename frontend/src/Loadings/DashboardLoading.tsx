import { Appbar } from "../components/Appbar";

const DashboardLoading = () => {
    return (
      <div className="min-h-screen bg-gray-100">
        <Appbar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-6">
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-12 border-t-4 border-gray-500 animate-pulse">
            <h1 className="text-4xl font-extrabold text-gray-700 mb-6 bg-gray-300 h-8 rounded w-2/3"></h1>
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b pb-3">
                <div className="w-1/3 bg-gray-300 h-6 rounded"></div>
                <div className="w-1/2 bg-gray-200 h-6 rounded"></div>
              </div>
  
              <div className="flex justify-between items-center border-b pb-3">
                <div className="w-1/3 bg-gray-300 h-6 rounded"></div>
                <div className="w-1/2 bg-gray-200 h-6 rounded"></div>
              </div>
  
              <div className="md:flex inline-block justify-between border-b pb-3">
                <div className="w-1/3 bg-gray-300 h-6 rounded"></div>
                <div className="w-1/2 bg-gray-200 h-6 rounded"></div>
              </div>
  
              <div className="flex justify-between items-center">
                <div className="w-1/3 bg-gray-300 h-6 rounded"></div>
                <div className="w-1/4 bg-gray-200 h-6 rounded"></div>
              </div>
            </div>
          </div>
  
  
          <div className="bg-white rounded-2xl shadow-lg p-6 col-span-1 md:col-span-2 mt-12 border-t-4 border-gray-500 animate-pulse">
            <h2 className="text-3xl font-semibold text-gray-600 mb-4 bg-gray-300 h-8 rounded w-1/2"></h2>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="border-b pb-4 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                  <div className="w-3/4">
                    <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
                    <div className="pt-1 pl-2 bg-gray-200 h-4 w-1/3 rounded mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardLoading;
  