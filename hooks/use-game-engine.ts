"use client"

import { useState, useEffect } from "react"
import { loadQuestions, shuffleArray } from "@/lib/game-service"

interface Answer {
  text: string
  points: number
}

interface Question {
  question: string
  answers: Answer[]
}

interface GameSettings {
  category: string
  numQuestions: number
  soundEnabled: boolean
}

export function useGameEngine() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [gameFinished, setGameFinished] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setGameFinished(false)

      // Load settings
      const savedSettings = localStorage.getItem("gameSettings")
      const settings: GameSettings = savedSettings
        ? JSON.parse(savedSettings)
        : { category: "Salud Mental", numQuestions: 10, soundEnabled: true }

      console.log("🎮 Inicializando juego:", settings.category)

      // Check if there's a saved game state for THIS CATEGORY
      const savedState = localStorage.getItem("gameState")
      if (savedState) {
        const state = JSON.parse(savedState)
        const savedCategory = state.category || ""
        
        if (savedCategory === settings.category) {
          console.log("📦 Restaurando progreso guardado")
          setQuestions(state.questions)
          setCurrentIndex(state.currentIndex)
          setScore(state.score)
          setIsLoading(false)
          return
        } else {
          console.log("🔄 Nueva categoría, limpiando estado anterior")
          localStorage.removeItem("gameState")
        }
      }

      // Load questions from JSON
      const allQuestions = await loadQuestions()
      const categoryQuestions = allQuestions[settings.category] || []

      console.log(`📚 Preguntas disponibles para ${settings.category}:`, categoryQuestions.length)

      if (categoryQuestions.length === 0) {
        setError("No hay preguntas disponibles para esta categoría")
        setIsLoading(false)
        return
      }

      // Randomly select and shuffle questions
      const shuffled = shuffleArray([...categoryQuestions])
      const selected = shuffled.slice(0, Math.min(settings.numQuestions, shuffled.length))

      // Shuffle answers for each question
      const questionsWithShuffledAnswers = selected.map((q) => ({
        ...q,
        answers: shuffleArray([...q.answers]),
      }))

      console.log(`✅ ${questionsWithShuffledAnswers.length} preguntas cargadas y mezcladas`)

      setQuestions(questionsWithShuffledAnswers)
      setCurrentIndex(0)
      setScore(0)
      setIsLoading(false)
    } catch (err) {
      console.error("❌ Error cargando preguntas:", err)
      setError("Error al cargar las preguntas")
      setIsLoading(false)
    }
  }

  const selectAnswer = (points: number) => {
    const newScore = score + points
    setScore(newScore)

    if (currentIndex + 1 < questions.length) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)

      // Save game state WITH CATEGORY
      const savedSettings = localStorage.getItem("gameSettings")
      const settings = savedSettings ? JSON.parse(savedSettings) : {}
      
      localStorage.setItem(
        "gameState",
        JSON.stringify({
          questions,
          currentIndex: newIndex,
          score: newScore,
          category: settings.category,
        }),
      )
    } else {
      // Game finished
      console.log("🏁 Juego terminado. Puntuación final:", newScore)
      localStorage.setItem("finalScore", String(newScore))
      localStorage.removeItem("gameState")
      setGameFinished(true)
    }
  }

  return {
    currentQuestion: questions[currentIndex] || null,
    questionNumber: currentIndex + 1,
    totalQuestions: questions.length,
    score,
    isLoading,
    error,
    selectAnswer,
    gameFinished,
  }
}