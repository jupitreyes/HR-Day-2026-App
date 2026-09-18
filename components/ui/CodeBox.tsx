import { cn } from "@/lib/utils"

export function CodeBox({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn("border border-retro-cyan/50 bg-black/50 backdrop-blur-md p-6 font-mono text-5xl font-bold tracking-[0.2em] text-retro-cyan text-center shadow-[inset_0_0_20px_rgba(61,224,210,0.2)]", className)}>
      {code}
    </div>
  )
}
