import { Trophy } from "lucide-react"

interface ScoreBoardProps {
  score: number
}

export function ScoreBoard({ score }: ScoreBoardProps) {
  return (
    <div className="bg-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold">
      <Trophy className="w-5 h-5" />
      <span>{score}</span>
    </div>
  )
}
