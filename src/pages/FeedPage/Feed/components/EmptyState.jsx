export default function EmptyState({ title, description }) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-2 px-8 text-center bg-charcoal-950 text-cream font-body">
      <p className="font-display text-2xl text-mango-500 leading-tight">{title}</p>
      <p className="text-sm text-cream/60 max-w-xs">{description}</p>
    </div>
  )
}
