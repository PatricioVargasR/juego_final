"use client"

import { useEffect, useState } from "react"
import { Trophy, Brain, Heart, User, AlertCircle } from "lucide-react"

const ALL_CATEGORIES = [
  "Salud Mental",
  "Problemas afectivos",
  "Problemas personales",
  "Adicciones",
]

export default function ResultPage() {
  const [score, setScore] = useState(0)
  const [category, setCategory] = useState("")
  const [nextCategory, setNextCategory] = useState("")
  const [allFinished, setAllFinished] = useState(false)

  useEffect(() => {
    const finalScore = localStorage.getItem("finalScore")
    const savedSettings = localStorage.getItem("gameSettings")

    if (finalScore) setScore(Number(finalScore))

    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setCategory(settings.category || "Salud Mental")
    }

    // Obtener categorías completadas
    const completedStr = localStorage.getItem("completedCategories")
    const completedCategories = completedStr ? JSON.parse(completedStr) : []
    
    // Agregar la categoría actual a completadas
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      const currentCategory = settings.category
      
      if (!completedCategories.includes(currentCategory)) {
        completedCategories.push(currentCategory)
        localStorage.setItem("completedCategories", JSON.stringify(completedCategories))
      }
    }

    console.log("✅ Categorías completadas:", completedCategories)

    // Verificar si ya se completaron todas
    if (completedCategories.length >= ALL_CATEGORIES.length) {
      console.log("🎉 ¡Todas las categorías completadas!")
      setAllFinished(true)
    } else {
      // Obtener categorías restantes
      const remaining = ALL_CATEGORIES.filter(cat => !completedCategories.includes(cat))
      console.log("📋 Categorías restantes:", remaining)
      
      // Elegir una aleatoria de las restantes
      const randomNext = remaining[Math.floor(Math.random() * remaining.length)]
      setNextCategory(randomNext)
      console.log("🎲 Siguiente categoría:", randomNext)
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
  /* BOTÓN - FLUJO CON CATEGORÍAS ALEATORIAS */
  /* ---------------------------------------------------- */
  const handlePlayAgain = () => {
    if (allFinished) {
      // Si terminaron todas, reiniciar y volver al inicio
      handleFinishAll()
      return
    }

    // Limpiar estados anteriores
    localStorage.removeItem("gameState")
    localStorage.removeItem("finalScore")

    // Actualizar configuración con la nueva categoría ALEATORIA
    const currentSettings = JSON.parse(localStorage.getItem("gameSettings") || "{}")
    localStorage.setItem(
      "gameSettings",
      JSON.stringify({ 
        ...currentSettings,
        category: nextCategory 
      })
    )

    console.log("🎮 Iniciando categoría:", nextCategory)

    // Redirigir directamente a /game
    window.location.href = "/game"
  }

  const handleFinishAll = () => {
    // Limpiar TODO
    localStorage.removeItem("gameSettings")
    localStorage.removeItem("finalScore")
    localStorage.removeItem("gameState")
    localStorage.removeItem("completedCategories")
    
    console.log("🏁 Juego completado - Regresando al inicio")
    window.location.href = "/"
  }

  const handleGoHome = () => {
    localStorage.removeItem("gameSettings")
    localStorage.removeItem("finalScore")
    localStorage.removeItem("completedCategories")
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

        {allFinished ? (
          // Botón cuando terminaron todas las categorías
          <div className="space-y-4">
            <div className="bg-yellow-400/90 backdrop-blur-sm rounded-2xl p-6 text-center">
              <p className="text-2xl font-black text-gray-900 mb-2">
                🎉 ¡FELICIDADES! 🎉
              </p>
              <p className="text-lg font-semibold text-gray-800">
                ¡Completaste todas las categorías!
              </p>
            </div>
            
            <button
              onClick={handleFinishAll}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-xl py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
            >
              Volver al Inicio 🏠
            </button>
          </div>
        ) : (
          // Botones normales
          <div className="flex gap-4">
            <button
              onClick={handlePlayAgain}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg py-4 rounded-2xl hover:scale-105 transition-transform"
            >
              <div className="flex flex-col items-center">
                <span>Siguiente categoría 🔁</span>
                {nextCategory && (
                  <span className="text-sm font-normal opacity-90 mt-1">
                    {nextCategory}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={handleGoHome}
              className="flex-1 bg-white text-gray-800 font-bold text-lg py-4 rounded-2xl hover:scale-105 transition-transform"
            >
              Inicio
            </button>
          </div>
        )}

      </div>
    </div>
  )
}