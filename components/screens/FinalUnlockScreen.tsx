import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { UnlockSequence } from '@/components/ui/UnlockSequence'

export function FinalUnlockScreen({ onNext }: { onNext: () => void }) {
  const [word1, setWord1] = useState('')
  const [word2, setWord2] = useState('')
  const [word3, setWord3] = useState('')
  const [finalAnswer, setFinalAnswer] = useState('')
  const [error, setError] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)

  const checkAnswer = () => {
    const w1 = word1.trim().toUpperCase()
    const w2 = word2.trim().toUpperCase()
    const w3 = word3.trim().toUpperCase()
    const final = finalAnswer.trim().toLowerCase().replace(/\s+/g, '')

    if (w1 === 'PROJECT' && w2 === 'MANAGE' && w3 === 'MENT' && final === 'projectmanagement') {
      setError(false)
      setIsUnlocking(true)
    } else {
      setError(true)
    }
  }

  if (isUnlocking) {
    return <UnlockSequence isFinal onComplete={onNext} />
  }

  return (
    <div className="space-y-12 py-6 flex flex-col flex-1 animate-in fade-in duration-700">
      <div className="text-center space-y-4 animate-in slide-in-from-top-4 duration-700 delay-100 fill-mode-both">
        <h2 className="text-4xl md:text-5xl font-heading text-retro-cyan text-shadow-retro-cyan uppercase tracking-widest">FINAL UNLOCK</h2>
        <p className="font-sans text-white/80 text-lg">Unscramble the station codes and solve the final question.</p>
      </div>

      <div className="space-y-8 flex-1 animate-in zoom-in-95 duration-700 delay-300 fill-mode-both">
        <div className="space-y-4 font-sans bg-retro-panel p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 group">
            <span className="font-mono text-xl text-retro-pink font-bold sm:w-32 tracking-widest group-hover:text-white transition-colors">JPECTOR</span>
            <span className="text-retro-cyan animate-pulse hidden sm:inline">→</span>
            <input 
              className="w-full sm:flex-1 bg-black/80 border-4 border-white/50 text-white p-4 uppercase outline-none focus:border-retro-cyan focus:shadow-[4px_4px_0px_rgba(0,255,255,0.4)] transition-all"
              value={word1}
              onChange={(e) => setWord1(e.target.value)}
              placeholder="UNSCRAMBLE..."
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 group">
            <span className="font-mono text-xl text-retro-pink font-bold sm:w-32 tracking-widest group-hover:text-white transition-colors">AEGANM</span>
            <span className="text-retro-cyan animate-pulse hidden sm:inline">→</span>
            <input 
              className="w-full sm:flex-1 bg-black/80 border-4 border-white/50 text-white p-4 uppercase outline-none focus:border-retro-cyan focus:shadow-[4px_4px_0px_rgba(0,255,255,0.4)] transition-all"
              value={word2}
              onChange={(e) => setWord2(e.target.value)}
              placeholder="UNSCRAMBLE..."
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 group">
            <span className="font-mono text-xl text-retro-pink font-bold sm:w-32 tracking-widest group-hover:text-white transition-colors">TMEN</span>
            <span className="text-retro-cyan animate-pulse hidden sm:inline">→</span>
            <input 
              className="w-full sm:flex-1 bg-black/80 border-4 border-white/50 text-white p-4 uppercase outline-none focus:border-retro-cyan focus:shadow-[4px_4px_0px_rgba(0,255,255,0.4)] transition-all"
              value={word3}
              onChange={(e) => setWord3(e.target.value)}
              placeholder="UNSCRAMBLE..."
            />
          </div>
        </div>

        <div className="bg-black/40 p-8 border-4 border-retro-pink space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-retro-pink/5 opacity-50"></div>
          <p className="font-sans font-semibold text-xl leading-relaxed text-center relative z-10">
            Name the practice that turns plans into coordinated delivery by aligning people, priorities, and pace.
          </p>
          <input 
            className="w-full bg-black/80 border-4 border-retro-pink/50 text-retro-pink p-5 font-mono font-bold text-2xl text-center outline-none focus:border-retro-pink focus:shadow-[4px_4px_0px_rgba(255,0,255,0.4)] uppercase tracking-widest transition-all relative z-10"
            value={finalAnswer}
            onChange={(e) => setFinalAnswer(e.target.value)}
            placeholder="FINAL ANSWER"
          />
        </div>
        
        {error && <p className="text-retro-pink animate-pulse font-mono font-bold text-center bg-retro-pink/10 p-3 border-4 border-retro-pink/30">ACCESS DENIED. INCORRECT CODES OR FINAL ANSWER.</p>}
      </div>

      <div className="pb-8 pt-4 animate-in fade-in duration-700 delay-500 fill-mode-both">
        <Button onClick={checkAnswer} className="w-full">[ INITIALIZE UNLOCK ]</Button>
      </div>
    </div>
  )
}
