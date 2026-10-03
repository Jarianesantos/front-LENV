export default function Skeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="card animate-pulse space-y-3">
      <div className="h-5 bg-info100/50 rounded w-3/4" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-3 bg-info100/30 rounded" style={{ width: `${80 - i * 15}%` }} />
      ))}
    </div>
  )
}
