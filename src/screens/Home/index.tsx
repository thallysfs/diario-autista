import React, { useEffect, useContext, useState } from 'react'
import  firestore  from '@react-native-firebase/firestore';
import { UserContext } from '../../context/UserContext'
import { Box, VStack, ScrollView, Text, Center, Icon, HStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
//import XMLParser from 'react-xml-parser';

//import {dados197} from '../../Utils/dados'
import { InfoBox } from '../../components/InfoBox';
import { Feather } from '@expo/vector-icons';

import Account from '../../assets/account.png'
import Config from '../../assets/config.png'
import Notebook from '../../assets/notebook.png'
import Children from '../../assets/children.png'

import { Header } from '../../components/Header';

export function Home(){
  const { navigate } = useNavigation()
  const { user } = useContext(UserContext)
  const [isProfessional, setIsProfessional] = useState(false)

    // const m = dados197.split("|")

    // console.log("My array", m)

    // //salvar dados na tabela nova - apagar depois
    // firestore()
    //   .collection('skills')
    //   .add({
    //     ageMonth: m[1],
    //     description: m[3],
    //     id: m[0],
    //     type: m[2]
    //   })
    //   .then(data =>{
    //     console.log("ok")
    //   })

    function checkIdProfessional() { 
        // ler da tabela user
        firestore()
        .collection('users')
        .where('idUser', '==', user?.uid)
        .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => {
                const { isProfessional} = doc.data();
    
                return {
                isProfessional
                }
            })
            // retornando
            console.log("utilContext", data[0].isProfessional)
            setIsProfessional(data[0].isProfessional)

        })
    }

    function GetFeed() {
      // const options = {
      //   method: 'GET'
      // }

      // fetch('https://www.canalautismo.com.br/categoria/noticia/feed', options)
      //   .then(response => response.text())
      //   .then(data => {
      //     const parser = new DOMParser();
      //     const xml = parser.parseFromString(data, "application/xml");
      //     console.log(xml);
      //   })

      axios.get('https://www.canalautismo.com.br/categoria/noticia/feed')
        .then(response => {
          const json = new XMLParser().parseFromString(response.data)
          //console.log(json)
        })


    }

    function onRedirectAccount() {
      navigate('Conta')
    }    
    
    function onRedirectConfiguration() {
      navigate('Configurações')
    }    
    
    function onRedirectDiary() {
      navigate('Diário')
    }     
    
    function onRedirecRecords() {
      navigate('Cadastros')
    }    

    useEffect(()=>{
      //GetFeed()
      checkIdProfessional()

    },[])


  return(
    <>
    <Header avatar='http://github.com/thallysfs.png' name='Thallys'/> 
    <Box marginBottom={280} flex={1}>
      <VStack space={3} alignItems="center" marginTop={5}>
        <InfoBox name='Seus dados' image={Account} alt='configurações da conta' redirect={onRedirectAccount} />
        <InfoBox name='Configurações' image={Config} alt='engrenagem numa caixa' redirect={onRedirectConfiguration} />
        <InfoBox name='Registro diário' image={Notebook} alt='caderno com lápis' redirect={onRedirectDiary} />
        {
          isProfessional ? (
            <InfoBox name='Ver Cadastros' image={Children} alt='criança brincando' redirect={onRedirecRecords} />
          ) : (
            <></>
          )
        }
      </VStack>
      <Center bg="white" marginTop={3} rounded={5} shadow="2" mx={5} pt={2}>
        <HStack>
          <Icon 
            as={Feather}
            name="alert-triangle"
            size={30}
            color="black"
          />
          <Text
            fontFamily="heading"
            fontWeight={500}
            fontSize={20}
            marginLeft={2}
          >
            Informações úteis
          </Text>
          </HStack>
        <ScrollView>
          
        </ScrollView>
      </Center>

    </Box>
    </>
  )
}
