"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Trophy } from "lucide-react"
import { Logo } from "@/components/logo"

export default function ResultPage() {
  const router = useRouter()
  const [score, setScore] = useState(0)

  useEffect(() => {
    const finalScore = localStorage.getItem("finalScore")
    if (finalScore) {
      setScore(Number(finalScore))
    } else {
      router.push("/")
    }
  }, [router])

  const handlePlayAgain = () => {
    localStorage.removeItem("gameState")
    localStorage.removeItem("finalScore")
    router.push("/game")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <Logo />

        <h1 className="text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">Tu resultado es:</h1>

        <div className="flex flex-col items-center gap-6">
          <Trophy className="w-20 h-20 text-yellow-300" />
          <div className="text-7xl font-black text-gray-900">{score}</div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePlayAgain}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            Volver a jugar
          </button>

          <Link href="/" className="flex-1">
            <button className="w-full bg-white text-gray-800 font-bold text-lg py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform">
              Inicio
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}