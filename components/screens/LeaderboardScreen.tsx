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
    <div className="space-y-8 py-6 flex flex-col min-h-full h-full flex-1">
      <h2 className="text-4xl text-center text-retro-yellow drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">LEADERBOARD</h2>

      <div className="flex-1 bg-white/5 border border-white/20 p-4 font-sans overflow-y-auto">
        <LeaderboardView currentTeamName={currentTeamName} />
      </div>

      <div className="pt-4 shrink-0">
        <Button onClick={onPlayAgain} variant="ghost" className="w-full">Play Again</Button>
      </div>
    </div>
  )
}
