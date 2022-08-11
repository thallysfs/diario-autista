import React, { useState } from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import { Box, Text, Button, HStack, Stack, Input, Icon, FormControl, useToast } from 'native-base'
import RegisterSvg from '../../assets/cadastro.svg'
import LogoPng from '../../assets/logo.png'
import { MaterialIcons } from '@expo/vector-icons';
import { Toast } from '../../components/Toast' 

import auth from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/native'


export function Register(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const navigation = useNavigation<any>();

  const toast = useToast();

  function onSubmit() {

    //validar form
    // setErrors({
    //   email:'',
    //   password:'',
    //   confirmPassword: ''
    // });
    //Alert.alert('Erro', 'email ' + email + ' pass '+ password +' confirm '+confirmPassword)

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

    if (confirmPassword === '') {
      setErrors({ ...errors,
        confirmPassword: 'Senha é obrigatória'
      });
      return false;
    }

    if(password !== confirmPassword) {
      toast.show({
        placement: "top",
        render: () => {
          return <Toast 
                    colorBg='error.400' 
                    title='Senhas diferentes' 
                    description='As senhas não são iguais'
                    iconName='error'
                  />
        }
      });
      return false;
    }
    
    //criar acesso usuário
    auth()
    .createUserWithEmailAndPassword(email, password)
    //.then(data => Alert.alert('Sucesso!', 'Usuário criado com sucesso'))
    .then( data =>{
      console.log(data.user.uid)
    
      //redirecionar
      navigation.navigate('RegisterChild', {
        idUser: data.user.uid
      })
    })
    .catch(error => {
      console.log(error.code);

      if(error.code === 'auth/email-already-in-use'){
        toast.show({
          placement: "top",
          render: () => {
            return <Toast 
                      colorBg='error.400' 
                      title='E-mail já existe' 
                      description='Tente outro e-mail'
                      iconName='error'
                    />
          }
        });
      }
      if(error.code === 'auth/invalid-email'){
        toast.show({
          placement: "top",
          render: () => {
            return <Toast 
                      colorBg='error.400' 
                      title='E-mail inválido' 
                      description='Verifique se o e-mail é válido'
                      iconName='error'
                    />
          }
        });
      }
      if(error.code === 'auth/invalid-password'){
        toast.show({
          placement: "top",
          render: () => {
            return <Toast 
                      colorBg='error.400' 
                      title='Senha inválida' 
                      description='Senha fraca, tente uma senha mais forte'
                      iconName='error'
                    />
          }
        });
      }

    })
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView  behavior="position" style={{flex: 1}}>
      <Box>
        <Box background="secondary.200" paddingTop={5} height={200}>
          <HStack space={2} justifyContent="center">
              <RegisterSvg 
                  width={235}
                  height={130}

              />
              <Image source={LogoPng}  style={{ width: 72, height:48}}/>
          </HStack>
          <Text
            textAlign="center"
            fontFamily="heading"
            fontWeight={500}
            fontSize={30}
          >
            Cadastro
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
            <FormControl isRequired isInvalid={'password' in errors}>
              <Input
                bg='white'
                variant="outline" 
                placeholder="Senha" 
                type={showPassword ? "text" : "password"}
                InputRightElement={<Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} 
                size={5} mr="2" color="muted.400" onPress={() => setShow(!showPassword)} />}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
              {
                confirmPassword == ''
                ? <FormControl.ErrorMessage leftIcon={<Icon as={<MaterialIcons name='error' />} size="xs" />}>{errors.confirmPassword}</FormControl.ErrorMessage>
                : <></>
              }              
            </FormControl>

            <Button bg="primary.50" size="lg" marginTop={10} onPress={onSubmit} _pressed={{ bg: "yellow.50" }} >
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
