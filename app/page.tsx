// // 'use client'
// // import { supabase } from '../lib/supabase'

// // export default function Home() {

// //   const login = async () => {
// //     await supabase.auth.signInWithOAuth({
// //       provider: 'google',
// //       options: {
// //         redirectTo: 'http://localhost:3000/dashboard'
// //       }
// //     })
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 overflow-hidden relative">

// //       {/* Glow Background */}
// //       <div className="absolute w-96 h-96 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse top-10 left-10"></div>
// //       <div className="absolute w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse bottom-10 right-10"></div>

// //       {/* Book Card */}
// //       <div className="book-open bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 w-[420px] text-white text-center">

// //         <h1 className="text-4xl font-extrabold mb-4 animate-bounce">
// //           📖 Smart Bookmark
// //         </h1>

// //         <p className="mb-6 text-white/80">
// //           Open your digital book of links and memories.
// //         </p>

// //         <button
// //           onClick={login}
// //           className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow-lg transition hover:scale-110 hover:bg-indigo-100"
// //         >
// //           Continue with Google
// //         </button>

// //         <p className="mt-6 text-xs text-white/60">
// //           Secure • Private • Realtime Sync
// //         </p>

// //       </div>
// //     </div>
// //   )
// // }
// 'use client'
// import { useEffect } from 'react'
// import { supabase } from '../lib/supabase'
// import { useRouter } from 'next/navigation'

// export default function Home() {
//   const router = useRouter()

//   useEffect(() => {
//     const checkUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser()
//       if (user) {
//         router.push('/dashboard')
//       }
//     }

//     checkUser()
//   }, [])

//   const login = async () => {
//     await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         redirectTo: window.location.origin
//       }
//     })
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white">
//       <button
//         onClick={login}
//         className="bg-white text-indigo-700 px-6 py-3 rounded-xl shadow hover:scale-110 transition"
//       >
//         Continue with Google
//       </button>
//     </div>
//   )
// }
'use client'
import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) router.push('/dashboard')
    }
    checkUser()
  }, [])

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 overflow-hidden relative text-white">

      {/* Glow Orbs */}
      <div className="absolute w-96 h-96 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse bottom-10 right-10"></div>

      {/* Book Card */}
      <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-12 w-[420px] text-center animate-fadeIn">

        <h1 className="text-4xl font-extrabold mb-4 animate-bounce">
          📖 Smart Bookmark
        </h1>

        <p className="text-white/80 mb-8">
          Your digital book of favorite links and memories.
        </p>

        <button
          onClick={login}
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow-lg transition hover:scale-110 hover:bg-indigo-100"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-xs text-white/60">
          Secure • Private • Realtime Sync
        </p>
      </div>
    </div>
  )
}
