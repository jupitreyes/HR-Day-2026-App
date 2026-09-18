import { useState, useEffect, useCallback } from 'react'

export type GameScreen = 'start' | 'station1' | 'station2' | 'station3' | 'final' | 'results' | 'leaderboard'

export function useGameState() {
  const [screen, setScreen] = useState<GameScreen>('start')
  const [masterTimer, setMasterTimer] = useState(540) // 9 minutes
  const [station3Timer, setStation3Timer] = useState(180) // 3 minutes
  const [hintPenalties, setHintPenalties] = useState(0)
  const [hintsUsed, setHintsUsed] = useState<Record<string, boolean>>({})
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [elapsedRealTime, setElapsedRealTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && masterTimer > 0) {
      interval = setInterval(() => {
        setMasterTimer((prev) => Math.max(0, prev - 1))
        setElapsedRealTime((prev) => prev + 1)
        if (screen === 'station3') {
          setStation3Timer((prev) => Math.max(0, prev - 1))
        }
      }, 1000)
    } else if (masterTimer === 0 && isTimerRunning) {
      // Auto-end the game when timer hits 0
      setIsTimerRunning(false)
      if (screen !== 'leaderboard') {
        setScreen('results')
      }
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, masterTimer, screen])

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
    setMasterTimer(540)
    setStation3Timer(180)
    setHintPenalties(0)
    setHintsUsed({})
    setIsTimerRunning(false)
    setElapsedRealTime(0)
  }, [])

  return {
    screen,
    setScreen,
    masterTimer,
    station3Timer,
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
