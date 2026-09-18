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
      <h2 className="text-5xl text-center font-heading text-retro-cyan drop-shadow-[0_0_20px_rgba(61,224,210,0.8)] uppercase tracking-widest animate-in slide-in-from-top-4 duration-700 delay-100 fill-mode-both">LEADERBOARD</h2>

      <div className="flex-1 bg-glass border border-retro-cyan/30 p-6 font-sans overflow-y-auto rounded-lg shadow-[inset_0_0_20px_rgba(61,224,210,0.1)] animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
        <LeaderboardView currentTeamName={currentTeamName} />
      </div>

      <div className="pt-4 shrink-0 animate-in fade-in duration-700 delay-500 fill-mode-both">
        <Button onClick={onPlayAgain} className="w-full bg-black/60 border-retro-cyan text-retro-cyan hover:bg-retro-cyan/20 hover:shadow-[0_0_15px_rgba(61,224,210,0.4)]">INITIALIZE NEW SEQUENCE</Button>
      </div>
    </div>
  )
}
