import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { formatTime } from '@/components/ui/Timer'

type Entry = {
  id: string
  team_name: string
  final_time_seconds: number
  venue: string
}

export function LeaderboardView({ currentTeamName }: { currentTeamName?: string }) {
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

  if (loading) {
    return <p className="text-center text-gray-400 animate-pulse font-sans">Loading scores...</p>
  }

  if (entries.length === 0) {
    return <p className="text-center text-gray-400 font-sans">No teams have escaped yet.</p>
  }

  return (
    <div className="space-y-3 font-sans bg-glass p-4 rounded-md">
      {entries.map((entry, index) => {
        const isCurrent = currentTeamName && entry.team_name === currentTeamName
        return (
          <div key={entry.id} className={`flex justify-between items-center p-3 border-b border-white/5 ${isCurrent ? 'bg-retro-cyan/10 border-retro-cyan/50 text-white shadow-[inset_0_0_10px_rgba(61,224,210,0.1)]' : 'text-gray-300'}`}>
            <div className="flex items-center gap-4 truncate">
              <span className="font-heading text-retro-cyan w-8 shrink-0 tracking-widest">{index + 1}.</span>
              <span className="font-mono truncate uppercase">{entry.team_name || 'Anonymous Team'}</span>
            </div>
            <span className="font-mono text-xl font-bold ml-4 shrink-0 text-retro-cyan/80">{formatTime(entry.final_time_seconds)}</span>
          </div>
        )
      })}
    </div>
  )
}
