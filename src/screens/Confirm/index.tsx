import React from 'react'
import { Box, Button, Center, Text, VStack } from 'native-base'
import CompleteSvg from '../../assets/completing.svg'
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export function Confirm(){
  const navigation = useNavigation<any>();

  function onConfirm(){
    navigation.navigate('SignIn')
  }

  return(
    <Box bg="secondary.200" height='100%'>
      <VStack space={3} alignItems='center'>
        <Center paddingTop={143}>
          <CompleteSvg width={179} height={205}/>
        </Center>
        <Center paddingTop={110}>
          <Text
            textAlign="center"
            fontFamily="heading"
            fontWeight={600}
            fontSize={30}
            color="tertiary.50"
          >
            Cadastro Realizado
          </Text>
          <Text
            textAlign="center"
            marginTop={5}
            fontFamily="heading"
            fontWeight={400}
            fontSize={15}
            color='gray.500'
          >
            Agora você já pode começar {`\n`}
            a utilizar o aplicativo
          </Text>
        </Center>
        <Center>
          <Button 
            bg="primary.50" 
            size="lg" marginTop={10} 
            onPress={onConfirm} 
            paddingRight={8} 
            paddingLeft={8} 
            _pressed={{ bg: "yellow.50" }}
          >
            <Text 
              color="tertiary.50" 
              fontSize={15}           
              fontFamily="heading"
              fontWeight={600}
            >
              OK
            </Text>
          </Button>
        </Center>
      </VStack>
    </Box>
  )
}
