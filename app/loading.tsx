export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Skeleton header */}
      <div className="h-16 bg-surface border-b border-line flex items-center px-6">
        <div className="h-8 w-32 bg-line rounded" />
        <div className="ml-auto h-8 w-24 bg-accent/20 rounded-lg" />
      </div>

      {/* Skeleton hero */}
      <div className="w-full bg-ink" style={{ aspectRatio: "16 / 9", maxHeight: "88vh" }} />

      {/* Skeleton seções */}
      <div className="py-20 px-6 max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <div className="h-8 w-96 bg-line rounded mx-auto" />
          <div className="h-4 w-64 bg-line rounded mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card-fassi p-6">
              <div className="w-12 h-12 bg-line rounded-xl mb-4" />
              <div className="h-5 w-48 bg-line rounded mb-2" />
              <div className="h-3 w-full bg-line rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
