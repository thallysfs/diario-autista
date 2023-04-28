import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {Box, Text, Center, useToast} from 'native-base'

import { Toast } from '../components/Toast' 
import { Load } from '../components/Load' 
import { useUser } from '../hooks/useUser';
import { Header } from '../components/Header';

export function Assessment(){
  const {user, child} = useUser()
  const [loading, setLoading] = useState(false)

  const { navigate } = useNavigation() 
  const toast = useToast();

  //verificar se existe criança escolhida
  useFocusEffect(useCallback(()=>{
    // verificar se criança foi preenchida, se não direciona para escolher
    if (child.childId == null) {
      navigate('Cadastros')
      //toast de confirmação
      toast.show({
        placement: "top",
        render: () => {
          return <Toast 
            colorBg='success.400' 
            title='Escolha uma criança' 
            description={`Escolha uma criança antes de fazer o teste de habilidades`}
            iconName='check-circle'
          />
        }
      });
    }

    },[child])
  )


  if(loading) {
    return <Load />
  }

  
  return (
    <>
    <Header />
      <Box>
        <Box background="secondary.200">  
          <Text 
            textAlign="center"
            fontFamily="heading"
            fontWeight={500}
            fontSize={30}
          >
            Avaliações      
          </Text>
        </Box>

      </Box>
    </>
  )
}
