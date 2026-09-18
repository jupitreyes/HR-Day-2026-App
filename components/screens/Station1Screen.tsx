import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CodeBox } from '@/components/ui/CodeBox'

// Data for Clue 1
const REGIONS = ['APAC Corporate Center', 'NEA', 'SEA', 'Large Locations']
const COUNTRIES = ['Indonesia', 'Philippines', 'China', 'India', 'Japan', 'Australia', 'Singapore']

const CORRECT_MAPPING: Record<string, string> = {
  'Indonesia': 'SEA',
  'Philippines': 'APAC Corporate Center',
  'China': 'NEA',
  'India': 'APAC Corporate Center',
  'Japan': 'NEA',
  'Australia': 'Large Locations',
  'Singapore': 'SEA'
}

// Data for Clue 2
const WINDOWS = [
  'PH 3:00–4:00PM / IN 12:30–1:30PM / UK 8:00–9:00AM / JP 4:00–5:00PM',
  'PH 4:00–5:00PM / IN 1:30–2:30PM / UK 9:00–10:00AM / JP 5:00–6:00PM'
]

export function Station1Screen({
  onNext,
  useHint,
  hintsUsed
}: {
  onNext: () => void
  useHint: (hintId: string) => void
  hintsUsed: Record<string, boolean>
}) {
  const [clue1Answers, setClue1Answers] = useState<Record<string, string>>({})
  const [clue2Answer, setClue2Answer] = useState<string>('')
  
  const [clue1Error, setClue1Error] = useState(false)
  const [clue2Error, setClue2Error] = useState(false)
  
  const [unlocked, setUnlocked] = useState(false)

  const checkAnswers = () => {
    let isValid = true
    
    // Check clue 1
    let c1Valid = true
    for (const c of COUNTRIES) {
      if (clue1Answers[c] !== CORRECT_MAPPING[c]) c1Valid = false
    }
    if (!c1Valid) {
      setClue1Error(true)
      isValid = false
    } else {
      setClue1Error(false)
    }

    // Check clue 2
    if (!WINDOWS.includes(clue2Answer)) {
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
          <CodeBox code="JPECTOR" />
        </div>
        <Button onClick={onNext}>Continue to Station 2</Button>
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
            onClick={() => useHint('st1-c1')}
            disabled={hintsUsed['st1-c1']}
          >
            {hintsUsed['st1-c1'] ? 'Hint Used' : 'Use Hint (+1 min)'}
          </Button>
        </div>
        
        {hintsUsed['st1-c1'] && (
          <div className="p-4 border border-retro-yellow text-retro-yellow bg-retro-yellow/10 font-sans">
            <strong className="font-bold">HINT:</strong> Naming convention is based on the geography or headcount / nature of the work done in the location.
          </div>
        )}

        <div className="space-y-4">
          <p className="text-xl">Match each country to its region/sub-category.</p>
          <div className="grid grid-cols-1 gap-3">
            {COUNTRIES.map(country => (
              <div key={country} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/5 p-3 border border-white/10 gap-2">
                <span className="font-bold text-xl">{country}</span>
                <select 
                  className="bg-retro-bg border-2 border-retro-cyan/50 text-white p-2 outline-none focus:border-retro-cyan w-full sm:w-auto font-sans"
                  value={clue1Answers[country] || ''}
                  onChange={(e) => setClue1Answers(prev => ({...prev, [country]: e.target.value}))}
                >
                  <option value="" disabled>Select Region...</option>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            ))}
          </div>
          {clue1Error && <p className="text-retro-pink animate-pulse font-sans font-bold">Incorrect mapping in Clue 1.</p>}
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
            onClick={() => useHint('st1-c2')}
            disabled={hintsUsed['st1-c2']}
          >
            {hintsUsed['st1-c2'] ? 'Hint Used' : 'Use Hint (+1 min)'}
          </Button>
        </div>

        {hintsUsed['st1-c2'] && (
          <div className="p-4 border border-retro-yellow text-retro-yellow bg-retro-yellow/10 font-sans">
            <strong className="font-bold">HINT:</strong> Start from the region with the latest timezone — what's the earliest they can meet? Now check if that works for everyone else.
          </div>
        )}

        <div className="space-y-4">
          <p className="text-xl leading-relaxed">
            Find a 1-hour window where everyone is within business hours (8AM–6PM local).<br/>
            <span className="text-gray-400 font-sans text-sm block mt-1 font-semibold">PH (GMT+8), IN (GMT+5:30), UK (GMT+1), JP (GMT+9)</span>
          </p>
          <select 
            className="w-full bg-retro-bg border-2 border-retro-cyan/50 text-white p-4 outline-none focus:border-retro-cyan font-sans"
            value={clue2Answer}
            onChange={(e) => setClue2Answer(e.target.value)}
          >
            <option value="" disabled>Select the correct window...</option>
            <option value="PH 2:00–3:00PM / IN 11:30–12:30PM / UK 7:00–8:00AM / JP 3:00–4:00PM">
              PH 2:00–3:00PM / IN 11:30–12:30PM / UK 7:00–8:00AM / JP 3:00–4:00PM
            </option>
            <option value={WINDOWS[0]}>
              {WINDOWS[0]}
            </option>
            <option value={WINDOWS[1]}>
              {WINDOWS[1]}
            </option>
            <option value="PH 5:00–6:00PM / IN 2:30–3:30PM / UK 10:00–11:00AM / JP 6:00–7:00PM">
              PH 5:00–6:00PM / IN 2:30–3:30PM / UK 10:00–11:00AM / JP 6:00–7:00PM
            </option>
          </select>
          {clue2Error && <p className="text-retro-pink animate-pulse font-sans font-bold">Incorrect window selected in Clue 2.</p>}
        </div>
      </div>

      <div className="pt-6 pb-12">
        <Button onClick={checkAnswers}>Check Answers</Button>
      </div>
    </div>
  )
}
