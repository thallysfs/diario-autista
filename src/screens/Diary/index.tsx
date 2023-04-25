import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import  firestore  from '@react-native-firebase/firestore';
import {Box, Center, FlatList, HStack, Text, VStack, Icon, Button, TextArea, Pressable} from 'native-base'
import { Feather } from '@expo/vector-icons';
import { Load } from '../../components/Load'
import {Calendar, LocaleConfig} from 'react-native-calendars';

import { DailyRecordCard, DiaryData} from '../../components/DailyRecordCard'
import { dateFormat } from '../../Utils/firestoreDateFormat';
import { CustomModal } from '../../components/CustomModal';

import { useUser } from '../../hooks/useUser'
import { Header } from '../../components/Header';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Juljo',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Sewunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt-br';

export function Diary(){
  const [loading, setLoading] = useState(false)
  const [dailyRecords, setDailyRecords] = useState<DiaryData[]>([])
  const [page, setPage] = useState<DiaryData>()
  const [showModal, setShowModal] = useState(false);
  const [showModalEditing, setShowModalEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [refreshing, setRefreshing] = useState(false); 
  const [selected, setSelected] = useState('');

  //const [date, setDate] = useState(new Date());
  const [showModalCalendar, setShowModalCalendar] = useState(false);

  //consumindo o contexto do User
  const {user, child} = useUser()

  function handleOpenModalDiaryDetail(orderId: string){
    //filtrar o array
    setPage(dailyRecords.find(x => x.id === orderId))
    
    //abrir modal
    setShowModalEditing(true);

  }


  function onRefresh() {
    setRefreshing(true)
    onDiaryWithChild()
  }

  function onDiary() {
    setLoading(true);
    //lendo registros no diário
    const subscriber = firestore()
    .collection('diary')
    //.orderBy('createdAt', 'desc')
    .where('uidUser', '==', user.uid)
    //adicionar condição de data !!!!!!!!!!!!
    //.where('uidUser', '==', user.uid)
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
  }

  function onDiaryWithChild() {
      setLoading(true);
      //lendo registros no diário
      const subscriber = firestore()
      .collection('diary')
      .where('uidUser', '==', user.uid)
      .where('idChild', '==', child.childId)
      .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => {
              const { createdAt, description, uidUser, updatedAt, idChild } = doc.data();
  
              return {
                id: doc.id,
                createdAt: dateFormat(createdAt),
                description,
                uidUser,
                updatedAt: dateFormat(updatedAt),
                idChild
              }
            })
          setDailyRecords(data);
  
          setLoading(false);
      })
  }
  
  useEffect(()=>{
    if(child.childId){
      onDiaryWithChild()
    } else{
      onDiary()
    }
    setRefreshing(false)
    console.log("🚀 ~ file: index.tsx:26 ~ Diary ~ selected:", selected)
  }, [child, refreshing, selected])
  
  return(
    <>
      <Header /> 

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
          <Pressable onPress={() => setShowModalCalendar(true)} >
            <HStack>
              <Icon 
                as={Feather}
                name="calendar"
                size={19}
                color="black"
              />
              <Text 
                ml={2}
                fontSize="sm" 
                color="black"
                fontFamily="Poppins_600SemiBold"
              >Filtrar data</Text>
            </HStack>
          </Pressable>
        </HStack>
        {
          //selected && <Text>Data escolhida: </Text>
        }

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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
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
        typeModal='save'
        setShowModal={() => setShowModal(false)}
        data={{
          uidUser: user.uid,   
          description,
          idChild: child.childId
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
          onChangeText={text => setDescription(text)} 
        />
      </CustomModal>
      
      {/* Modal do diário - Ver/Editar registro */}
      <CustomModal 
        isOpen={showModalEditing}
        onClose={() => setShowModalEditing(false)}
        title={page?.createdAt}
        setShowModal={() => setShowModalEditing(false)}
        typeModal='edit'
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
    
      <CustomModal
        isOpen={showModalCalendar}
        onClose={()=> setShowModalCalendar(false)}
        title="Calenário"
        typeModal='date'
        setShowModal={()=> setShowModalCalendar(false)}
      >
        <Calendar
          onDayPress={day => {
          setSelected(day.dateString);
        }}
          markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
        />
      </CustomModal>

      </VStack>
    </>
  )
}
