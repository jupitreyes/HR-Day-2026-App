import { cn } from "@/lib/utils"

export function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function Timer({ seconds, className, label }: { seconds: number; className?: string; label?: string }) {
  const isCritical = seconds <= 60 && seconds > 0
  const isZero = seconds === 0
  return (
    <div className={cn(
      "inline-flex flex-col items-center justify-center border-4 bg-retro-bg p-3 font-body text-4xl font-bold tracking-widest",
      {
        "border-white text-white": !isCritical && !isZero,
        "border-retro-yellow text-retro-yellow animate-pulse": isCritical,
        "border-retro-pink text-retro-pink": isZero,
      },
      className
    )}>
      {label && <span className="text-sm uppercase tracking-widest mb-1 text-gray-400 font-sans">{label}</span>}
      {formatTime(seconds)}
    </div>
  )
}
