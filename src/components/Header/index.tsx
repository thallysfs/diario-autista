import React from 'react'
import auth from '@react-native-firebase/auth'
import {Alert, Image} from 'react-native'
import {
    Avatar, 
    Box, 
    HStack, 
    Icon, 
    IconButton, 
    Text, 
} from 'native-base'
import { Feather } from '@expo/vector-icons';
import LogoPng from '../../assets/logo.png'

interface Props {
    avatar: string;
    name: string;
}


export function Header({ avatar, name} : Props){

  function handleLogout(){
    auth()
        .signOut()
        .catch((error) =>{
            console.log(error)
            return Alert.alert('Erro', 'Não foi possível sair')
        })
  }

  return(
    <Box paddingTop="10" background="secondary.200">
      <HStack space={3} justifyContent="space-between">
        <Box marginLeft={5}>
            <Avatar size="lg" source={{ uri: avatar}}/>
        </Box>
        <Box marginRight="70">
            <Text fontFamily="body" fontSize={18}>Olá,</Text>
            <Text fontFamily="Poppins_600SemiBold" fontSize={20}>{name}</Text>
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
            <Image source={LogoPng}  style={{ width: 72, height:48}}/>
        </Box>
      </HStack>
    </Box>
  )
}
