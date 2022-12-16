import React, { useContext, useEffect, useState } from 'react'
import  firestore  from '@react-native-firebase/firestore';
import {Box, Center, FlatList, HStack, Text, VStack, Icon, Button, TextArea} from 'native-base'
import { Feather } from '@expo/vector-icons';
import { Load } from '../../components/Load'

import { DailyRecordCard, DiaryData} from '../../components/DailyRecordCard'
import { Alert } from 'react-native';
import { dateFormat } from '../../Utils/firestoreDateFormat';
import { UserContext } from '../../routes';
import { CustomModal } from '../../components/CustomModal';


export function Diary(){
  const [loading, setLoading] = useState(false)
  const [dailyRecords, setDailyRecords] = useState<DiaryData[]>([])
  const [page, setPage] = useState<DiaryData>()
  const [showModal, setShowModal] = useState(false);
  const [showModalEditing, setShowModalEditing] = useState(false);
  const [description, setDescription] = useState('');

  //consumindo o contexto que criei
  const uid = useContext(UserContext)


  function handleOpenModalDiaryDetail(orderId: string){
    //filtrar o array
    setPage(dailyRecords.find(x => x.id === orderId))
       
    //abrir modal
    setShowModalEditing(true);

  }


  useEffect(()=>{
    setLoading(true);
    //lendo registros no diário
    const subscriber = firestore()
    .collection('diary')
    //.orderBy('createdAt', 'desc')
    .where('uidUser', '==', uid)
    .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
            const { createdAt, description, uidUser, updatedAt } = doc.data();

            return {
              id: doc.id,
              createdAt: dateFormat(createdAt),
              description,
              uidUser,
              updatedAt: dateFormat(updatedAt)
            }
          })
          
        setDailyRecords(data);

        setLoading(false);
    })
    

    return subscriber;

}, [])

  
  return(
    <>
      <Box background="secondary.200">  
        <Text 
          textAlign="center"
          fontFamily="heading"
          fontWeight={500}
          fontSize={30}
        >
          Diário      
        </Text>
      </Box>
      <VStack flex={1} paddingBottom={6} marginRight={2} marginLeft={2}>
        <HStack alignItems="center" justifyContent="center" marginTop={4} marginBottom={5}>
          <Text
            fontSize="sm" 
            color="black"
            fontFamily="Poppins_600SemiBold"
          > 
            - Agosto -
          </Text>
        </HStack>

        {
          loading 
          ?
          <Load />
          :
          <FlatList 
            data={dailyRecords}
            keyExtractor={item => item.id}
            renderItem={({item}) => <DailyRecordCard data={item} onPress={() => handleOpenModalDiaryDetail(item.id)} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100}}
            ListEmptyComponent={()=>(
              <Center mt={20}>
                <Icon 
                  as={Feather}
                  name="file"
                  size={45}
                  color="gray.300"
                />
                  <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                      Você ainda não possui {'\n'}
                      nenhum registro
                  </Text>
              </Center>
          )}
        /> 
        }

      <Button bg="primary.50" size="lg" marginTop={10} onPress={() => setShowModal(true)} _pressed={{ bg: "yellow.50" }} >
        <Text 
          color="tertiary.50" 
          fontSize={14}           
          fontFamily="heading"
          fontWeight={500}
        >
          Novo Registro
        </Text>
      </Button>
      
      {/* Modal do diário - Novo registro */}
      <CustomModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Novo registro!"
        setShowModal={() => setShowModal(false)}
        data={{
          uidUser: uid,   
          description
        }}
      >
        <TextArea
          AutoCompleteType="" 
          aria-label="t1" 
          numberOfLines={25} 
          placeholder="Como o seu filho está hoje?
          Descreva aqui como está o comportamento, relação com pais, familiares e amigos, 
          interesses, aprendizados diários entre outros... " 
          isInvalid _dark={{
            placeholderTextColor: "gray.300"
          }} 
          mb="5"
          h={80}
          value={description} 
          onChangeText={text => setDescription(text)} 
        />
      </CustomModal>
      
      {/* Modal do diário - Ver/Editar registro */}
      <CustomModal 
        isOpen={showModalEditing}
        onClose={() => setShowModalEditing(false)}
        title={page?.createdAt}
        setShowModal={() => setShowModalEditing(false)}
        isEditing={true}
        updatedAt={page?.updatedAt}
      >
        <TextArea
          AutoCompleteType="" 
          aria-label="t1" 
          numberOfLines={25} 
          isInvalid _dark={{
            placeholderTextColor: "gray.300"
          }} 
          mb="5"
          h={80} 
        >
          {page?.description}
        </TextArea>
      </CustomModal>
  


      </VStack>
    </>
  )
}
