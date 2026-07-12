export const DashboardLoading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-10 pb-16 animate-pulse space-y-8">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div className="space-y-2 flex-1">
          <div className="h-8 bg-zinc-200 rounded w-1/4"></div>
          <div className="h-4 bg-zinc-200 rounded w-1/3"></div>
        </div>
        <div className="w-36 h-10 bg-zinc-200 rounded-full"></div>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-zinc-200 h-24 flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-200 rounded-xl shrink-0"></div>
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-zinc-200 rounded w-1/2"></div>
              <div className="h-3 bg-zinc-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Stories list loading table */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-100 h-16 flex items-center justify-between">
          <div className="h-6 bg-zinc-200 rounded w-1/6"></div>
          <div className="h-6 bg-zinc-200 rounded w-1/12"></div>
        </div>

        <div className="divide-y divide-zinc-100 p-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-7 bg-zinc-200 rounded shrink-0"></div>
                <div className="h-4 bg-zinc-200 rounded w-1/3"></div>
              </div>
              <div className="h-4 bg-zinc-200 rounded w-1/12 hidden md:block"></div>
              <div className="h-4 bg-zinc-200 rounded w-1/12"></div>
              <div className="w-20 h-8 bg-zinc-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;