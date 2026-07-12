export const Loadings = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-10 animate-pulse space-y-8">
      {/* Title skeleton */}
      <div className="space-y-3">
        <div className="h-9 bg-zinc-200 rounded-lg w-full"></div>
        <div className="h-9 bg-zinc-200 rounded-lg w-2/3"></div>
      </div>

      {/* Author meta row skeleton */}
      <div className="flex items-center gap-3 border-y border-zinc-150 py-4">
        <div className="w-10 h-10 bg-zinc-200 rounded-full shrink-0"></div>
        <div className="space-y-2 flex-1">
          <div className="h-3.5 bg-zinc-200 rounded w-1/4"></div>
          <div className="h-3 bg-zinc-200 rounded w-1/3"></div>
        </div>
      </div>

      {/* Cover image skeleton */}
      <div className="w-full aspect-video bg-zinc-200 rounded-2xl"></div>

      {/* Paragraph blocks skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-zinc-200 rounded w-full"></div>
        <div className="h-4 bg-zinc-200 rounded w-full"></div>
        <div className="h-4 bg-zinc-200 rounded w-5/6"></div>
        <div className="h-4 bg-zinc-200 rounded w-full"></div>
        <div className="h-4 bg-zinc-200 rounded w-4/5"></div>
      </div>

      <div className="space-y-4 pt-4">
        <div className="h-4 bg-zinc-200 rounded w-full"></div>
        <div className="h-4 bg-zinc-200 rounded w-full"></div>
        <div className="h-4 bg-zinc-200 rounded w-3/4"></div>
      </div>
    </div>
  );
};