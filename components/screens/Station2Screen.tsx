import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CodeBox } from '@/components/ui/CodeBox'
import { ArrowUp, ArrowDown } from 'lucide-react'

const CLUE1_ITEMS = [
  "Notify the impacted teams/leads",
  "Setup a Swarm/Command Center",
  "Regroup on implementing a fix",
  "Go offline"
]

const CLUE2_INITIAL = [
  "Inform stakeholders of the change details",
  "Send communications",
  "Sign-off UAT testing",
  "Perform a change impact assessment",
  "Publish the updated resources and guides",
  "Go-live",
  "Perform UAT Testing"
]

export function Station2Screen({
  onNext,
  useHint,
  hintsUsed
}: {
  onNext: () => void
  useHint: (hintId: string) => void
  hintsUsed: Record<string, boolean>
}) {
  const [clue1Answers, setClue1Answers] = useState<string[]>(["", "", ""])
  const [clue2Order, setClue2Order] = useState<string[]>(CLUE2_INITIAL)

  const [clue1Error, setClue1Error] = useState(false)
  const [clue2Error, setClue2Error] = useState(false)
  
  const [unlocked, setUnlocked] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const moveUp = (index: number) => {
    if (index === 0) return
    const newOrder = [...clue2Order]
    const temp = newOrder[index - 1]
    newOrder[index - 1] = newOrder[index]
    newOrder[index] = temp
    setClue2Order(newOrder)
  }

  const moveDown = (index: number) => {
    if (index === clue2Order.length - 1) return
    const newOrder = [...clue2Order]
    const temp = newOrder[index + 1]
    newOrder[index + 1] = newOrder[index]
    newOrder[index] = temp
    setClue2Order(newOrder)
  }

  const checkAnswers = () => {
    let isValid = true

    // Check Clue 1
    if (
      clue1Answers[0] !== "Notify the impacted teams/leads" ||
      clue1Answers[1] !== "Setup a Swarm/Command Center" ||
      clue1Answers[2] !== "Regroup on implementing a fix"
    ) {
      setClue1Error(true)
      isValid = false
    } else {
      setClue1Error(false)
    }

    // Check Clue 2
    let c2Valid = true
    const o = clue2Order
    
    const isImpact = (s: string) => s === "Perform a change impact assessment"
    const isInform = (s: string) => s === "Inform stakeholders of the change details"
    const isPerformUAT = (s: string) => s === "Perform UAT Testing"
    const isSignUAT = (s: string) => s === "Sign-off UAT testing"
    const isPublish = (s: string) => s === "Publish the updated resources and guides"
    const isSend = (s: string) => s === "Send communications"
    const isGoLive = (s: string) => s === "Go-live"

    if (!((isImpact(o[0]) && isInform(o[1])) || (isInform(o[0]) && isImpact(o[1])))) c2Valid = false
    if (!isPerformUAT(o[2])) c2Valid = false
    if (!isSignUAT(o[3])) c2Valid = false
    if (!isPublish(o[4])) c2Valid = false
    if (!((isSend(o[5]) && isGoLive(o[6])) || (isGoLive(o[5]) && isSend(o[6])))) c2Valid = false
    
    const publishIdx = o.indexOf("Publish the updated resources and guides")
    const sendIdx = o.indexOf("Send communications")
    if (publishIdx >= sendIdx) c2Valid = false

    if (!c2Valid) {
      setClue2Error(true)
      isValid = false
    } else {
      setClue2Error(false)
    }

    if (isValid) {
      setUnlocked(true)
    }
  }

  if (showIntro) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center space-y-8 animate-in fade-in zoom-in px-4 py-12">
        <div className="text-7xl drop-shadow-[0_0_20px_rgba(61,224,210,0.6)]">🔄</div>
        <p className="text-lg text-white/90 text-center font-sans leading-relaxed max-w-md bg-glass p-6 rounded-lg border border-retro-cyan/30">
          A major HR system change goes live in 48 hours. Stakeholders have not been informed. Training hasn't been scheduled. The change is at risk of being frozen. Fix the communication plan before it's too late.
        </p>
        <Button onClick={() => setShowIntro(false)} className="mt-4 shadow-[0_0_20px_rgba(232,38,181,0.4)] px-12">
          BEGIN
        </Button>
      </div>
    )
  }

  if (unlocked) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center space-y-12 animate-in fade-in zoom-in">
        <h2 className="text-4xl text-retro-cyan drop-shadow-[0_0_15px_rgba(61,224,210,0.8)] font-heading">ACCESS GRANTED</h2>
        <div className="space-y-4 text-center w-full max-w-sm">
          <p className="text-retro-cyan/70 uppercase tracking-widest text-sm font-sans">Station Code Revealed</p>
          <CodeBox code="AEGANM" />
        </div>
        <Button onClick={onNext} className="mt-8">Continue to Station 3</Button>
      </div>
    )
  }

  return (
    <div className="space-y-12 py-6">
      {/* CLUE 1 */}
      <div className="bg-glass p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-heading text-retro-pink flex items-center gap-2">
            <span className="w-2 h-2 bg-retro-pink animate-pulse" />
            CLUE 1 OF 2
          </h3>
          <Button 
            variant="ghost" 
            className="!px-4 !py-2 !text-xs w-auto font-sans font-semibold tracking-widest" 
            onClick={() => useHint('st2-c1')}
            disabled={hintsUsed['st2-c1']}
          >
            {hintsUsed['st2-c1'] ? 'Hint Active' : 'Request Hint (+1 min)'}
          </Button>
        </div>
        
        {hintsUsed['st2-c1'] && (
          <div className="p-4 border-l-4 border-retro-yellow text-retro-yellow bg-retro-yellow/5 font-sans shadow-[inset_0_0_20px_rgba(250,204,21,0.05)]">
            <strong className="font-bold tracking-wider">SYSTEM HINT:</strong> Start by notifying those impacted. A swarm helps regroup to fix the issue. "Go offline" is a distractor.
          </div>
        )}

        <div className="space-y-6">
          <p className="text-lg text-white/90 font-sans leading-relaxed">Determine the correct escalation path order.</p>
          <div className="grid grid-cols-1 gap-4 font-sans">
            {[0, 1, 2].map((step) => (
              <div key={step} className="flex flex-col gap-2 bg-black/40 p-4 border border-white/5 rounded">
                <span className="font-mono text-retro-cyan/80 text-sm tracking-widest">STEP {step + 1}</span>
                <select 
                  className="bg-black/60 border border-white/20 text-white p-3 outline-none focus:border-retro-cyan w-full rounded-sm transition-colors"
                  value={clue1Answers[step]}
                  onChange={(e) => {
                    const newAnswers = [...clue1Answers]
                    newAnswers[step] = e.target.value
                    setClue1Answers(newAnswers)
                  }}
                >
                  <option value="" disabled>Select action...</option>
                  {CLUE1_ITEMS.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
            ))}
          </div>
          {clue1Error && <p className="text-retro-pink animate-pulse font-mono font-bold text-sm bg-retro-pink/10 p-3 border border-retro-pink/30">ERROR: Incorrect escalation path in Clue 1.</p>}
        </div>
      </div>

      {/* CLUE 2 */}
      <div className="bg-glass p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-heading text-retro-pink flex items-center gap-2">
            <span className="w-2 h-2 bg-retro-pink animate-pulse" />
            CLUE 2 OF 2
          </h3>
          <Button 
            variant="ghost" 
            className="!px-4 !py-2 !text-xs w-auto font-sans font-semibold tracking-widest" 
            onClick={() => useHint('st2-c2')}
            disabled={hintsUsed['st2-c2']}
          >
            {hintsUsed['st2-c2'] ? 'Hint Active' : 'Request Hint (+1 min)'}
          </Button>
        </div>

        {hintsUsed['st2-c2'] && (
          <div className="p-4 border-l-4 border-retro-yellow text-retro-yellow bg-retro-yellow/5 font-sans shadow-[inset_0_0_20px_rgba(250,204,21,0.05)]">
            <strong className="font-bold tracking-wider">SYSTEM HINT:</strong> Assess impact and inform stakeholders first. UAT happens before publishing resources, and comms go out right before go-live.
          </div>
        )}

        <div className="space-y-6">
          <p className="text-lg text-white/90 font-sans leading-relaxed">
            Reorder the change readiness checklist.
          </p>
          <div className="flex flex-col gap-2 font-sans">
            {clue2Order.map((item, index) => (
              <div key={item} className="flex items-center justify-between bg-black/40 p-4 border border-white/5 gap-3 rounded group hover:border-white/20 transition-colors">
                <span className="font-semibold text-sm leading-tight flex-1 tracking-wide">{index + 1}. {item}</span>
                <div className="flex flex-col sm:flex-row gap-1 opacity-100 sm:opacity-50 sm:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => moveUp(index)} 
                    disabled={index === 0}
                    className="p-2 bg-black/60 border border-white/20 text-white hover:text-retro-cyan hover:border-retro-cyan disabled:opacity-30 disabled:hover:text-white disabled:hover:border-white/20 rounded-sm transition-all"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button 
                    onClick={() => moveDown(index)} 
                    disabled={index === clue2Order.length - 1}
                    className="p-2 bg-black/60 border border-white/20 text-white hover:text-retro-cyan hover:border-retro-cyan disabled:opacity-30 disabled:hover:text-white disabled:hover:border-white/20 rounded-sm transition-all"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {clue2Error && <p className="text-retro-pink animate-pulse font-mono font-bold text-sm bg-retro-pink/10 p-3 border border-retro-pink/30">ERROR: Incorrect checklist order in Clue 2.</p>}
        </div>
      </div>

      <div className="pt-8 pb-16">
        <Button onClick={checkAnswers} className="shadow-[0_0_20px_rgba(232,38,181,0.4)]">Check Answers</Button>
      </div>
    </div>
  )
}
