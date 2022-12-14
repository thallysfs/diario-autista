import { useState } from 'react';
import {Text, Checkbox, VStack} from 'native-base'

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

  //console.log(groupValues)
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
