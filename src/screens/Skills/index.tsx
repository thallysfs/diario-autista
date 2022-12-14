import { useEffect, useState } from 'react'
import  firestore  from '@react-native-firebase/firestore';
import { Box, Text, VStack, ScrollView, Select, CheckIcon } from 'native-base'

import { TestCard } from '../../components/TestCard'

interface SkillProps {
  id: string;
  type: 'QS' | 'QL' | 'QG' | 'QM' | 'AJ' | 'OPF';
  ageMonth: string;
  description: string;
}


export function Skills(){
  const [selectedAge, setSelectedAge] = useState("");
  const [skillQuestion, setSkillQuestion] = useState<SkillProps[]>([])


  function handleLisGet() {
    if(selectedAge != "") {
      firestore()
      .collection('skills')
      .where('ageMonth', '==', selectedAge)
      .onSnapshot( async (snapshot) => {
        const data = await snapshot.docs.map(doc => {
          //const {id, type, ageMonth, description} = doc.data()
          return doc.data()
          // return {
          //   id,
          //   type,
          //   ageMonth,
          //   description
          // }
        })

        setSkillQuestion(data)

        //console.log(skillQuestion)
      })

    }
  }

    const skillsQS = skillQuestion.filter((skillQs) => {
      return skillQs.type === 'QS'
    })
    console.log(skillsQS)

  useEffect(() => {
    handleLisGet()
    //console.log("age",selectedAge)
    //console.log(skillQuestion)


  }, [selectedAge])

  return(
    <Box>
        <Box background="secondary.200">  
          <Text 
            textAlign="center"
            fontFamily="heading"
            fontWeight={500}
            fontSize={30}
          >
            Habilidades      
          </Text>
        </Box>

        <VStack m={5}>
          <Text
            fontSize="sm" 
            color="black"
            fontFamily="Poppins_400Regular"
            textAlign="center"
          >
            O teste abaixo é baseado nos marcos do 
            desenvolvimento. São as coisas que a maioria
            das crianças consegue fazer em uma
            determinada idade. 
          </Text>

          {/* <Text mt={3} fontFamily="heading">
            Escolha a idade:
          </Text> */}
          
          <Select
            selectedValue={selectedAge}
            accessibilityLabel='Escolha uma idade'
            placeholder='Escolha uma idade'
            _selectedItem={{
              bg: 'primary.50',
              endIcon: <CheckIcon size="5" />
            }}
            mt={1}
            onValueChange={itemValue => setSelectedAge(itemValue)}
          >
            <Select.Item label='2 Meses' value='2' />
            <Select.Item label='4 Meses' value='4' />
            <Select.Item label='6 Meses' value='6' />
            <Select.Item label='9 Meses' value='9' />
            <Select.Item label='1 ano' value='12' />
            <Select.Item label='18 Meses (1 anos e meio)' value='18' />
            <Select.Item label='2 anos' value='24' />
            <Select.Item label='3 anos' value='36' />
            <Select.Item label='4 anos' value='48' />
            <Select.Item label='5 anos' value='60' />
          </Select>

          <TestCard title='Social/Emocional' 
            data={skillsQS}
          />
        </VStack>
    </Box>
  )
}

