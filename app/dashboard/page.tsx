'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type Bookmark = {
  id: string
  title: string
  url: string
}

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const fetchBookmarks = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

  useEffect(() => {
    fetchBookmarks()

    const channel = supabase
      .channel('bookmarks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookmarks' },
        fetchBookmarks
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const addBookmark = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('bookmarks').insert([
      { title, url, user_id: user.id }
    ])

    setTitle('')
    setUrl('')
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from('bookmarks').delete().eq('id', id)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">

      {/* Background Image */}
      <img
        src="/235d46101965383.5f2b63723db13.png"
        className="absolute w-full h-full object-cover opacity-40 bg-zoom"
      />

      {/* F1 Cars */}
      <div className="race-car" style={{ top: '15%' }}>🏎</div>
      <div className="race-car" style={{ top: '40%', animationDuration: '9s' }}>🏎</div>
      <div className="race-car" style={{ top: '70%', animationDuration: '13s' }}>🏎</div>

      {/* Main Card */}
      <div className="relative bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 w-[750px] text-white">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold animate-bounce">
            🚀 Smart Bookmarks
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl shadow-lg transition hover:scale-110"
          >
            Logout
          </button>
        </div>

        {/* Input Section */}
        <div className="flex gap-3 mb-6">
          <input
            className="border border-white/30 bg-white/10 p-3 rounded-xl w-1/3 focus:ring-2 focus:ring-pink-300 placeholder-white/70"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border border-white/30 bg-white/10 p-3 rounded-xl w-2/3 focus:ring-2 focus:ring-pink-300 placeholder-white/70"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={addBookmark}
            className="bg-green-400 hover:bg-green-500 px-6 py-3 rounded-xl shadow-lg transition hover:scale-110"
          >
            Add
          </button>
        </div>

        {/* List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {bookmarks.length === 0 && (
            <p className="text-center text-white/70">
              No bookmarks yet 🚀
            </p>
          )}

          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="flex justify-between items-center bg-white/20 border border-white/20 p-4 rounded-2xl shadow hover:scale-[1.02] transition"
            >
              <a href={b.url} target="_blank" rel="noreferrer" className="font-bold hover:underline">
                {b.title}
              </a>

              <button
                onClick={() => deleteBookmark(b.id)}
                className="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
