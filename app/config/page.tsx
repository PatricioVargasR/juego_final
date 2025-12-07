"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Home } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"

const CATEGORIES = ["Salud Mental", "Problemas afectivos", "Problemas personales", "Adicciones"]

export default function ConfigPage() {
  const router = useRouter()
  const [numQuestions, setNumQuestions] = useState(10)
  const [selectedCategory, setSelectedCategory] = useState("Salud Mental")
  const [soundEnabled, setSoundEnabled] = useState(true)

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem("gameSettings")
    if (saved) {
      const settings = JSON.parse(saved)
      setNumQuestions(settings.numQuestions || 10)
      setSelectedCategory(settings.category || "Salud Mental")
      setSoundEnabled(settings.soundEnabled ?? true)
    }
    
    // IMPORTANTE: Siempre limpiar el estado del juego cuando entras a config
    console.log("🧹 Limpiando estado del juego en config")
    localStorage.removeItem("gameState")
    localStorage.removeItem("finalScore")
  }, [])

  const handleSave = () => {
    const settings = {
      numQuestions,
      category: selectedCategory,
      soundEnabled,
    }
    console.log("💾 Guardando configuración:", settings)
    localStorage.setItem("gameSettings", JSON.stringify(settings))
    
    // Limpiar antes de iniciar
    localStorage.removeItem("gameState")
    localStorage.removeItem("finalScore")
    
    router.push("/game")
  }

  return (
    <div className="min-h-screen gradient-purple-pink flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-between items-center">
          <Logo />
          <Link href="/">
            <button className="p-2 hover:scale-110 transition-transform">
              <Home className="w-6 h-6 text-white" />
            </button>
          </Link>
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-center text-gradient-yellow">Configurar Partida</h1>

        {/* Config Card */}
        <div className="bg-purple-200/50 backdrop-blur-sm rounded-3xl p-8 space-y-8">
          {/* Number of Questions */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-900">Número de Preguntas</h2>
            <div className="flex justify-center">
              <div className="bg-yellow-400 rounded-full w-20 h-20 flex items-center justify-center">
                <span className="text-3xl font-black text-gray-900">{numQuestions}</span>
              </div>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-900">Temas</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-yellow-400 text-gray-900 scale-105"
                      : "bg-white text-gray-700 hover:scale-105"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="bg-purple-300/30 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">Efectos de Sonido</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-14 h-8 rounded-full transition-colors ${soundEnabled ? "bg-purple-600" : "bg-gray-400"}`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform ${
                  soundEnabled ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full gradient-orange-red text-white font-bold text-xl py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}