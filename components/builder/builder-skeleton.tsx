export function BuilderSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
      {/* Left panel skeleton */}
      <div className="rounded-xl border border-white/8 bg-card/40 p-6 shadow-glass backdrop-blur-sm">
        <div className="h-6 w-28 rounded-full skeleton-shimmer" />
        <div className="mt-6 h-10 w-5/6 rounded-lg skeleton-shimmer" />
        <div className="mt-2 h-10 w-3/4 rounded-lg skeleton-shimmer" />
        <div className="mt-3 h-16 w-full rounded-lg skeleton-shimmer" />
        <div className="mt-8 grid gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 rounded-lg skeleton-shimmer" />
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <div className="h-11 w-40 rounded-lg skeleton-shimmer" />
          <div className="h-11 w-32 rounded-lg skeleton-shimmer" />
        </div>
      </div>

      {/* Right panel skeleton */}
      <div className="grid gap-6">
        <div className="rounded-xl border border-white/8 bg-card/40 p-6 shadow-glass backdrop-blur-sm">
          <div className="h-5 w-36 rounded skeleton-shimmer" />
          <div className="mt-6 h-[480px] rounded-lg skeleton-shimmer" />
          <div className="mt-6 h-px skeleton-shimmer" />
          <div className="mt-5 h-40 rounded-lg skeleton-shimmer" />
        </div>
        <div className="rounded-xl border border-white/8 bg-card/40 p-6 shadow-glass backdrop-blur-sm">
          <div className="h-5 w-24 rounded skeleton-shimmer" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="h-12 rounded-lg skeleton-shimmer" />
            <div className="h-12 rounded-lg skeleton-shimmer" />
          </div>
          <div className="mt-4 h-11 w-full rounded-lg skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}
