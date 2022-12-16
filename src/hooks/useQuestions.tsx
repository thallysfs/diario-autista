import { useContext } from 'react'
import { QuestionsContext } from '../context/QuestionsContext'

export function useQuestions() {
  const context = useContext(QuestionsContext)

  return context

}
