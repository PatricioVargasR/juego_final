"use client"

import { useState } from "react"

interface Answer {
  text: string
  points: number
}

interface QuestionCardProps {
  question: string
  answers: Answer[]
  questionNumber: number
  totalQuestions: number
  onAnswerSelect: (points: number) => void
}

export function QuestionCard({ question, answers, questionNumber, totalQuestions, onAnswerSelect }: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showPoints, setShowPoints] = useState(false)

  const handleAnswerClick = (index: number, points: number) => {
    if (selectedIndex !== null) return // Prevent double selection

    setSelectedIndex(index)
    setShowPoints(true)

    // Wait a moment to show points, then proceed
    setTimeout(() => {
      onAnswerSelect(points)
      setSelectedIndex(null)
      setShowPoints(false)
    }, 1500)
  }

  return (
    <div className="flex-1 flex flex-col justify-center space-y-6">
      {/* Question */}
      <div className="bg-purple-200/50 backdrop-blur-sm rounded-3xl p-6">
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900">{question}</h2>
      </div>

      {/* Answers */}
      <div className="space-y-3">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index, answer.points)}
            disabled={selectedIndex !== null}
            className={`w-full bg-purple-300/50 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4 transition-all ${
              selectedIndex === index ? "bg-purple-400 scale-105" : "hover:bg-purple-300/70 hover:scale-102"
            } ${selectedIndex !== null && selectedIndex !== index ? "opacity-50" : ""}`}
          >
            <div className="bg-purple-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
              {index + 1}
            </div>
            <span className="text-lg font-semibold text-gray-900 text-left flex-1">{answer.text}</span>
            {showPoints && selectedIndex === index && (
              <span className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-full">+{answer.points}</span>
            )}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="text-center text-white text-lg font-semibold">
        Pregunta {questionNumber} de {totalQuestions}
      </div>
    </div>
  )
}
