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
        <h2 className="text-4xl text-retro-cyan drop-shadow-[0_0_10px_rgba(61,224,210,0.8)]">FINAL UNLOCK</h2>
        <p className="font-sans text-gray-300">Unscramble the station codes and solve the final question.</p>
      </div>

      <div className="space-y-8 flex-1">
        <div className="space-y-4 font-sans">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xl text-retro-pink font-bold w-24">JPECTOR</span>
            <span className="text-retro-cyan">→</span>
            <input 
              className="flex-1 bg-retro-bg border-2 border-retro-cyan/50 text-white p-3 uppercase outline-none focus:border-retro-cyan"
              value={word1}
              onChange={(e) => setWord1(e.target.value)}
              placeholder="Unscramble..."
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xl text-retro-pink font-bold w-24">AEGANM</span>
            <span className="text-retro-cyan">→</span>
            <input 
              className="flex-1 bg-retro-bg border-2 border-retro-cyan/50 text-white p-3 uppercase outline-none focus:border-retro-cyan"
              value={word2}
              onChange={(e) => setWord2(e.target.value)}
              placeholder="Unscramble..."
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xl text-retro-pink font-bold w-24">TMEN</span>
            <span className="text-retro-cyan">→</span>
            <input 
              className="flex-1 bg-retro-bg border-2 border-retro-cyan/50 text-white p-3 uppercase outline-none focus:border-retro-cyan"
              value={word3}
              onChange={(e) => setWord3(e.target.value)}
              placeholder="Unscramble..."
            />
          </div>
        </div>

        <div className="bg-white/5 p-6 border border-white/20 space-y-4">
          <p className="font-sans font-semibold text-lg leading-relaxed">
            Name the practice that turns plans into coordinated delivery by aligning people, priorities, and pace.
          </p>
          <input 
            className="w-full bg-retro-bg border-2 border-retro-pink/50 text-white p-4 font-bold text-xl outline-none focus:border-retro-pink uppercase"
            value={finalAnswer}
            onChange={(e) => setFinalAnswer(e.target.value)}
            placeholder="Final Answer..."
          />
        </div>
        
        {error && <p className="text-retro-pink animate-pulse font-sans font-bold text-center">ACCESS DENIED. Check your codes and final answer.</p>}
      </div>

      <div className="pb-8">
        <Button onClick={checkAnswer} className="bg-retro-cyan border-retro-cyan text-retro-bg hover:bg-retro-cyan/90">UNLOCK</Button>
      </div>
    </div>
  )
}
