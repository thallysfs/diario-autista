import { useEffect, useState } from 'react'
import  firestore  from '@react-native-firebase/firestore';
import {Text, Center, VStack, HStack, FlatList  } from 'native-base'
import { useRoute } from '@react-navigation/native'

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
  const route = useRoute()
  const { ageSelected } = route.params as RouteParams

  function handleListGetAj() {
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

  function handleListGetOpf() {
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

  useEffect(()=>{
    handleListGetAj()
    handleListGetOpf()

    console.log(skillAj)
  },[ageSelected])

  if(loading) {
    return <Load />
  }

  return (
      <VStack flex={1} bg="secondary.200">
        <Center paddingTop={5}>
          <Text
            textAlign="center"
            fontFamily="heading"
            fontWeight={600}
            fontSize={30}
            color="tertiary.50"
          >Aviso importante</Text>
        </Center>
        <Center pt={5}><DoctorsSvg width={154} height={140} /></Center>
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
          <HStack alignItems="space-between" pt={5} >
            <MyButton title='Ciente' type='info' width={161} height={44} mr={3} />
            <MyButton title='O que posso fazer?' width={161} height={44} />
          </HStack>
        </Center>
      </VStack>
  )
}
