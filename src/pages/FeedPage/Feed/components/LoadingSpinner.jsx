export default function LoadingSpinner({ label = 'Cargando…' }) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-3 bg-charcoal-950 text-cream font-body">
      <div className="w-10 h-10 rounded-full border-2 border-cream/20 border-t-mango-500 animate-spin" />
      <p className="text-sm text-cream/70">{label}</p>
    </div>
  )
}
