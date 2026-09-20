import { useState } from 'react'
import { Button } from "@/components/ui/Button"
import { LeaderboardView } from "@/components/ui/LeaderboardView"

export function StartScreen({ onStart }: { onStart: (teamName: string, venue: string) => void }) {
  const [teamName, setTeamName] = useState('')
  const [venue, setVenue] = useState('Manila')

  return (
    <div className="flex flex-col flex-1 text-center space-y-12 font-sans py-8">
      <div className="space-y-6 pt-4 animate-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl md:text-6xl font-heading text-white text-shadow-retro-pink">PROJECT</h1>
        <h1 className="text-4xl md:text-6xl font-heading text-white text-shadow-retro-cyan">UNLOCKED</h1>
      </div>
      
      <p className="text-lg md:text-xl max-w-sm mx-auto leading-relaxed text-white/80 animate-in fade-in duration-700 delay-200 fill-mode-both">
        Work together. Move fast. Time starts as soon as you connect.
      </p>

      <div className="space-y-4 max-w-sm mx-auto w-full bg-retro-panel p-6 animate-in zoom-in-95 duration-700 delay-300 fill-mode-both">
        <input 
          className="w-full bg-black/80 border-4 border-white/50 text-white p-4 font-mono outline-none focus:border-retro-cyan focus:shadow-[4px_4px_0px_rgba(0,255,255,0.4)] transition-all placeholder:text-white/30"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="ENTER TEAM NAME_"
          maxLength={30}
        />
        <select 
          className="w-full bg-black/80 border-4 border-white/50 text-white p-4 font-mono outline-none focus:border-retro-cyan focus:shadow-[4px_4px_0px_rgba(0,255,255,0.4)] transition-all appearance-none"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        >
          <option value="Manila">MANILA MPRs</option>
          <option value="Cebu">CEBU</option>
        </select>
        
        <Button onClick={() => onStart(teamName, venue)} className="w-full mt-6" disabled={!teamName.trim()}>
          [ INITIATE ]
        </Button>
      </div>

      <div className="max-w-lg mx-auto w-full pt-8 pb-12 text-left animate-in fade-in duration-700 delay-500 fill-mode-both">
        <h3 className="text-xl md:text-2xl font-heading text-retro-cyan mb-6 text-center text-shadow-retro-cyan">LIVE LEADERBOARD</h3>
        <LeaderboardView />
      </div>
    </div>
  )
}
