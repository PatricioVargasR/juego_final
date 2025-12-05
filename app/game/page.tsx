"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useGameEngine } from "@/hooks/use-game-engine"
import { QuestionCard } from "@/components/question-card"
import { ScoreBoard } from "@/components/score-board"
import { Logo } from "@/components/logo"
import { Home } from "lucide-react"
import Link from "next/link"

export default function GamePage() {
  const router = useRouter()
  const { currentQuestion, questionNumber, totalQuestions, score, isLoading, error, selectAnswer, gameFinished } =
    useGameEngine()

  useEffect(() => {
    if (!isLoading && !currentQuestion && !error) {
      // No questions loaded, redirect to config
      router.push("/config")
    }
  }, [currentQuestion, isLoading, error, router])

  useEffect(() => {
    if (gameFinished) {
      router.push("/result")
    }
  }, [gameFinished, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-6">
        <div className="text-white text-xl mb-4">{error}</div>
        <Link href="/config">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold">Configurar Juego</button>
        </Link>
      </div>
    )
  }

  if (!currentQuestion) {
    // Game finished, redirect to results
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-xl">Calculando resultados...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col p-6">
      <div className="w-full max-w-2xl mx-auto space-y-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <ScoreBoard score={score} />
            <Link href="/">
              <button className="p-2 hover:scale-110 transition-transform">
                <Home className="w-6 h-6 text-white" />
              </button>
            </Link>
          </div>
        </div>

        <QuestionCard
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
          onAnswerSelect={selectAnswer}
        />
      </div>
    </div>
  )
}