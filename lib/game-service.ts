interface Answer {
  text: string
  points: number
}

interface Question {
  question: string
  answers: Answer[]
}

interface QuestionsData {
  [category: string]: Question[]
}

export async function loadQuestions(): Promise<QuestionsData> {
  const response = await fetch("/questions.json")
  if (!response.ok) {
    throw new Error("Failed to load questions")
  }
  return response.json()
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}
