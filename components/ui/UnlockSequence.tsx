import { useEffect, useState, useRef } from 'react'

export function UnlockSequence({ onComplete, isFinal = false }: { onComplete: () => void, isFinal?: boolean }) {
  const [phase, setPhase] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const lines = [
      "0x0001: SYSTEM_BYPASS_INIT",
      "0x002F: OVERRIDING_SECURITY_PROTOCOLS",
      "0x01A4: FETCHING_DECRYPTION_KEYS",
      "0x03B2: APPLYING_BRUTE_FORCE_ALG",
      "0x08F1: HASH_COLLISION_DETECTED",
      "0x09A2: RE_ROUTING_MAINFRAME_ACCESS",
      "0x0B33: ACCESSING_SECURE_PAYLOAD",
      "0x0C99: OVERRIDE_SUCCESSFUL"
    ]

    let logIndex = 0
    const logInterval = setInterval(() => {
      if (logIndex < lines.length) {
        setLogs(prev => [...prev, lines[logIndex]])
        logIndex++
      } else {
        clearInterval(logInterval)
      }
    }, isFinal ? 300 : 150)

    const t1 = setTimeout(() => setPhase(1), isFinal ? 2000 : 1000)
    const t2 = setTimeout(() => setPhase(2), isFinal ? 5000 : 2500)
    const t3 = setTimeout(() => {
      setPhase(3)
      onCompleteRef.current()
    }, isFinal ? 5500 : 3000)

    return () => {
      clearInterval(logInterval)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [isFinal])

  if (phase === 3) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-mono overflow-hidden">
      {/* Glitch effects and CRT scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-halftone mix-blend-overlay opacity-30 z-10" />
      
      <div className="relative z-20 w-full max-w-2xl px-8 flex flex-col items-center gap-8">
        {phase >= 0 && phase < 2 && (
          <div className="text-retro-cyan text-2xl md:text-4xl uppercase tracking-widest font-heading text-center animate-glitch">
            {phase === 0 ? 'INITIALIZING PROTOCOL...' : 'DECRYPTING NODE...'}
          </div>
        )}
        
        {phase === 1 && (
          <div className="w-full h-8 border-4 border-retro-cyan p-1 bg-black shadow-[0_0_20px_rgba(0,255,255,0.3)]">
            <div className="h-full bg-retro-cyan animate-progress-fill origin-left" style={{ animationDuration: isFinal ? '3s' : '1.5s' }} />
          </div>
        )}
        
        {phase >= 0 && phase < 2 && (
          <div className="text-retro-pink/80 text-xs md:text-sm font-mono mt-8 h-40 overflow-hidden flex flex-col items-start w-full opacity-70 space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-100">
                {log}
              </div>
            ))}
          </div>
        )}

        {phase === 2 && (
          <div className="fixed inset-0 bg-white animate-flash z-[100]" />
        )}
      </div>
    </div>
  )
}
