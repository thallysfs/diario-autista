import { createContext, ReactNode, useState } from 'react'

//tipo do meu estado que salva as questões marcadas
interface QuestionType {
  questionsIds: number[]
}

//tipo do contexto - o que vou compartilhar com outros componentes
interface QuestionContextProps {
  idQs: QuestionType | undefined;
  setIdQs: (idsSelected:QuestionType) => void;
  idQl: QuestionType | undefined;
  setIdQl: (idsSelected:QuestionType) => void;
  idQg: QuestionType | undefined;
  setIdQg: (idsSelected:QuestionType) => void;
  idQm: QuestionType | undefined;
  setIdQm: (idsSelected:QuestionType) => void;
}

interface QuestionProviderProps {
  children: ReactNode;
}

//criando o contexto para armazenar os dados do login
export const QuestionsContext = createContext({} as QuestionContextProps)

export function QuestionContextProvider({ children }: QuestionProviderProps) {
  
  //regras de negócio
  const [idQs, setIdQs] = useState<QuestionType>()
  const [idQl, setIdQl] = useState<QuestionType>()
  const [idQg, setIdQg] = useState<QuestionType>()
  const [idQm, setIdQm] = useState<QuestionType>()


  return (
    <QuestionsContext.Provider value={{ idQs, idQl, idQg, idQm, setIdQs, setIdQl, setIdQg, setIdQm }}>
      {children}
    </QuestionsContext.Provider>
  )
}
