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
  station1: "REGIONAL ROADBLOCK",
  station2: "CHANGE FREEZE",
  station3: "DATA GLITCH",
}

export default function GameRunner() {
  const gameState = useGameState()
  const [currentTeamName, setCurrentTeamName] = useState<string>('')
  const [currentVenue, setCurrentVenue] = useState<string>('Manila')

  const handleStartGame = (teamName: string, venue: string) => {
    setCurrentTeamName(teamName)
    setCurrentVenue(venue)
    gameState.startGame()
  }

  const handleLeaderboardSubmit = async (finalTimeSeconds: number) => {
    try {
      await supabase.from('leaderboard').insert([{
        team_name: currentTeamName,
        venue: currentVenue,
        final_time_seconds: finalTimeSeconds
      }])
    } catch (e) {
      console.error(e)
    }
    gameState.setScreen('leaderboard')
  }

  if (gameState.screen === "start") {
    return <StartScreen onStart={handleStartGame} />
  }

  const isStation = ["station1", "station2", "station3"].includes(gameState.screen)
  const stationKey = gameState.screen as keyof typeof STATION_NAMES
  
  return (
    <div className="flex flex-col min-h-dvh bg-retro-bg">
      {isStation && (
        <header className="sticky top-0 z-10 flex flex-col gap-3 p-4 bg-retro-bg/95 backdrop-blur border-b-2 border-retro-cyan/30">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-retro-pink drop-shadow-[0_0_5px_rgba(232,38,181,0.5)]">
              {STATION_NAMES[stationKey]}
            </h2>
            <div className="flex space-x-2">
              <div className={`w-3 h-3 border-2 border-retro-cyan ${gameState.screen === 'station1' ? 'bg-retro-cyan shadow-[0_0_8px_#3de0d2]' : ''}`} />
              <div className={`w-3 h-3 border-2 border-retro-cyan ${gameState.screen === 'station2' ? 'bg-retro-cyan shadow-[0_0_8px_#3de0d2]' : ''}`} />
              <div className={`w-3 h-3 border-2 border-retro-cyan ${gameState.screen === 'station3' ? 'bg-retro-cyan shadow-[0_0_8px_#3de0d2]' : ''}`} />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 items-end">
            {gameState.screen === 'station3' && (
              <Timer seconds={gameState.station3Timer} label="SYS" className="scale-75 origin-bottom-right border-retro-cyan text-retro-cyan !p-2" />
            )}
            <Timer seconds={gameState.masterTimer} label="MASTER" />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-y-auto p-4 flex flex-col max-w-lg mx-auto w-full">
        {gameState.screen === "station1" && (
          <Station1Screen 
            onNext={() => gameState.setScreen('station2')} 
            useHint={gameState.useHint} 
            hintsUsed={gameState.hintsUsed} 
          />
        )}
        {gameState.screen === "station2" && (
          <Station2Screen 
            onNext={() => gameState.setScreen('station3')} 
            useHint={gameState.useHint} 
            hintsUsed={gameState.hintsUsed} 
          />
        )}
        {gameState.screen === "station3" && (
          <Station3Screen 
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
            masterTimer={gameState.masterTimer}
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
