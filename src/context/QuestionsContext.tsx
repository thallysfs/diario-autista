import { createContext, ReactNode, useState } from 'react'

//tipo do meu estado que salva as questões marcadas
interface QuestionType {
  questionsIds: number[]
}

//tipo do contexto - o que vou compartilhar com outros componentes
interface QuestionContextProps {
  ids: QuestionType | undefined;
  updateId: (idsSelected:QuestionType) => void;
}

interface QuestionProviderProps {
  children: ReactNode;
}

//criando o contexto para armazenar os dados do login
export const QuestionsContext = createContext({} as QuestionContextProps)

export function QuestionContextProvider({ children }: QuestionProviderProps) {
  
  //regras de negócio
  const [ids, setIds] = useState<QuestionType>()

  function updateId(idsSelected: QuestionType) {
    setIds(idsSelected)
  }


  return (
    <QuestionsContext.Provider value={{ids, updateId }}>
      {children}
    </QuestionsContext.Provider>
  )
}
