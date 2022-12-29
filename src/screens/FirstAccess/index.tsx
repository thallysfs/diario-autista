import React from 'react'
import { Box, Text, Button, Center, Icon } from 'native-base'
import ChildrenSvg from '../../assets/criancas-brincando.svg'
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'

export function FirstAccess(){
  const navigation = useNavigation<any>();

  function redirectRegisterScreen(){
    navigation.navigate('Register')
  }

  function onLogin(){
      navigation.navigate('Login')
  }

  return(
    <Box>
      <Box 
        bg="secondary.200" 
        height={600}
      >
        <Center marginTop={100}>
        <ChildrenSvg 
          width={396}
          height={168}
        />
        
        <Text
          textAlign="center"
          marginTop={70}
          fontFamily="heading"
          fontWeight={500}
          fontSize={30}
        >
          Acompanhe a {`\n`}
          evolução de forma {`\n`}
          muito mais simples

        </Text>
        </Center>
      </Box>
      <Box bg="primary.50" height={400} paddingRight={30} paddingLeft={30} alignContent="center">
        <Button
          marginTop={-5} 
          leftIcon={<Icon as={Feather} name="mail" size="lg" color="tertiary.400"/>}
          size="md"
          bg="white"
          colorScheme="rose"
          _pressed={{ bg: "gray.200" }}
          onPress={onLogin} 
        >
          <Text
          color="tertiary.400"
          fontFamily="body"
          fontWeight={500}
          marginLeft={6}
          fontSize={20}
          >
            Entrar com e-mail
          </Text>
        </Button>
        <Button 
          size="md" 
          variant="link"
          textAlign="center"
          marginTop={60}
          onPress={redirectRegisterScreen}
        >
            Primeiro acesso
        </Button>
      </Box>
    </Box>
  )
}
