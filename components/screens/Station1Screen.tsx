import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CodeBox } from '@/components/ui/CodeBox'
import { UnlockSequence } from '@/components/ui/UnlockSequence'

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
  'Singapore': 'Large Locations'
}

// Data for Clue 2
const TZ_COUNTRIES = [
  { id: 'PH', label: 'PH (GMT+8)' },
  { id: 'IN', label: 'IN (GMT+5:30)' },
  { id: 'UK', label: 'UK (GMT+1)' },
  { id: 'JP', label: 'JP (GMT+9)' }
]

const HOURS_OPTIONS = [
  '7:00-8:00AM', '8:00-9:00AM', '9:00-10:00AM', '10:00-11:00AM',
  '11:30-12:30PM', '12:30-1:30PM', '1:30-2:30PM', '2:30-3:30PM',
  '2:00-3:00PM', '3:00-4:00PM', '4:00-5:00PM', '5:00-6:00PM', '6:00-7:00PM'
]

const CORRECT_HOURS: Record<string, string> = {
  'PH': '3:00-4:00PM',
  'IN': '12:30-1:30PM',
  'UK': '8:00-9:00AM',
  'JP': '4:00-5:00PM'
}

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
  const [clue2Answers, setClue2Answers] = useState<Record<string, string>>({})
  
  const [clue1Error, setClue1Error] = useState(false)
  const [clue2Error, setClue2Error] = useState(false)
  
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

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
    let c2Valid = true
    for (const tz of TZ_COUNTRIES) {
      if (clue2Answers[tz.id] !== CORRECT_HOURS[tz.id]) c2Valid = false
    }
    if (!c2Valid) {
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
        <div className="text-[80px] drop-shadow-retro">🌍</div>
        <p className="text-lg text-white/90 text-center font-sans leading-relaxed max-w-xl bg-retro-panel p-6 mt-4">
          A critical HR project is stalled. A cross-regional dependency has been missed and no one knows who owns it. Two clues stand between the project and progress. It's your role to unblock it.
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
          <p className="text-retro-cyan/70 uppercase tracking-widest text-sm font-sans">Station Code Revealed</p>
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
            onClick={() => useHint('st1-c1')}
            disabled={hintsUsed['st1-c1']}
          >
            {hintsUsed['st1-c1'] ? 'Hint Active' : 'Request Hint (+1 min)'}
          </Button>
        </div>
        
        {hintsUsed['st1-c1'] && (
          <div className="p-4 border-l-4 border-retro-yellow text-retro-yellow bg-retro-yellow/5 font-sans shadow-[inset_0_0_20px_rgba(250,204,21,0.05)]">
            <strong className="font-bold tracking-wider">SYSTEM HINT:</strong> Naming convention is based on the geography or headcount / nature of the work done in the location.
          </div>
        )}

        <div className="space-y-6">
          <p className="text-lg text-white/90 font-sans leading-relaxed">Match each country to its region/sub-category.</p>
          <div className="grid grid-cols-1 gap-4">
            {COUNTRIES.map(country => (
              <div key={country} className="flex flex-col sm:flex-row sm:items-center justify-between bg-black/40 p-4 border-4 border-white/20 gap-3 hover:border-retro-cyan transition-colors">
                <span className="font-semibold text-lg font-sans tracking-wide">{country}</span>
                <select 
                  className="bg-black/80 border-4 border-white/50 text-white p-3 outline-none focus:border-retro-cyan focus:shadow-[4px_4px_0px_rgba(0,255,255,0.4)] w-full sm:w-auto font-sans transition-all appearance-none"
                  value={clue1Answers[country] || ''}
                  onChange={(e) => setClue1Answers(prev => ({...prev, [country]: e.target.value}))}
                >
                  <option value="" disabled>Select Region...</option>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            ))}
          </div>
          {clue1Error && <p className="text-retro-pink animate-pulse font-mono font-bold text-sm bg-retro-pink/10 p-3 border-4 border-retro-pink/30">ERROR: Incorrect mapping in Clue 1.</p>}
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
            onClick={() => useHint('st1-c2')}
            disabled={hintsUsed['st1-c2']}
          >
            {hintsUsed['st1-c2'] ? 'Hint Active' : 'Request Hint (+1 min)'}
          </Button>
        </div>

        {hintsUsed['st1-c2'] && (
          <div className="p-4 border-l-4 border-retro-yellow text-retro-yellow bg-retro-yellow/5 font-sans shadow-[inset_0_0_20px_rgba(250,204,21,0.05)]">
            <strong className="font-bold tracking-wider">SYSTEM HINT:</strong> Start from the region with the latest timezone — what's the earliest they can meet? Now check if that works for everyone else.
          </div>
        )}

        <div className="space-y-6">
          <div className="text-lg leading-relaxed text-white/90 font-sans">
            Find the <strong>earliest available 1-hour window</strong> where everyone is within business hours (8AM–6PM local).<br/>
            Select the correct hour for each location:
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TZ_COUNTRIES.map(tz => (
              <div key={tz.id} className="flex flex-col gap-2 bg-black/40 p-4 border-4 border-white/20 hover:border-retro-cyan transition-colors">
                <span className="font-mono text-retro-cyan/80 text-sm tracking-widest">{tz.label}</span>
                <select 
                  className="bg-black/80 border-4 border-white/50 text-white p-3 outline-none focus:border-retro-cyan focus:shadow-[4px_4px_0px_rgba(0,255,255,0.4)] w-full font-sans transition-all appearance-none"
                  value={clue2Answers[tz.id] || ''}
                  onChange={(e) => setClue2Answers(prev => ({...prev, [tz.id]: e.target.value}))}
                >
                  <option value="" disabled>Select hours...</option>
                  {HOURS_OPTIONS.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            ))}
          </div>

          {clue2Error && <p className="text-retro-pink animate-pulse font-mono font-bold text-sm bg-retro-pink/10 p-3 border-4 border-retro-pink/30">ERROR: Time windows do not align correctly.</p>}
        </div>
      </div>

      <div className="pt-8 pb-16">
        <Button onClick={checkAnswers}>[ CHECK ANSWERS ]</Button>
      </div>
    </div>
  )
}
