"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { formatTime } from '@/components/ui/Timer'

type Entry = {
  id: string
  team_name: string
  final_time_seconds: number
  venue: string
  sid1: string
  sid2: string | null
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsAuthenticated(true)
      loadLeaderboard()
    } else {
      alert('Incorrect password')
    }
  }

  async function loadLeaderboard() {
    setLoading(true)
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('final_time_seconds', { ascending: true })
    
    if (!error && data) {
      setEntries(data)
    }
    setLoading(false)
  }

  const handleReset = async () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO DELETE ALL LEADERBOARD ENTRIES? THIS CANNOT BE UNDONE.")) {
      setLoading(true)
      const { error } = await supabase
        .from('leaderboard')
        .delete()
        .not('id', 'is', null) // Delete all rows
      
      if (error) {
        alert('Failed to reset leaderboard. Check your Supabase RLS policies.')
        console.error(error)
      } else {
        await loadLeaderboard()
      }
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-retro-bg p-4 font-sans relative">
        <div className="fixed inset-0 pointer-events-none bg-halftone z-50 opacity-20 mix-blend-overlay"></div>
        <form onSubmit={handleLogin} className="bg-retro-panel p-8 w-full max-w-sm space-y-6 relative z-10 text-center">
          <h1 className="text-2xl font-heading text-retro-cyan text-shadow-retro-cyan">ADMIN ACCESS</h1>
          <input 
            type="password"
            className="w-full bg-black/80 border-4 border-white/50 text-white p-4 font-mono outline-none focus:border-retro-cyan focus:shadow-[4px_4px_0px_rgba(0,255,255,0.4)] transition-all placeholder:text-white/30 text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="ENTER PASSWORD"
          />
          <Button type="submit" className="w-full">[ LOGIN ]</Button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-retro-bg p-4 md:p-8 font-sans relative text-white">
      <div className="fixed inset-0 pointer-events-none bg-halftone z-50 opacity-20 mix-blend-overlay"></div>
      
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 bg-retro-panel p-6">
          <h1 className="text-3xl font-heading text-retro-cyan text-shadow-retro-cyan">LEADERBOARD ADMIN</h1>
          <Button 
            onClick={handleReset} 
            className="bg-retro-pink border-retro-pink text-white hover:bg-retro-pink/80 hover:shadow-[4px_4px_0px_rgba(255,0,255,0.4)]"
          >
            [ RESET LEADERBOARD ]
          </Button>
        </header>

        <main className="bg-black/60 border-4 border-white/20 p-1 overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-retro-cyan animate-pulse tracking-widest font-mono">LOADING DATA...</div>
          ) : entries.length === 0 ? (
            <div className="p-12 text-center text-gray-400 tracking-widest font-mono">LEADERBOARD IS EMPTY</div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white/10 text-retro-cyan font-heading text-sm tracking-widest">
                  <th className="p-4 border-b-2 border-white/20 w-16 text-center">#</th>
                  <th className="p-4 border-b-2 border-white/20">TEAM NAME</th>
                  <th className="p-4 border-b-2 border-white/20">TIME</th>
                  <th className="p-4 border-b-2 border-white/20">VENUE</th>
                  <th className="p-4 border-b-2 border-white/20">PLAYER 1 SID</th>
                  <th className="p-4 border-b-2 border-white/20">PLAYER 2 SID</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {entries.map((entry, index) => (
                  <tr key={entry.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-center text-gray-400">{index + 1}</td>
                    <td className="p-4 text-white font-bold">{entry.team_name || 'Anonymous'}</td>
                    <td className="p-4 text-retro-cyan">{formatTime(entry.final_time_seconds)}</td>
                    <td className="p-4 text-retro-yellow">{entry.venue}</td>
                    <td className="p-4">{entry.sid1}</td>
                    <td className="p-4 text-gray-400">{entry.sid2 || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  )
}
