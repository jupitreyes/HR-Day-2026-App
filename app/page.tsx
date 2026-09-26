"use client"

import { useGameState } from "@/hooks/useGameState"
import { StartScreen } from "@/components/screens/StartScreen"
import { Station1Screen } from "@/components/screens/Station1Screen"
import { Station2Screen } from "@/components/screens/Station2Screen"
import { Station3Screen } from "@/components/screens/Station3Screen"
import { FinalUnlockScreen } from "@/components/screens/FinalUnlockScreen"
import { ResultsScreen } from "@/components/screens/ResultsScreen"
import { LeaderboardScreen } from "@/components/screens/LeaderboardScreen"
import { Timer } from "@/components/ui/Timer"
import { supabase } from "@/lib/supabase/client"
import { useState } from "react"

const STATION_NAMES = {
  station1: "DATA GLITCH",
  station2: "REGIONAL ROADBLOCK",
  station3: "CHANGE FREEZE",
}

export default function GameRunner() {
  const gameState = useGameState()
  const [currentTeamName, setCurrentTeamName] = useState<string>('')
  const [currentVenue, setCurrentVenue] = useState<string>('Manila')
  const [currentSid1, setCurrentSid1] = useState<string>('')
  const [currentSid2, setCurrentSid2] = useState<string>('')

  const handleStartGame = async (teamName: string, venue: string, sid1: string, sid2: string) => {
    try {
      let query = supabase.from('leaderboard').select('id')
      if (sid2) {
        query = query.or(`sid1.eq.${sid1},sid2.eq.${sid1},sid1.eq.${sid2},sid2.eq.${sid2}`)
      } else {
        query = query.or(`sid1.eq.${sid1},sid2.eq.${sid1}`)
      }

      const { data, error } = await query.limit(1).maybeSingle()
      
      if (data) {
        return { error: 'One or both SIDs have already completed the game.' }
      }

      setCurrentTeamName(teamName)
      setCurrentVenue(venue)
      setCurrentSid1(sid1)
      setCurrentSid2(sid2)
      gameState.startGame()
    } catch (e) {
      console.error(e)
      return { error: 'Failed to verify SIDs. Please try again.' }
    }
  }

  const handleLeaderboardSubmit = async (finalTimeSeconds: number) => {
    try {
      await supabase.from('leaderboard').insert([{
        team_name: currentTeamName,
        venue: currentVenue,
        final_time_seconds: finalTimeSeconds,
        sid1: currentSid1,
        sid2: currentSid2 || null
      }])
    } catch (e) {
      console.error(e)
    }
    gameState.setScreen('leaderboard')
  }


  const isStation = ["station1", "station2", "station3"].includes(gameState.screen)
  const stationKey = gameState.screen as keyof typeof STATION_NAMES

  const bgImage = 
    gameState.screen === 'station1' ? '/images/station1.jpg' :
    gameState.screen === 'station2' ? '/images/station2.jpg' :
    gameState.screen === 'station3' ? '/images/station3.jpg' : 
    gameState.screen === 'final' ? '/images/final.jpg' :
    (gameState.screen === 'results' || gameState.screen === 'leaderboard') ? '/images/results.jpg' :
    '/images/landing.jpg';

  return (
    <div className="flex flex-col min-h-dvh bg-retro-bg font-sans relative">
      <div className="fixed inset-0 pointer-events-none bg-halftone z-50 opacity-20 mix-blend-overlay"></div>
      
      {bgImage && (
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center animate-in fade-in duration-1000"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
        </div>
      )}

      {isStation && (
        <header className="sticky top-0 z-20 flex flex-col gap-4 p-4 bg-black/60 backdrop-blur-md border-b border-retro-cyan/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-retro-cyan uppercase tracking-widest">
              {STATION_NAMES[stationKey]}
            </h2>
            <div className="flex space-x-3">
              <div className={`w-3 h-3 rotate-45 border border-retro-cyan/50 ${gameState.screen === 'station1' ? 'bg-retro-cyan shadow-[0_0_10px_#3de0d2]' : ''}`} />
              <div className={`w-3 h-3 rotate-45 border border-retro-cyan/50 ${gameState.screen === 'station2' ? 'bg-retro-cyan shadow-[0_0_10px_#3de0d2]' : ''}`} />
              <div className={`w-3 h-3 rotate-45 border border-retro-cyan/50 ${gameState.screen === 'station3' ? 'bg-retro-cyan shadow-[0_0_10px_#3de0d2]' : ''}`} />
            </div>
          </div>
          
          <div className="flex justify-end gap-4 items-end">
            {gameState.screen === 'station3' && (
              <Timer seconds={gameState.station3Elapsed} label="SYS" className="scale-75 origin-bottom-right opacity-70" />
            )}
            <Timer seconds={gameState.elapsedRealTime} label="TIMER" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-y-auto p-4 flex flex-col max-w-2xl mx-auto w-full space-y-8 relative z-10">
        {gameState.screen === "start" && (
          <StartScreen onStart={handleStartGame} />
        )}
        {gameState.screen === "station1" && (
          <Station3Screen 
            onNext={() => gameState.setScreen('station2')} 
            useHint={gameState.useHint} 
            hintsUsed={gameState.hintsUsed} 
          />
        )}
        {gameState.screen === "station2" && (
          <Station1Screen 
            onNext={() => gameState.setScreen('station3')} 
            useHint={gameState.useHint} 
            hintsUsed={gameState.hintsUsed} 
          />
        )}
        {gameState.screen === "station3" && (
          <Station2Screen 
            onNext={() => gameState.setScreen('final')} 
            useHint={gameState.useHint} 
            hintsUsed={gameState.hintsUsed} 
          />
        )}
        {gameState.screen === "final" && (
          <FinalUnlockScreen onNext={gameState.finishGame} />
        )}
        {gameState.screen === "results" && (
          <ResultsScreen 
            elapsedRealTime={gameState.elapsedRealTime}
            hintPenalties={gameState.hintPenalties}
            onViewLeaderboard={handleLeaderboardSubmit}
          />
        )}
        {gameState.screen === "leaderboard" && (
          <LeaderboardScreen 
            onPlayAgain={gameState.resetGame}
            currentTeamName={currentTeamName}
          />
        )}
      </main>
    </div>
  )
}
