import { cn } from "@/lib/utils"

export function CodeBox({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn("bg-retro-panel p-6 font-mono text-5xl font-bold tracking-[0.2em] text-retro-cyan text-center text-shadow-retro-cyan", className)}>
      {code}
    </div>
  )
}
