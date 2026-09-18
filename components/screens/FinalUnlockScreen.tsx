import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function FinalUnlockScreen({ onNext }: { onNext: () => void }) {
  const [word1, setWord1] = useState('')
  const [word2, setWord2] = useState('')
  const [word3, setWord3] = useState('')
  const [finalAnswer, setFinalAnswer] = useState('')
  const [error, setError] = useState(false)

  const checkAnswer = () => {
    const w1 = word1.trim().toUpperCase()
    const w2 = word2.trim().toUpperCase()
    const w3 = word3.trim().toUpperCase()
    const final = finalAnswer.trim().toLowerCase().replace(/\s+/g, '')

    if (w1 === 'PROJECT' && w2 === 'MANAGE' && w3 === 'MENT' && final === 'projectmanagement') {
      onNext()
    } else {
      setError(true)
    }
  }

  return (
    <div className="space-y-12 py-6 flex flex-col flex-1">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-heading text-retro-cyan drop-shadow-[0_0_15px_rgba(61,224,210,0.8)] uppercase tracking-widest">FINAL UNLOCK</h2>
        <p className="font-sans text-gray-300 text-lg">Unscramble the station codes and solve the final question.</p>
      </div>

      <div className="space-y-8 flex-1">
        <div className="space-y-4 font-sans bg-glass p-6 rounded-lg">
          <div className="flex items-center gap-4 group">
            <span className="font-mono text-xl text-retro-pink font-bold w-24 tracking-widest group-hover:text-white transition-colors">JPECTOR</span>
            <span className="text-retro-cyan animate-pulse">→</span>
            <input 
              className="flex-1 bg-black/60 border border-white/20 text-white p-4 uppercase outline-none focus:border-retro-cyan focus:shadow-[0_0_10px_rgba(61,224,210,0.2)] rounded-sm transition-all"
              value={word1}
              onChange={(e) => setWord1(e.target.value)}
              placeholder="UNSCRAMBLE..."
            />
          </div>
          <div className="flex items-center gap-4 group">
            <span className="font-mono text-xl text-retro-pink font-bold w-24 tracking-widest group-hover:text-white transition-colors">AEGANM</span>
            <span className="text-retro-cyan animate-pulse">→</span>
            <input 
              className="flex-1 bg-black/60 border border-white/20 text-white p-4 uppercase outline-none focus:border-retro-cyan focus:shadow-[0_0_10px_rgba(61,224,210,0.2)] rounded-sm transition-all"
              value={word2}
              onChange={(e) => setWord2(e.target.value)}
              placeholder="UNSCRAMBLE..."
            />
          </div>
          <div className="flex items-center gap-4 group">
            <span className="font-mono text-xl text-retro-pink font-bold w-24 tracking-widest group-hover:text-white transition-colors">TMEN</span>
            <span className="text-retro-cyan animate-pulse">→</span>
            <input 
              className="flex-1 bg-black/60 border border-white/20 text-white p-4 uppercase outline-none focus:border-retro-cyan focus:shadow-[0_0_10px_rgba(61,224,210,0.2)] rounded-sm transition-all"
              value={word3}
              onChange={(e) => setWord3(e.target.value)}
              placeholder="UNSCRAMBLE..."
            />
          </div>
        </div>

        <div className="bg-black/40 p-8 border border-white/10 space-y-6 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-retro-pink/5 opacity-50"></div>
          <p className="font-sans font-semibold text-xl leading-relaxed text-center relative z-10">
            Name the practice that turns plans into coordinated delivery by aligning people, priorities, and pace.
          </p>
          <input 
            className="w-full bg-black/80 border border-retro-pink/50 text-retro-pink p-5 font-mono font-bold text-2xl text-center outline-none focus:border-retro-pink focus:shadow-[0_0_20px_rgba(232,38,181,0.3)] uppercase tracking-widest rounded-sm transition-all relative z-10"
            value={finalAnswer}
            onChange={(e) => setFinalAnswer(e.target.value)}
            placeholder="FINAL ANSWER"
          />
        </div>
        
        {error && <p className="text-retro-pink animate-pulse font-mono font-bold text-center bg-retro-pink/10 p-3 rounded-sm border border-retro-pink/30">ACCESS DENIED. INCORRECT CODES OR FINAL ANSWER.</p>}
      </div>

      <div className="pb-8 pt-4">
        <Button onClick={checkAnswer} className="w-full shadow-[0_0_20px_rgba(61,224,210,0.4)]">INITIALIZE UNLOCK</Button>
      </div>
    </div>
  )
}
