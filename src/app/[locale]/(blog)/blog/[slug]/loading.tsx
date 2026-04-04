export default function PostLoading() {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-16 animate-pulse">
      <div className="h-10 bg-muted rounded w-3/4 mb-4" />
      <div className="h-4 bg-muted rounded w-1/4 mb-8" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded w-full" />
        ))}
      </div>
    </article>
  )
}
