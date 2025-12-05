"use client"

import { useEffect, useState } from "react"
import { Trophy, Brain, Heart, User, AlertCircle } from "lucide-react"

const CATEGORY_ORDER = [
  "Salud Mental",
  "Problemas afectivos",
  "Problemas personales",
  "Adicciones",
]

export default function ResultPage() {
  const [score, setScore] = useState(0)
  const [category, setCategory] = useState("")

  useEffect(() => {
    const finalScore = localStorage.getItem("finalScore")
    const savedSettings = localStorage.getItem("gameSettings")

    if (finalScore) setScore(Number(finalScore))

    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setCategory(settings.category || "Salud Mental")
    }
  }, [])

  /* ---------------------------------------------------- */
  /* ICONOS */
  /* ---------------------------------------------------- */
  const getCategoryIcon = () => {
    switch (category) {
      case "Salud Mental":
        return <Brain className="w-20 h-20 text-yellow-300" />
      case "Problemas afectivos":
        return <Heart className="w-20 h-20 text-yellow-300" />
      case "Problemas personales":
        return <User className="w-20 h-20 text-yellow-300" />
      case "Adicciones":
        return <AlertCircle className="w-20 h-20 text-yellow-300" />
      default:
        return <Trophy className="w-20 h-20 text-yellow-300" />
    }
  }

  /* ---------------------------------------------------- */
  /* MENSAJES */
  /* ---------------------------------------------------- */
  const getFunnyMessage = () => {
    type MessageRange = { min: number; max: number; message: string }
    type CategoryMessages = Record<string, MessageRange[]>

    const messages: CategoryMessages = {
      "Salud Mental": [
        { min: 1, max: 10, message: "¡Auch! Necesitas un psicólogo... ¡o varios! 😅" },
        { min: 11, max: 20, message: "Mmm... ¿has considerado meditar? O al menos dormir más 🧘‍♂️" },
        { min: 21, max: 30, message: "Vas por buen camino 🌟" },
        { min: 31, max: 40, message: "¡Casi perfecto! 🎯" },
        { min: 41, max: 50, message: "¡Impresionante! 🏆" },
      ],
      "Problemas afectivos": [
        { min: 1, max: 10, message: "Uff... mejor quédate soltero 💔😂" },
        { min: 11, max: 20, message: "Ve más pelis románticas 🎬" },
        { min: 21, max: 30, message: "Mejorando 💕" },
        { min: 31, max: 40, message: "Cupido proud 💘" },
        { min: 41, max: 50, message: "Maestro del amor 💝" },
      ],
      "Problemas personales": [
        { min: 1, max: 10, message: "Manual de vida needed 📖😅" },
        { min: 11, max: 20, message: "Perdido pero intentando 🗺️" },
        { min: 21, max: 30, message: "Vas bien 🤷‍♂️" },
        { min: 31, max: 40, message: "Casi todo resuelto 🌈" },
        { min: 41, max: 50, message: "Crack total 🌟" },
      ],
      "Adicciones": [
        { min: 1, max: 10, message: "¿Seguro entiendes? 😬" },
        { min: 11, max: 20, message: "Aprendiendo 📚" },
        { min: 21, max: 30, message: "Bien 💪" },
        { min: 31, max: 40, message: "Conciencia top 👍" },
        { min: 41, max: 50, message: "Ponente oficial 🎤⭐" },
      ],
    }

    const categoryMessages = messages[category] || messages["Salud Mental"]
    const msg = categoryMessages.find(
      (m) => score >= m.min && score <= m.max
    )

    return msg?.message || "¡Buen intento! 🎮"
  }

  /* ---------------------------------------------------- */
  /* BOTÓN - FLUJO AUTOMÁTICO DE CATEGORÍAS */
  /* ---------------------------------------------------- */
  const handlePlayAgain = () => {
    const index = CATEGORY_ORDER.indexOf(category)
    const nextIndex =
      index === -1 || index + 1 >= CATEGORY_ORDER.length ? 0 : index + 1

    const nextCategory = CATEGORY_ORDER[nextIndex]

    // Actualizar configuración con la nueva categoría
    localStorage.setItem(
      "gameSettings",
      JSON.stringify({ category: nextCategory })
    )

    // Limpiar el score final
    localStorage.removeItem("finalScore")

    // IMPORTANTE: Redirigir primero a /config para que se resetee el estado
    // /config debe cargar las nuevas preguntas y luego redirigir a /game
    window.location.href = "/config"
  }

  const handleGoHome = () => {
    localStorage.removeItem("gameSettings")
    localStorage.removeItem("finalScore")
    window.location.href = "/"
  }

  /* ---------------------------------------------------- */
  /* UI */
  /* ---------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg mb-2">
            {category}
          </h1>
          <p className="text-white/80 text-lg">
            Tu resultado es:
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex flex-col items-center gap-6">
            {getCategoryIcon()}
            <div className="text-8xl font-black text-white">
              {score}
            </div>
            <div className="text-xl md:text-2xl font-bold text-white text-center px-4 py-3 bg-black/20 rounded-2xl">
              {getFunnyMessage()}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePlayAgain}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg py-4 rounded-2xl hover:scale-105 transition-transform"
          >
            Siguiente categoría 🔁
          </button>

          <button
            onClick={handleGoHome}
            className="flex-1 bg-white text-gray-800 font-bold text-lg py-4 rounded-2xl hover:scale-105 transition-transform"
          >
            Inicio
          </button>
        </div>

      </div>
    </div>
  )
}