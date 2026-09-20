import { cn } from "@/lib/utils"

export function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function Timer({ seconds, className, label }: { seconds: number; className?: string; label?: string }) {
  return (
    <div className={cn(
      "inline-flex flex-col items-center justify-center border-4 border-retro-cyan bg-black/80 p-3 font-mono text-4xl font-bold tracking-widest text-retro-cyan shadow-[4px_4px_0px_rgba(0,255,255,0.4)]",
      className
    )}>
      {label && <span className="text-xs uppercase tracking-widest mb-1 text-retro-cyan/70 font-sans">{label}</span>}
      {formatTime(seconds)}
    </div>
  )
}
