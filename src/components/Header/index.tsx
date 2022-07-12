import React from 'react'
import {Image} from 'react-native'
import {
    Avatar, 
    Box, 
    HStack, 
    Text, 
} from 'native-base'

import LogoPng from '../../assets/logo.png'

interface Props {
    avatar: string;
    name: string;
}


export function Header({ avatar, name} : Props){
  return(
    <Box paddingTop="10" background="secondary.200">
      <HStack space={3} justifyContent="space-between">
        <Box marginLeft={5}>
            <Avatar size="lg" source={{ uri: avatar}}/>
        </Box>
        <Box marginRight="100">
            <Text fontFamily="body" fontSize={18}>Olá,</Text>
            <Text fontFamily="Poppins_600SemiBold" fontSize={20}>{name}</Text>
        </Box>
        <Box marginRight="18">
            <Image source={LogoPng}  style={{ width: 72, height:48}}/>
        </Box>
      </HStack>
    </Box>
  )
}
