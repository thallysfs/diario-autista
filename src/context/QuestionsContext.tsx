import { createContext, ReactNode, useState } from 'react'

//tipo do contexto - o que vou compartilhar com outros componentes
interface QuestionContextProps {
  idQs: number[] | undefined;
  setIdQs: (idsSelected:number[]) => void;
  idQl: number[] | undefined;
  setIdQl: (idsSelected:number[]) => void;
  idQg: number[] | undefined;
  setIdQg: (idsSelected:number[]) => void;
  idQm: number[] | undefined;
  setIdQm: (idsSelected:number[]) => void;
}

interface QuestionProviderProps {
  children: ReactNode;
}

//criando o contexto para armazenar os dados do login
export const QuestionsContext = createContext({} as QuestionContextProps)

export function QuestionContextProvider({ children }: QuestionProviderProps) {
  
  const [idQs, setIdQs] = useState<number[]>()
  const [idQl, setIdQl] = useState<number[]>()
  const [idQg, setIdQg] = useState<number[]>()
  const [idQm, setIdQm] = useState<number[]>()


  return (
    <QuestionsContext.Provider value={{ idQs, idQl, idQg, idQm, setIdQs, setIdQl, setIdQg, setIdQm }}>
      {children}
    </QuestionsContext.Provider>
  )
}
