import React from 'react';
import Link from 'next/link';
import { Sparkles, Play, Settings } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-xl">
      LT
    </div>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-6 relative">
      {/* Header with Logo */}
      <div className="absolute top-6 left-6 z-10">
        <Logo />
      </div>

      <div className="w-full max-w-md space-y-8">
        {/* Title - Centrado y con mejor visualización */}
        
 <h1 className="text-5xl md:text-6xl font-black text-center text-white drop-shadow-2xl px-4 py-2" style={{
          textShadow: '0 0 20px rgba(253, 224, 71, 0.8), 0 0 40px rgba(253, 224, 71, 0.5)'
        }}>
          LOS TRAUMADITOS
        </h1>

        {/* Decorative Sparkles */}
        <div className="flex justify-center gap-4">
          <Sparkles className="w-6 h-6 text-yellow-300" />
          <Sparkles className="w-6 h-6 text-blue-300" />
          <Sparkles className="w-6 h-6 text-pink-300" />
        </div>

        {/* Buttons - Corregido el espaciado */}
        <div className="space-y-4">
          <Link href="/game">
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
              <Play className="w-6 h-6" fill="white" />
              JUGAR
            </button>
          </Link>
          
          <div className='py-2'></div>

          <Link href="/config">
            <button className="w-full bg-white text-gray-800 font-bold text-lg py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
              <Settings className="w-5 h-5" />
              Configurar Partida
            </button>
          </Link>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 pt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i === 0 ? "bg-yellow-400" : "bg-yellow-200"}`} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-white font-medium">
        © 2025 LOS TRAUMADITOS. All rights reserved.
      </footer>
    </div>
  );
}