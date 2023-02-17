import { useEffect, useState } from 'react'
import  firestore  from '@react-native-firebase/firestore';
import { Box, Text, VStack, ScrollView, Select, CheckIcon, HStack, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
//chamar meu hook de Questions
import { useQuestions } from '../../hooks/useQuestions'

import { TestCard } from '../../components/TestCard'
import { MyButton } from '../../components/MyButton';
import { useUser } from '../../hooks/useUser';
import { Toast } from '../../components/Toast' 
import { Load } from '../../components/Load' 
import { Header } from '../../components/Header';

interface SkillProps {
  id: string;
  type: 'QS' | 'QL' | 'QG' | 'QM' | 'AJ' | 'OPF';
  ageMonth: string;
  description: string;
}


export function Skills(){
  const [selectedAge, setSelectedAge] = useState("");
  const [skillQuestion, setSkillQuestion] = useState<SkillProps[]>([])
  const [loading, setLoading] = useState(false)

  const { navigate } = useNavigation() 
  const toast = useToast();
  const {idQs, idQl, idQg, idQm, setIdQs, setIdQl, setIdQg, setIdQm} = useQuestions()

  //contexto
  const {user} = useUser()

  function handleSave() {

    //concatenando array de questões
    var allquestions = idQs?.concat(idQl, idQg, idQm)

    //salvando dados na tabela
    firestore()
    .collection('test')
    .add({
      date: firestore.FieldValue.serverTimestamp(),
      uidUser: user.uid,
      selectedAge: selectedAge,
      questionsIds: allquestions 
    })
    .then(data =>{
      //toast de confirmação
      toast.show({
        placement: "top",
        render: () => {
          return <Toast 
            colorBg='success.400' 
            title='Habilidades registradas!' 
            description={`ok, tudo certo`}
            iconName='check-circle'
          />
        }
      });
      //direcionar pra página de informação
      navigate('FimTeste', { ageSelected: selectedAge })

      //zerar todos os estados do meu contexto
      setIdQs([])
      setIdQl([])
      setIdQg([])
      setIdQm([])

      //zerar select
      setSelectedAge("")

    })
    .catch(error => {
      console.log(error.code);
      toast.show({
        placement: "top",
        render: () => {
          return <Toast 
              colorBg='error.400' 
              title='Não foi possível salvar, tente novamente mais tarde' 
              description={`Erro ${error}`}
              iconName='error'
            />
        }
      });
    })


  }

  function handleLisGet() {
    if(selectedAge != "") {
      setLoading(true)

      firestore()
      .collection('skills')
      .where('ageMonth', '==', selectedAge)
      .onSnapshot( async (snapshot) => {
        const data = await snapshot.docs.map(doc => {
          return doc.data()
        })

        setSkillQuestion(data)
        setLoading(false)
      })

    }
  }

  //filtrando categorias de habilidades
    const skillsQS = skillQuestion.filter((skillQs) => {
      return skillQs.type === 'QS'
    })

    const skillsQL = skillQuestion.filter((skillQs) => {
      return skillQs.type === 'QL'
    })

    const skillsQG = skillQuestion.filter((skillQs) => {
      return skillQs.type === 'QG'
    })

    const skillsQM = skillQuestion.filter((skillQs) => {
      return skillQs.type === 'QM'
    })

    console.log(skillsQG)

  useEffect(() => {
    handleLisGet()

  }, [selectedAge])

  if(loading) {
    return <Load />
  }

  return(
    <>
    <Header avatar='http://github.com/thallysfs.png' name='Thallys'/> 
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
          {
            selectedAge ? 
            <ScrollView showsVerticalScrollIndicator={false} mb={455}>
              <Box>
                <TestCard title='Social/Emocional' data={skillsQS} />
                <TestCard title='Linguagem/ Comunicação' data={skillsQL} />
                <TestCard title='Cognitivo (Aprendizado, resolução de problema)' data={skillsQG} />
                <TestCard title='Movimento/ Desenv. Físico' data={skillsQM} />
              </Box>
              <HStack alignItems="space-between" justifyContent="space-between" mx={5} mt={5}>
                <MyButton title='Cancelar' type='error' width={140} height={60} />
                <MyButton title='Salvar' width={140} height={60} onPress={handleSave} />
              </HStack>
            </ScrollView>
            :
            <></>
          }
        </VStack>
    </Box>
    </>
  )
}

