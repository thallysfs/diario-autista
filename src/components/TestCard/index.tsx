import { useEffect, useState } from 'react';
import {Text, Checkbox, VStack} from 'native-base'

//chamar meu hook de Questions
import { useQuestions } from '../../hooks/useQuestions'

export interface QuestionProps {
  id: string;
  type?: 'QS' | 'QL' | 'QG' | 'QM' | 'AJ' | 'OPF';
  ageMonth?: string;
  description: string;
}

interface TestCardProps {
  title: string;
  data: QuestionProps[]
}

export function TestCard({title, data} : TestCardProps){
  const [groupValues, setGroupValues] = useState([]);
  const {setIdQs, setIdQl, setIdQg, setIdQm } = useQuestions()
  

  function saveQuestionType() {
    if(title === 'Social/Emocional') {
      setIdQs(groupValues)
    }

    if(title === 'Linguagem/ Comunicação') {
      setIdQl(groupValues)
    }

    if(title === 'Cognitivo (Aprendizado, resolução de problema)') {
      setIdQg(groupValues)
    }

    if(title === 'Movimento/ Desenv. Físico') {
      setIdQm(groupValues)
    }
  }


  useEffect(()=>{
    saveQuestionType()
  }, [groupValues])


  return (
    <VStack mt={5} mr={7} > 
      <Text
        fontSize="sm" 
        color="black"
        fontFamily="Poppins_600SemiBold"
      >
        {title} 
      </Text>

      <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="Escolha">
        {data.map((dat,index) =>
            <Checkbox key={dat.id} value={dat.id} my={2}>{dat.description}</Checkbox>   
        )}
      </Checkbox.Group>

    </VStack>
  )
}
