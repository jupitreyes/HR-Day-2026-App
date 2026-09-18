import { useState } from 'react'
import { Button } from "@/components/ui/Button"
import { LeaderboardView } from "@/components/ui/LeaderboardView"

export function StartScreen({ onStart }: { onStart: (teamName: string, venue: string) => void }) {
  const [teamName, setTeamName] = useState('')
  const [venue, setVenue] = useState('Manila')

  return (
    <div className="flex flex-col min-h-dvh p-6 text-center space-y-12 bg-halftone overflow-y-auto">
      <div className="space-y-4 pt-12">
        <h1 className="text-5xl md:text-6xl text-retro-pink drop-shadow-[0_0_15px_rgba(232,38,181,0.8)]">PROJECT</h1>
        <h1 className="text-5xl md:text-6xl text-retro-cyan drop-shadow-[0_0_15px_rgba(61,224,210,0.8)]">UNLOCKED</h1>
      </div>
      
      <p className="text-xl max-w-sm mx-auto leading-relaxed">
        Your team has 9 minutes to solve three puzzles across HR's core functions. Work together. Move fast.
      </p>

      <div className="space-y-4 max-w-sm mx-auto w-full">
        <input 
          className="w-full bg-retro-bg border-2 border-retro-cyan/50 text-white p-4 font-sans outline-none focus:border-retro-cyan"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
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
        
        <Button onClick={() => onStart(teamName, venue)} className="w-full animate-pulse mt-4" disabled={!teamName.trim()}>
          Start Round
        </Button>
      </div>

      <div className="max-w-sm mx-auto w-full pt-8 pb-12 text-left border-t border-white/20">
        <h3 className="text-xl font-heading text-retro-yellow mb-6 text-center">CURRENT LEADERBOARD</h3>
        <LeaderboardView />
      </div>
    </div>
  )
}
