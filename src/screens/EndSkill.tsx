import { useEffect, useState } from 'react'
import  firestore  from '@react-native-firebase/firestore';
import {Text, Center, VStack, HStack, FlatList  } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'

import { ModalListSkills } from '../components/ModalListSkills';
import { MyButton } from '../components/MyButton'
import DoctorsSvg from '../assets/doctors.svg'

import { ListItem } from '../components/ListItem'
import { Load } from '../components/Load';

interface RouteParams {
  ageSelected: string;
}

interface ListSkillProps {
  id: string;
  description: string;
}

export function EndSkill(){
  const [skillAj, setSkillAj] = useState<ListSkillProps[]>([])
  const [skillOpf, setSkillOpf] = useState<ListSkillProps[]>([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const { navigate } = useNavigation() 
  const route = useRoute()
  
  const { ageSelected } = route.params as RouteParams

  function onListGetAj() {
    if(ageSelected != "") {
      setLoading(true)

      firestore()
      .collection('skills')
      .where('ageMonth', '==', ageSelected)
      .where('type', '==', 'AJ')
      .onSnapshot( async (snapshot) => {
        const data = await snapshot.docs.map(doc => {
          const {id, description } = doc.data();

          return {
            id,
            description
          }
        })

        setSkillAj(data)
        setLoading(false)
      })

    }
  }

  function onListGetOpf() {
    if(ageSelected != "") {
      setLoading(true)

      firestore()
      .collection('skills')
      .where('ageMonth', '==', ageSelected)
      .where('type', '==', 'OPF')
      .onSnapshot( async (snapshot) => {
        const data = await snapshot.docs.map(doc => {
          const {id, description } = doc.data();

          return {
            id,
            description
          }
        })

        setSkillOpf(data)
        setLoading(false)
      })

    }
  }

  function handleRedirect(){
    //direcionar pra página de informação
    navigate('Home')
  }

  useEffect(()=>{
    onListGetAj()
    onListGetOpf()

    console.log(skillOpf)
  },[ageSelected])

  if(loading) {
    return <Load />
  }

  return (
      <VStack flex={1} bg="secondary.200" pt={10}>
        <Center paddingTop={5}>
          <Text
            textAlign="center"
            fontFamily="heading"
            fontWeight={600}
            fontSize={30}
            color="tertiary.50"
          >Aviso importante</Text>
        </Center>
        <Center pt={3}><DoctorsSvg width={154} height={140} /></Center>
        <Center pt={5}>
          <Text
            fontFamily="heading"
            fontSize={14}
          >
            Aja cedo! Converse com o pediatra {`\n`}
            de seu filho se ele:
          </Text>
        </Center>
        <Center pt={3}>
          <FlatList 
            data={skillAj}
            keyExtractor={item => item.id}
            renderItem={({ item })=> (
              <ListItem decription={item.description} />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ px: 35}}
          />
          
        </Center>
        <Center>
          <HStack alignItems="space-between" pt={10} >
            <MyButton title='Ciente' type='info' width={161} height={44} mr={3} onPress={handleRedirect} />
            <MyButton title='O que posso fazer?' width={161} height={44} onPress={() => setShowModal(true)} />
          </HStack>
        </Center>

        {/* Modal */}
        <ModalListSkills 
          title='O que posso fazer?'
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          setShowModal={() => setShowModal(false)}
          data={skillOpf}
        />
      </VStack>
  )
}
