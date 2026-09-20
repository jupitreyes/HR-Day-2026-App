import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { formatTime } from '@/components/ui/Timer'

export function ResultsScreen({
  elapsedRealTime,
  hintPenalties,
  onViewLeaderboard
}: {
  elapsedRealTime: number
  hintPenalties: number
  onViewLeaderboard: (totalSeconds: number) => Promise<void>
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const finalTimeSeconds = elapsedRealTime + hintPenalties

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await onViewLeaderboard(finalTimeSeconds)
  }

  return (
    <div className="space-y-8 py-6">
      <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-4xl md:text-5xl font-heading text-retro-cyan text-shadow-retro-cyan">
          UNLOCKED!
        </h2>
        <div className="flex flex-col items-center justify-center p-8 bg-retro-panel gap-3">
          <p className="text-retro-cyan/70 font-mono uppercase tracking-[0.3em] text-sm font-bold">Total Time</p>
          <p className="text-5xl md:text-7xl font-mono text-white text-shadow-retro-pink">{formatTime(finalTimeSeconds)}</p>
          <p className="text-sm font-mono text-retro-yellow/90 mt-2 uppercase tracking-widest bg-retro-yellow/20 px-4 py-2 border-2 border-retro-yellow">
            Base: {formatTime(elapsedRealTime)} <span className="opacity-50 mx-2">|</span> Penalties: {formatTime(hintPenalties)}
          </p>
        </div>
      </div>

      <div className="bg-black/80 border-4 border-retro-pink p-6 font-sans text-sm space-y-5 leading-relaxed text-gray-300 animate-in fade-in duration-700 delay-300 fill-mode-both shadow-[4px_4px_0px_rgba(255,0,255,0.4)]">
        <p><strong className="text-white font-semibold">Cross-Regional Operations</strong> ensures that projects spanning multiple geographies have clear ownership, aligned timelines, and no dependency gaps. When you are running something that crosses borders, they are the bridge.</p>
        <p><strong className="text-white font-semibold">Change Management</strong> ensures that every system change, process update, or new initiative lands well with the people it affects. Before anything goes live, they make sure stakeholders are informed, trained, and ready. They are the anchor.</p>
        <p><strong className="text-white font-semibold">Data Automation</strong> builds and maintains the automated workflows that power HR reporting and analytics. When data needs to move accurately and on time, they keep it flowing. They are the flow.</p>
        <p className="text-retro-cyan font-bold tracking-wide mt-6 border-t border-white/10 pt-4">Together, we are the project engine behind HR. If you are launching something, changing something, or reporting on something — come find us early.</p>
      </div>

      <div className="pt-8 border-t-4 border-white/20 animate-in fade-in duration-700 delay-500 fill-mode-both">
        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
          {isSubmitting ? '[ TRANSMITTING SCORE... ]' : '[ SUBMIT SCORE & VIEW LEADERBOARD ]'}
        </Button>
      </div>
    </div>
  )
}
