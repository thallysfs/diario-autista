import React, { useEffect, useContext, useState, useRef, useCallback } from 'react'
import auth from '@react-native-firebase/auth'
import {Alert} from 'react-native'
import { UserContext } from '../../context/UserContext';
import { firebase } from '@react-native-firebase/storage';
import { useFocusEffect } from '@react-navigation/native';

import {
    Avatar, 
    Box, 
    HStack, 
    Icon, 
    IconButton, 
    Text, 
    Image
} from 'native-base'

import { Feather } from '@expo/vector-icons';
import LogoPng from '../../assets/logo.png'
import GenericUserPng from '../../assets/user.png'


export function Header(){
  const { user, child } = useContext(UserContext)
  const [photo, setPhoto] = useState('')

  function handleLogout(){
    auth()
        .signOut()
        .catch((error) =>{
            console.log(error)
            return Alert.alert('Erro', 'Não foi possível sair')
        })
  }

  //pegar imagem do usuário
  async function getImage() {
    const urlImage = await firebase.storage().ref(user.photoURL).getDownloadURL()
    //const urlImage = await refImage.getDownloadURL();
    //console.log('urlimage', urlImage)
    setPhoto(urlImage)
  }

  useFocusEffect(useCallback(()=>{
      getImage()

    },[])
    
  )

  return(
    <Box paddingTop="10" background="secondary.200">
      <HStack space={3} justifyContent="space-between">
        <Box marginLeft={5}>
          {
            photo
            ? <Avatar size="lg" source={{ uri: photo }} />
            : <Image source={GenericUserPng} width={60} height={60} alt="imagem genérica de usuário" />
          }      
        </Box>
        <Box marginRight="70">
            <Text fontFamily="body" fontSize={18}>Olá,</Text>
            <Text fontFamily="Poppins_600SemiBold" fontSize={20}>
              {user.displayName}
            </Text>
            <Text fontFamily="mono" fontSize={12}>{child.name ? child.name : ''}</Text>
        </Box>
        <Box>
        <IconButton icon={<Icon as={Feather} name='log-out' />} borderRadius="full" _icon={{
            color: "#363F5F",
            size: "md"
          }} 
          _hover={{
            bg: "indigo.400:alpha.20"
          }} 
          _pressed={{
            bg: "indigo.400:alpha.20",
            _icon: {
              name: "emoji-flirt"
            }
          }}
          onPress={handleLogout}
        />
        </Box>
        <Box marginRight="18">
            <Image source={LogoPng} alt="logo" style={{ width: 72, height:48}}/>
        </Box>
      </HStack>
    </Box>
  )
}
