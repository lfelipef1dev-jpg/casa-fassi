export default function AppLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Skeleton header */}
      <div className="rounded-2xl p-6 lg:p-8 bg-surface">
        <div className="h-4 w-32 bg-line rounded mb-3" />
        <div className="h-8 w-64 bg-line rounded mb-2" />
        <div className="h-4 w-48 bg-line rounded" />
      </div>

      {/* Skeleton cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card-fassi p-5">
            <div className="w-8 h-8 bg-line rounded-xl mb-3" />
            <div className="h-6 w-16 bg-line rounded mb-2" />
            <div className="h-3 w-24 bg-line rounded" />
          </div>
        ))}
      </div>

      {/* Skeleton lista */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card-fassi p-5 flex items-center gap-4">
            <div className="w-14 h-14 bg-line rounded-2xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 bg-line rounded" />
              <div className="h-3 w-32 bg-line rounded" />
              <div className="h-1.5 w-full bg-line rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
