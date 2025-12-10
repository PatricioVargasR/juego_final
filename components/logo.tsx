import { Diamond } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-purple-600 p-2 rounded-lg">
        <Diamond className="w-6 h-6 text-white" />
      </div>
      <span className="text-xl font-bold text-purple-600">100 halcones dijeron</span>
    </div>
  )
}
