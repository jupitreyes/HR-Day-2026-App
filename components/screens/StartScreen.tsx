import { Button } from "@/components/ui/Button"

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh p-6 text-center space-y-12 bg-halftone">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl text-retro-pink drop-shadow-[0_0_15px_rgba(232,38,181,0.8)]">PROJECT</h1>
        <h1 className="text-5xl md:text-6xl text-retro-cyan drop-shadow-[0_0_15px_rgba(61,224,210,0.8)]">UNLOCKED</h1>
      </div>
      
      <p className="text-2xl max-w-sm mx-auto leading-relaxed">
        Your team has 9 minutes to solve three puzzles across HR's core functions. Work together. Move fast.
      </p>

      <Button onClick={onStart} className="w-full max-w-sm animate-pulse">
        Start Round
      </Button>
    </div>
  )
}
