import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CodeBox } from '@/components/ui/CodeBox'

export function Station3Screen({
  onNext,
  useHint,
  hintsUsed
}: {
  onNext: () => void
  useHint: (hintId: string) => void
  hintsUsed: Record<string, boolean>
}) {
  const [clue1Answer, setClue1Answer] = useState<string>('')
  // 0: undefined, 1: true, 2: false
  const [clue2Answers, setClue2Answers] = useState<number[]>([0, 0, 0])

  const [clue1Error, setClue1Error] = useState(false)
  const [clue2Error, setClue2Error] = useState(false)
  
  const [unlocked, setUnlocked] = useState(false)

  const checkAnswers = () => {
    let isValid = true

    // Check Clue 1 loosely
    const ans = clue1Answer.toLowerCase()
    const identifiedBug = /before|early|refresh|stale|finish|wait/i.test(ans)
    const proposedTime = /[67]:[3-5][0-9]|0[67]:[3-5][0-9]|7:00|07:00|7\s*am|7:\s*00|08:|8:00/i.test(ans) || /after 6:30/i.test(ans) || /later/i.test(ans)
    
    if (!(identifiedBug && proposedTime)) {
      setClue1Error(true)
      isValid = false
    } else {
      setClue1Error(false)
    }

    // Check Clue 2 (F, T, F) -> (2, 1, 2)
    if (clue2Answers[0] !== 2 || clue2Answers[1] !== 1 || clue2Answers[2] !== 2) {
      setClue2Error(true)
      isValid = false
    } else {
      setClue2Error(false)
    }

    if (isValid) {
      setUnlocked(true)
    }
  }

  if (unlocked) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center space-y-12 animate-in fade-in zoom-in">
        <h2 className="text-4xl text-retro-cyan drop-shadow-[0_0_10px_rgba(61,224,210,0.8)]">SUCCESS</h2>
        <div className="space-y-4 text-center">
          <p className="text-gray-400 uppercase tracking-widest text-sm font-sans">Station Code Revealed</p>
          <CodeBox code="TMEN" />
        </div>
        <Button onClick={onNext}>Continue to Final Unlock</Button>
      </div>
    )
  }

  return (
    <div className="space-y-12 py-6">
      {/* CLUE 1 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading text-retro-pink">CLUE 1 OF 2</h3>
          <Button 
            variant="ghost" 
            className="!px-3 !py-1 !text-sm w-auto font-sans font-semibold tracking-normal" 
            onClick={() => useHint('st3-c1')}
            disabled={hintsUsed['st3-c1']}
          >
            {hintsUsed['st3-c1'] ? 'Hint Used' : 'Use Hint (+1 min)'}
          </Button>
        </div>
        
        {hintsUsed['st3-c1'] && (
          <div className="p-4 border border-retro-yellow text-retro-yellow bg-retro-yellow/10 font-sans">
            <strong className="font-bold">HINT:</strong> Look at the timing overlap. If the report runs before the source data is done refreshing, what will it show? How much buffer should you add?
          </div>
        )}

        <div className="space-y-4">
          <p className="text-xl leading-relaxed">
            A daily report starts at 06:00 (takes 45 min). The source data refresh completes at ~06:30. The report always shows stale numbers.
          </p>
          <p className="text-retro-cyan font-bold font-sans">Identify the bug and propose a fix (time):</p>
          <textarea
            className="w-full bg-retro-bg border-2 border-retro-cyan/50 text-white p-4 outline-none focus:border-retro-cyan font-sans min-h-32"
            value={clue1Answer}
            onChange={(e) => setClue1Answer(e.target.value)}
            placeholder="e.g. The report runs before... A better time is..."
          />
          {clue1Error && <p className="text-retro-pink animate-pulse font-sans font-bold">Incorrect analysis in Clue 1.</p>}
        </div>
      </div>

      <div className="h-px bg-white/20 w-full" />

      {/* CLUE 2 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading text-retro-pink">CLUE 2 OF 2</h3>
          <Button 
            variant="ghost" 
            className="!px-3 !py-1 !text-sm w-auto font-sans font-semibold tracking-normal" 
            onClick={() => useHint('st3-c2')}
            disabled={hintsUsed['st3-c2']}
          >
            {hintsUsed['st3-c2'] ? 'Hint Used' : 'Use Hint (+1 min)'}
          </Button>
        </div>

        {hintsUsed['st3-c2'] && (
          <div className="p-4 border border-retro-yellow text-retro-yellow bg-retro-yellow/10 font-sans">
            <strong className="font-bold">HINT:</strong> Automation doesn't mean set-and-forget. Validation prevents bad data from spreading. Humans still need to review outputs.
          </div>
        )}

        <div className="space-y-6 font-sans">
          {[
            "Once an automated workflow is set up, it does not need to be reviewed unless it breaks.",
            "Data validation should happen before transformation to prevent errors from multiplying downstream.",
            "Automation eliminates the need for human review of outputs."
          ].map((question, i) => (
            <div key={i} className="flex flex-col gap-2 bg-white/5 p-4 border border-white/10">
              <p className="text-sm font-semibold">{question}</p>
              <div className="flex gap-2 mt-2">
                <Button 
                  variant={clue2Answers[i] === 1 ? 'primary' : 'ghost'} 
                  className="!px-4 !py-2 !text-sm w-full"
                  onClick={() => {
                    const newAnswers = [...clue2Answers]
                    newAnswers[i] = 1
                    setClue2Answers(newAnswers)
                  }}
                >TRUE</Button>
                <Button 
                  variant={clue2Answers[i] === 2 ? 'primary' : 'ghost'} 
                  className="!px-4 !py-2 !text-sm w-full"
                  onClick={() => {
                    const newAnswers = [...clue2Answers]
                    newAnswers[i] = 2
                    setClue2Answers(newAnswers)
                  }}
                >FALSE</Button>
              </div>
            </div>
          ))}
          {clue2Error && <p className="text-retro-pink animate-pulse font-sans font-bold">Incorrect answers in Clue 2.</p>}
        </div>
      </div>

      <div className="pt-6 pb-12">
        <Button onClick={checkAnswers}>Check Answers</Button>
      </div>
    </div>
  )
}
