import { cn } from "@/lib/utils"

export function CodeBox({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn("border-4 border-retro-cyan bg-retro-bg p-6 font-body text-5xl font-bold tracking-[0.2em] text-retro-cyan text-center shadow-[0_0_15px_rgba(61,224,210,0.5)]", className)}>
      {code}
    </div>
  )
}
