import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CodeBox } from '@/components/ui/CodeBox'
import { UnlockSequence } from '@/components/ui/UnlockSequence'

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
  
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

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
      setIsUnlocking(true)
    }
  }

  if (showIntro) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center space-y-8 animate-in fade-in zoom-in px-4 py-8">
        <div className="text-[80px] drop-shadow-retro">🤖</div>
        <p className="text-lg text-white/90 text-center font-sans leading-relaxed max-w-xl bg-retro-panel p-6 mt-4">
          An automated HR report has been sending incorrect data for three days. No one noticed until an HR partner flagged it. Find the break in the workflow before the next report runs. You have 3 minutes.
        </p>
        <Button onClick={() => setShowIntro(false)} className="mt-4 px-12">
          [ BEGIN ]
        </Button>
      </div>
    )
  }

  if (isUnlocking && !unlocked) {
    return <UnlockSequence onComplete={() => setUnlocked(true)} />
  }

  if (unlocked) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center space-y-12 animate-in fade-in zoom-in">
        <h2 className="text-4xl text-retro-cyan text-shadow-retro-cyan font-heading">ACCESS GRANTED</h2>
        <div className="space-y-4 text-center w-full max-w-sm">
          <p className="text-retro-cyan/70 uppercase tracking-widest text-sm font-sans">Key obtained, proceed to the next station</p>
          <CodeBox code="JPECTOR" />
        </div>
        <Button onClick={onNext} className="mt-8">CONTINUE TO STATION 2</Button>
      </div>
    )
  }

  return (
    <div className="space-y-12 py-6">
      {/* CLUE 1 */}
      <div className="bg-retro-panel p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-heading text-retro-pink flex items-center gap-2">
            <span className="w-2 h-2 bg-retro-pink animate-pulse" />
            CLUE 1 OF 2
          </h3>
          <Button 
            variant="ghost" 
            className="!px-4 !py-2 !text-xs w-auto font-sans font-semibold tracking-widest" 
            onClick={() => useHint('st3-c1')}
            disabled={hintsUsed['st3-c1']}
          >
            {hintsUsed['st3-c1'] ? 'Hint Active' : 'Request Hint (+1 min)'}
          </Button>
        </div>
        
        {hintsUsed['st3-c1'] && (
          <div className="p-4 border-l-4 border-retro-yellow text-retro-yellow bg-retro-yellow/5 font-sans shadow-[inset_0_0_20px_rgba(250,204,21,0.05)]">
            <strong className="font-bold tracking-wider">SYSTEM HINT:</strong> Look at the timing overlap. If the report runs before the source data is done refreshing, what will it show? How much buffer should you add?
          </div>
        )}

        <div className="space-y-6">
          <p className="text-lg text-white/90 font-sans leading-relaxed">
            A daily report starts at 06:00 (takes 45 min). The source data refresh completes at ~06:30. The report always shows stale numbers.
          </p>
          <div className="bg-black/40 p-4 border-4 border-white/20 space-y-3">
            <p className="text-retro-cyan font-mono text-sm tracking-widest uppercase">Identify the bug and propose a fix (time):</p>
            <textarea
              className="w-full bg-black/80 border-4 border-white/50 text-white p-4 outline-none focus:border-retro-cyan focus:shadow-[4px_4px_0px_rgba(0,255,255,0.4)] font-sans min-h-[8rem] transition-all resize-y"
              value={clue1Answer}
              onChange={(e) => setClue1Answer(e.target.value)}
              placeholder="e.g. The report runs before... A better time is..."
            />
          </div>
          {clue1Error && <p className="text-retro-pink animate-pulse font-mono font-bold text-sm bg-retro-pink/10 p-3 border-4 border-retro-pink/30">ERROR: Incorrect analysis in Clue 1.</p>}
        </div>
      </div>

      {/* CLUE 2 */}
      <div className="bg-retro-panel p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-heading text-retro-pink flex items-center gap-2">
            <span className="w-2 h-2 bg-retro-pink animate-pulse" />
            CLUE 2 OF 2
          </h3>
          <Button 
            variant="ghost" 
            className="!px-4 !py-2 !text-xs w-auto font-sans font-semibold tracking-widest" 
            onClick={() => useHint('st3-c2')}
            disabled={hintsUsed['st3-c2']}
          >
            {hintsUsed['st3-c2'] ? 'Hint Active' : 'Request Hint (+1 min)'}
          </Button>
        </div>

        {hintsUsed['st3-c2'] && (
          <div className="p-4 border-l-4 border-retro-yellow text-retro-yellow bg-retro-yellow/5 font-sans shadow-[inset_0_0_20px_rgba(250,204,21,0.05)]">
            <strong className="font-bold tracking-wider">SYSTEM HINT:</strong> Automation doesn't mean set-and-forget. Validation prevents bad data from spreading. Humans still need to review outputs.
          </div>
        )}

        <div className="space-y-6 font-sans">
          {[
            "Once an automated workflow is set up, it does not need to be reviewed unless it breaks.",
            "Data validation should happen before transformation to prevent errors from multiplying downstream.",
            "Automation eliminates the need for human review of outputs."
          ].map((question, i) => (
            <div key={i} className="flex flex-col gap-4 bg-black/40 p-5 border-4 border-white/20">
              <p className="text-base text-white/90 leading-relaxed font-semibold">{question}</p>
              <div className="flex gap-3 mt-2">
                <Button 
                  variant={clue2Answers[i] === 1 ? 'primary' : 'ghost'} 
                  className={`!px-6 !py-3 !text-sm w-full ${clue2Answers[i] === 1 ? '!bg-retro-cyan !border-retro-cyan hover:!shadow-[4px_4px_0px_rgba(0,255,255,0.4)] !text-black' : ''}`}
                  onClick={() => {
                    const newAnswers = [...clue2Answers]
                    newAnswers[i] = 1
                    setClue2Answers(newAnswers)
                  }}
                >[ TRUE ]</Button>
                <Button 
                  variant={clue2Answers[i] === 2 ? 'primary' : 'ghost'} 
                  className={`!px-6 !py-3 !text-sm w-full ${clue2Answers[i] === 2 ? '!bg-retro-cyan !border-retro-cyan hover:!shadow-[4px_4px_0px_rgba(0,255,255,0.4)] !text-black' : ''}`}
                  onClick={() => {
                    const newAnswers = [...clue2Answers]
                    newAnswers[i] = 2
                    setClue2Answers(newAnswers)
                  }}
                >[ FALSE ]</Button>
              </div>
            </div>
          ))}
          {clue2Error && <p className="text-retro-pink animate-pulse font-mono font-bold text-sm bg-retro-pink/10 p-3 border-4 border-retro-pink/30">ERROR: Incorrect answers in Clue 2.</p>}
        </div>
      </div>

      <div className="pt-8 pb-16">
        <Button onClick={checkAnswers}>[ CHECK ANSWERS ]</Button>
      </div>
    </div>
  )
}
