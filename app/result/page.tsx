import { useEffect, useState } from "react"
import { Trophy, Brain, Heart, User, AlertCircle } from "lucide-react"

export default function ResultPage() {
  const [score, setScore] = useState(0)
  const [category, setCategory] = useState("")

  useEffect(() => {
    const finalScore = localStorage.getItem("finalScore")
    const gameState = localStorage.getItem("gameState")
    
    if (finalScore) {
      setScore(Number(finalScore))
    }
    
    if (gameState) {
      const state = JSON.parse(gameState)
      setCategory(state.category || "")
    }
  }, [])

  const getCategoryIcon = () => {
    switch(category) {
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

  const getFunnyMessage = () => {
    type MessageRange = { min: number; max: number; message: string }
    type CategoryMessages = {
      [key: string]: MessageRange[]
    }

    const messages: CategoryMessages = {
      "Salud Mental": [
        { min: 1, max: 10, message: "¡Auch! Necesitas un psicólogo... ¡o varios! 😅" },
        { min: 11, max: 20, message: "Mmm... ¿has considerado meditar? O al menos dormir más 🧘‍♂️" },
        { min: 21, max: 30, message: "Vas por buen camino, ¡pero todavía te falta un poco de zen! 🌟" },
        { min: 31, max: 40, message: "¡Casi perfecto! Ya casi eres un gurú de la salud mental 🎯" },
        { min: 41, max: 50, message: "¡WOW! ¿Tú eres el psicólogo aquí? ¡Impresionante! 🏆" }
      ],
      "Problemas afectivos": [
        { min: 1, max: 10, message: "Uff... mejor quédate soltero un rato 💔😂" },
        { min: 11, max: 20, message: "Necesitas ver más películas románticas... o menos, no sé 🎬" },
        { min: 21, max: 30, message: "Vas mejorando, pero el amor sigue siendo un misterio 💕" },
        { min: 31, max: 40, message: "¡Casi eres un experto en el amor! Cupido estaría orgulloso 💘" },
        { min: 41, max: 50, message: "¡Eres todo un maestro del amor! ¿Das clases? 💝👏" }
      ],
      "Problemas personales": [
        { min: 1, max: 10, message: "¿Estás bien? Parece que necesitas un manual de vida 📖😅" },
        { min: 11, max: 20, message: "Vas perdido, pero al menos lo intentas ¡eso cuenta! 🗺️" },
        { min: 21, max: 30, message: "No está mal, pero tampoco para presumir 🤷‍♂️" },
        { min: 31, max: 40, message: "¡Muy bien! Ya casi tienes tu vida resuelta 🌈" },
        { min: 41, max: 50, message: "¡Eres un crack resolviendo problemas! ¿Me ayudas con los míos? 🌟" }
      ],
      "Adicciones": [
        { min: 1, max: 10, message: "Ehh... ¿seguro que sabes de qué va esto? 😬" },
        { min: 11, max: 20, message: "Necesitas informarte más, ¡pero vas avanzando! 📚" },
        { min: 21, max: 30, message: "No está mal, pero hay espacio para mejorar 💪" },
        { min: 31, max: 40, message: "¡Muy bien! Tienes buena conciencia sobre el tema 👍" },
        { min: 41, max: 50, message: "¡Excelente! Deberías dar pláticas sobre este tema 🎤⭐" }
      ]
    }

    const categoryMessages = messages[category] || messages["Salud Mental"]
    const message = categoryMessages.find(m => score >= m.min && score <= m.max)
    return message?.message || "¡Buen intento! 🎮"
  }

  const handlePlayAgain = () => {
    localStorage.removeItem("gameState")
    localStorage.removeItem("finalScore")
    window.location.href = "/game"
  }

  const handleGoHome = () => {
    localStorage.removeItem("gameState")
    localStorage.removeItem("finalScore")
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg mb-2">
            {category}
          </h1>
          <p className="text-white/80 text-lg">Tu resultado es:</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex flex-col items-center gap-6">
            {getCategoryIcon()}
            <div className="text-8xl font-black text-white drop-shadow-lg">{score}</div>
            <div className="text-xl md:text-2xl font-bold text-white text-center px-4 py-3 bg-black/20 rounded-2xl backdrop-blur-sm">
              {getFunnyMessage()}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePlayAgain}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            Volver a jugar
          </button>

          <button
            onClick={handleGoHome}
            className="flex-1 bg-white text-gray-800 font-bold text-lg py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            Inicio
          </button>
        </div>
      </div>
    </div>
  )
}