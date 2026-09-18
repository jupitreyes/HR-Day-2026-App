import { useState, useEffect, useCallback } from 'react'

export type GameScreen = 'start' | 'station1' | 'station2' | 'station3' | 'final' | 'results' | 'leaderboard'

export function useGameState() {
  const [screen, setScreen] = useState<GameScreen>('start')
  const [station3Elapsed, setStation3Elapsed] = useState(0)
  const [hintPenalties, setHintPenalties] = useState(0)
  const [hintsUsed, setHintsUsed] = useState<Record<string, boolean>>({})
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [elapsedRealTime, setElapsedRealTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedRealTime((prev) => prev + 1)
        if (screen === 'station3') {
          setStation3Elapsed((prev) => prev + 1)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, screen])

  const startGame = useCallback(() => {
    setScreen('station1')
    setIsTimerRunning(true)
  }, [])

  const useHint = useCallback((hintId: string) => {
    if (!hintsUsed[hintId]) {
      setHintsUsed((prev) => ({ ...prev, [hintId]: true }))
      setHintPenalties((prev) => prev + 60)
    }
  }, [hintsUsed])

  const finishGame = useCallback(() => {
    setIsTimerRunning(false)
    setScreen('results')
  }, [])

  const resetGame = useCallback(() => {
    setScreen('start')
    setStation3Elapsed(0)
    setHintPenalties(0)
    setHintsUsed({})
    setIsTimerRunning(false)
    setElapsedRealTime(0)
  }, [])

  return {
    screen,
    setScreen,
    station3Elapsed,
    hintPenalties,
    hintsUsed,
    isTimerRunning,
    elapsedRealTime,
    startGame,
    useHint,
    finishGame,
    resetGame
  }
}
