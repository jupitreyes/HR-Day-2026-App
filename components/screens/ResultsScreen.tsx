import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { formatTime } from '@/components/ui/Timer'

export function ResultsScreen({
  masterTimer,
  elapsedRealTime,
  hintPenalties,
  onViewLeaderboard
}: {
  masterTimer: number
  elapsedRealTime: number
  hintPenalties: number
  onViewLeaderboard: (teamName: string, venue: string, totalSeconds: number) => Promise<void>
}) {
  const [teamName, setTeamName] = useState('')
  const [venue, setVenue] = useState('Manila')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isTimeUp = masterTimer === 0
  const finalTimeSeconds = elapsedRealTime + hintPenalties

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await onViewLeaderboard(teamName.trim(), venue, finalTimeSeconds)
  }

  return (
    <div className="space-y-8 py-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl text-retro-pink drop-shadow-[0_0_10px_rgba(232,38,181,0.8)]">
          {isTimeUp ? "TIME'S UP" : "UNLOCKED!"}
        </h2>
        <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/20 gap-2">
          <p className="text-gray-400 font-sans uppercase tracking-widest text-xs">Total Time</p>
          <p className="text-5xl font-body text-white">{formatTime(finalTimeSeconds)}</p>
          <p className="text-sm font-sans text-retro-yellow mt-2">
            Base: {formatTime(elapsedRealTime)} + Penalties: {formatTime(hintPenalties)}
          </p>
        </div>
      </div>

      <div className="bg-retro-bg border-l-4 border-retro-cyan p-4 font-sans text-sm space-y-4 leading-relaxed text-gray-300">
        <p><strong className="text-white">Cross-Regional Operations</strong> ensures that projects spanning multiple geographies have clear ownership, aligned timelines, and no dependency gaps. When you are running something that crosses borders, they are the bridge.</p>
        <p><strong className="text-white">Change Management</strong> ensures that every system change, process update, or new initiative lands well with the people it affects. Before anything goes live, they make sure stakeholders are informed, trained, and ready. They are the anchor.</p>
        <p><strong className="text-white">Data Automation</strong> builds and maintains the automated workflows that power HR reporting and analytics. When data needs to move accurately and on time, they keep it flowing. They are the flow.</p>
        <p className="text-white font-semibold">Together, we are the project engine behind HR. If you are launching something, changing something, or reporting on something — come find us early.</p>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/20">
        <h3 className="font-heading text-lg text-retro-pink text-center">JOIN LEADERBOARD</h3>
        <input 
          className="w-full bg-retro-bg border-2 border-retro-cyan/50 text-white p-4 font-sans outline-none focus:border-retro-cyan"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name (Optional)"
          maxLength={30}
        />
        <select 
          className="w-full bg-retro-bg border-2 border-retro-cyan/50 text-white p-4 font-sans outline-none focus:border-retro-cyan"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        >
          <option value="Manila">Manila MPRs</option>
          <option value="Cebu">Cebu</option>
        </select>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Saving...' : 'View Leaderboard'}
        </Button>
      </div>
    </div>
  )
}
