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
        <h2 className="text-5xl font-heading text-retro-cyan drop-shadow-[0_0_20px_rgba(61,224,210,0.8)]">
          UNLOCKED!
        </h2>
        <div className="flex flex-col items-center justify-center p-8 bg-glass border border-retro-cyan/30 gap-3 rounded-lg shadow-[inset_0_0_30px_rgba(61,224,210,0.1)]">
          <p className="text-retro-cyan/70 font-mono uppercase tracking-[0.3em] text-sm font-bold">Total Time</p>
          <p className="text-7xl font-mono text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">{formatTime(finalTimeSeconds)}</p>
          <p className="text-sm font-mono text-retro-yellow/80 mt-2 uppercase tracking-widest bg-retro-yellow/10 px-4 py-2 rounded-full">
            Base: {formatTime(elapsedRealTime)} <span className="opacity-50 mx-2">|</span> Penalties: {formatTime(hintPenalties)}
          </p>
        </div>
      </div>

      <div className="bg-black/60 border-l-4 border-retro-pink p-6 font-sans text-sm space-y-5 leading-relaxed text-gray-300 rounded-r-lg animate-in fade-in duration-700 delay-300 fill-mode-both shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <p><strong className="text-white font-semibold">Cross-Regional Operations</strong> ensures that projects spanning multiple geographies have clear ownership, aligned timelines, and no dependency gaps. When you are running something that crosses borders, they are the bridge.</p>
        <p><strong className="text-white font-semibold">Change Management</strong> ensures that every system change, process update, or new initiative lands well with the people it affects. Before anything goes live, they make sure stakeholders are informed, trained, and ready. They are the anchor.</p>
        <p><strong className="text-white font-semibold">Data Automation</strong> builds and maintains the automated workflows that power HR reporting and analytics. When data needs to move accurately and on time, they keep it flowing. They are the flow.</p>
        <p className="text-retro-cyan font-bold tracking-wide mt-6 border-t border-white/10 pt-4">Together, we are the project engine behind HR. If you are launching something, changing something, or reporting on something — come find us early.</p>
      </div>

      <div className="pt-8 border-t border-white/10 animate-in fade-in duration-700 delay-500 fill-mode-both">
        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full shadow-[0_0_20px_rgba(61,224,210,0.4)]">
          {isSubmitting ? 'TRANSMITTING SCORE...' : 'SUBMIT SCORE & VIEW LEADERBOARD'}
        </Button>
      </div>
    </div>
  )
}
