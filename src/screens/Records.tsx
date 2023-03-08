import { useContext, useEffect, useState } from 'react';
import {Box, Text, Center, FlatList} from 'native-base'
import  firestore  from '@react-native-firebase/firestore';

import { MyButton } from '../components/MyButton'

import ChildrenSvg from '../assets/kids.svg'
import { UserContext } from '../context/UserContext';
import { RadioCard, DataChildren } from '../components/RadioCard';


export function Records(){
  const [children, setChildren] = useState<DataChildren[]>([])
  const [option, setOption] = useState('');

  const { user } = useContext(UserContext)

  function onGetChildren() {
    firestore()
    .collection('children')
    .where('idUser', '==', user.uid)
    .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
            const { name, responsible, birthday} = doc.data();

            return {
              id: doc.id,
              name,
              responsible,
              birthday
            }
          })
        
        // guardando valores retornados
        setChildren(data)

    })
  }

  function handleSave() {
    console.log("dados", children)
    console.log("option", option)
  }

  useEffect(()=>{
    onGetChildren()
  },[])

  return (
    <Box px={8} flex={1}>
      <Center pt={9} flex={0.9}>
        <Text 
          textAlign="center"
          fontFamily="heading"
          fontWeight={500}
          fontSize={30}
          pb={4}
        >
            Lista de crianças
          </Text>
        <ChildrenSvg height={214} width={320} />
        <FlatList 
          data={children}
          keyExtractor={item => item.id}
          renderItem={({item})=> (
            <RadioCard 
              id={item.id}
              name={item.name}
              responsible={item.responsible}
              birthday={item.birthday}
              onPress={() => setOption(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10}}
            ListEmptyComponent={()=>(
              <Center mt={20}>
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                    Você ainda não possui {'\n'}
                    nenhum registro
                </Text>
              </Center>
          )}
        />
      </Center>
      <Box flex={0.1}>
        <MyButton mb={2} title='Escolher registro' onPress={handleSave} />
      </Box>
    </Box>
  )
}
