import { Button } from '@/components/ui/Button'
import { LeaderboardView } from '@/components/ui/LeaderboardView'

export function LeaderboardScreen({
  onPlayAgain,
  currentTeamName
}: {
  onPlayAgain: () => void
  currentTeamName?: string
}) {
  return (
    <div className="space-y-8 py-6 flex flex-col min-h-full h-full flex-1 animate-in fade-in duration-700">
      <h2 className="text-4xl md:text-5xl text-center font-heading text-retro-cyan text-shadow-retro-cyan uppercase tracking-widest animate-in slide-in-from-top-4 duration-700 delay-100 fill-mode-both">LEADERBOARD</h2>

      <div className="flex-1 bg-retro-panel p-6 font-sans overflow-y-auto animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
        <LeaderboardView currentTeamName={currentTeamName} />
      </div>

      <div className="pt-4 shrink-0 animate-in fade-in duration-700 delay-500 fill-mode-both">
        <Button onClick={onPlayAgain} className="w-full bg-black border-4 border-retro-cyan text-retro-cyan hover:bg-retro-cyan/20 hover:shadow-[4px_4px_0px_rgba(0,255,255,0.4)] transition-all">INITIALIZE NEW SEQUENCE</Button>
      </div>
    </div>
  )
}
