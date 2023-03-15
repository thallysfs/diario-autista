import { useState } from 'react'
import auth from '@react-native-firebase/auth';
import { Box, Button, Text, Icon, HStack, Stack, FormControl, Input, Image } from 'native-base'
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import LogoPng from '../../assets/logo.png'
import { useNavigation } from '@react-navigation/native';
import LoginSvg from '../../assets/login.svg'

export function Login(){
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShow] = useState(false);
    const [errors, setErrors] = useState({});

    const { navigate } = useNavigation() 

    function handleSignIn() {
    //Validar email
    if (email === '') {
      setErrors({...errors,
        email: 'Email é obrigatório'
      });
      return false;
    }

    if (password === '') {
      setErrors({ ...errors,
        password: 'Senha é obrigatória'
      });
      return false;
    }
      setIsLoading(true)

      //autenticação com firebase
      auth()
          .signInWithEmailAndPassword(email, password)
          .catch((error) => {
              console.error(error)
              setIsLoading(false)

              if(error.code === 'auth/user-not-found'){
                  return Alert.alert('Erro', 'e-mail não cadastrado')
              }                
              
              if(error.code === 'auth/invalid-email'){
                  return Alert.alert('Erro', 'e-mail inválido')
              }

              if(error.code === 'auth/wrong-password'){
                  return Alert.alert('Erro', 'senha inválida')
              }
              
              return Alert.alert('Erro', 'Não foi possível acessar')
          })
  }


    
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView  behavior="position" style={{flex: 1}}>
      <Box>
        <Box background="secondary.200" paddingTop={5} height={200}>
          <HStack space={2} justifyContent="center">
              <LoginSvg 
                  width={235}
                  height={130}
              />
              <Image source={LogoPng} alt="homem abrindo a porta"  style={{ width: 72, height:48}}/>
          </HStack>
          <Text
            textAlign="center"
            fontFamily="heading"
            fontWeight={500}
            fontSize={30}
          >
            Login
          </Text>
        </Box>        
        <Box background="secondary.100" height="100%" paddingTop={100}> 
          <Stack marginRight={6} marginLeft={5} space="5">
            <FormControl isRequired isInvalid={'email' in errors}>
              <Input 
                variant="outline" 
                placeholder="E-mail" 
                keyboardType='email-address' 
                autoCorrect={false} 
                bg='white'
                onChangeText={setEmail}
                value={email}
              />
              {
                email === ''
                ? <FormControl.ErrorMessage leftIcon={<Icon as={<MaterialIcons name='error' />} size="xs" />}>{errors.email}</FormControl.ErrorMessage>
                : <></>
              }              
            </FormControl>
            <FormControl isRequired isInvalid={'password' in errors}>
              <Input
                bg='white'
                variant="outline" 
                placeholder="Senha" 
                type={showPassword ? "text" : "password"}
                InputRightElement={<Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} 
                size={5} mr="2" color="muted.400" onPress={() => setShow(!showPassword)} />}
                onChangeText={setPassword}
                value={password}
              />
              {
                password == ''
                ? <FormControl.ErrorMessage leftIcon={<Icon as={<MaterialIcons name='error' />} size="xs" />}>{errors.password}</FormControl.ErrorMessage>
                : <></>
              }              
            </FormControl>
            <Button 
              bg="primary.50" 
              size="lg" 
              marginTop={10} 
              onPress={handleSignIn} 
             _pressed={{ bg: "yellow.50" }}
             isLoading={isLoading} 
            >
              <Text 
                color="tertiary.50" 
                fontSize={14}           
                fontFamily="heading"
                fontWeight={500}
              >
                Enviar
              </Text>
            </Button>
          </Stack>
        </Box>
      
      </Box>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
