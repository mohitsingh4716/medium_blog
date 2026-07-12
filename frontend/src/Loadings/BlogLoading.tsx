const CardSkeleton = () => {
  return (
    <div className="p-6 border-b border-zinc-150 animate-pulse space-y-4">
      {/* Author details */}
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 bg-zinc-200 rounded-full"></div>
        <div className="h-3 bg-zinc-200 rounded w-1/4"></div>
        <div className="h-3 bg-zinc-200 rounded w-1/6"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-between">
        {/* Title / Description */}
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-zinc-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3.5 bg-zinc-200 rounded w-full"></div>
            <div className="h-3.5 bg-zinc-200 rounded w-5/6"></div>
          </div>
        </div>
        {/* Cover image thumbnail */}
        <div className="shrink-0 w-full md:w-32 aspect-video md:aspect-[4/3] bg-zinc-200 rounded-xl"></div>
      </div>

      {/* Footer stats */}
      <div className="h-3 bg-zinc-200 rounded w-1/5"></div>
    </div>
  );
};

export const BlogLoading = () => {
  return (
    <div className="max-w-2xl mx-auto divide-y divide-zinc-100">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};
