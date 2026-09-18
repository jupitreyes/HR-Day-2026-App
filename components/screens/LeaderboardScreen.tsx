import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { formatTime } from '@/components/ui/Timer'
import { supabase } from '@/lib/supabase/client'

type Entry = {
  id: string
  team_name: string
  final_time_seconds: number
  venue: string
}

export function LeaderboardScreen({
  onPlayAgain,
  currentTeamName
}: {
  onPlayAgain: () => void
  currentTeamName?: string
}) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadLeaderboard() {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('final_time_seconds', { ascending: true })
        .limit(100)
      
      if (!error && data) {
        setEntries(data)
      }
      setLoading(false)
    }
    loadLeaderboard()
  }, [])

  return (
    <div className="space-y-8 py-6 flex flex-col min-h-full h-full flex-1">
      <h2 className="text-4xl text-center text-retro-yellow drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">LEADERBOARD</h2>

      <div className="flex-1 bg-white/5 border border-white/20 p-4 font-sans overflow-y-auto">
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse">Loading scores...</p>
        ) : (
          <div className="space-y-2">
            {entries.length === 0 && <p className="text-center text-gray-400">No teams have escaped yet.</p>}
            {entries.map((entry, index) => {
              const isCurrent = currentTeamName && entry.team_name === currentTeamName
              return (
                <div key={entry.id} className={`flex justify-between items-center p-3 border-b border-white/10 ${isCurrent ? 'bg-retro-cyan/20 border-retro-cyan text-white' : 'text-gray-300'}`}>
                  <div className="flex items-center gap-4 truncate">
                    <span className="font-heading text-retro-cyan w-6 shrink-0">{index + 1}.</span>
                    <span className="font-semibold truncate">{entry.team_name || 'Anonymous Team'}</span>
                  </div>
                  <span className="font-body text-xl font-bold ml-4 shrink-0">{formatTime(entry.final_time_seconds)}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="pt-4 shrink-0">
        <Button onClick={onPlayAgain} variant="ghost" className="w-full">Play Again</Button>
      </div>
    </div>
  )
}
