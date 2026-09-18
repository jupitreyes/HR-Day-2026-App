import { useState } from 'react'
import { Button } from "@/components/ui/Button"
import { LeaderboardView } from "@/components/ui/LeaderboardView"

export function StartScreen({ onStart }: { onStart: (teamName: string, venue: string) => void }) {
  const [teamName, setTeamName] = useState('')
  const [venue, setVenue] = useState('Manila')

  return (
    <div className="flex flex-col min-h-dvh p-6 text-center space-y-12 bg-halftone overflow-y-auto font-sans bg-[#0B0A10]">
      <div className="space-y-4 pt-12 animate-in slide-in-from-top-4 duration-700">
        <h1 className="text-5xl md:text-7xl font-heading text-retro-pink drop-shadow-[0_0_20px_rgba(232,38,181,0.6)]">PROJECT</h1>
        <h1 className="text-5xl md:text-7xl font-heading text-retro-cyan drop-shadow-[0_0_20px_rgba(61,224,210,0.6)]">UNLOCKED</h1>
      </div>
      
      <p className="text-xl max-w-sm mx-auto leading-relaxed text-white/80 animate-in fade-in duration-700 delay-200 fill-mode-both">
        Work together. Move fast. Time starts as soon as you connect.
      </p>

      <div className="space-y-4 max-w-sm mx-auto w-full bg-glass p-6 rounded-lg animate-in zoom-in-95 duration-700 delay-300 fill-mode-both">
        <input 
          className="w-full bg-black/60 border border-white/20 text-white p-4 font-mono outline-none focus:border-retro-cyan focus:shadow-[0_0_10px_rgba(61,224,210,0.2)] rounded-sm transition-all"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="ENTER TEAM NAME_"
          maxLength={30}
        />
        <select 
          className="w-full bg-black/60 border border-white/20 text-white p-4 font-mono outline-none focus:border-retro-cyan focus:shadow-[0_0_10px_rgba(61,224,210,0.2)] rounded-sm transition-all"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        >
          <option value="Manila">MANILA MPRs</option>
          <option value="Cebu">CEBU</option>
        </select>
        
        <Button onClick={() => onStart(teamName, venue)} className="w-full mt-6 shadow-[0_0_15px_rgba(232,38,181,0.4)]" disabled={!teamName.trim()}>
          INITIATE SEQUENCE
        </Button>
      </div>

      <div className="max-w-lg mx-auto w-full pt-8 pb-12 text-left animate-in fade-in duration-700 delay-500 fill-mode-both">
        <h3 className="text-xl font-heading text-retro-cyan mb-6 text-center tracking-widest drop-shadow-[0_0_10px_rgba(61,224,210,0.4)]">LIVE LEADERBOARD</h3>
        <LeaderboardView />
      </div>
    </div>
  )
}
