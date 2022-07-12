import React, { useState } from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import { Box, Text, Button, HStack, Stack, Input, Icon, FormControl, useToast } from 'native-base'
import RegisterSvg from '../../assets/cadastro.svg'
import LogoPng from '../../assets/logo.png'
import { MaterialIcons } from '@expo/vector-icons';
import { Toast } from '../../components/Toast' 

import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore'

import { useNavigation } from '@react-navigation/native'

interface UserData {
  email: string;
  password: string;
  childName: string;
  ageChild: string;
  responsible: string;
  therapist: string;

}

export function Register(){
  const [showPassword, setShow] = useState(false);
  const [formData, setFormData] = useState<UserData>({} as UserData);
  const [errors, setErrors] = useState({});
  const [uid, setUid] = useState('');

  const toast = useToast();
  const navigation = useNavigation<any>();

  function onSubmit() {

    //validar form
    setErrors({
      email:'',
      password:'',
      childName:'',
      ageChild:'',
      responsible: '',
      therapist: ''
    });
    //Alert.alert('Erro', 'email ' + errors[0] + ' idade '+ formData.ageChild)

    //Validar email
    if (formData.email === undefined) {
      setErrors({
         email: 'Email é obrigatório'
      });
      return false;
    }
    else {
      delete errors.email
    }

    if (formData.password === undefined) {
      setErrors({ ...errors,
        password: 'Senha é obrigatória'
      });
      return false;
    }
    else {
      delete errors.password
    }

    if (formData.childName === undefined) {
      setErrors({ ...errors,
        childName: 'Nome da criança é obrigatório'
      });
      return false;
    }
    else {
      delete errors.childName
    }

    if (formData.ageChild === undefined) {
      setErrors({ ...errors,
        ageChild: 'Data de nascimento é obrigatória'
      });
      return false;
    }
    else {
      delete errors.ageChild
    }

    if (formData.responsible === undefined) {
      setErrors({ ...errors,
        responsible: 'Responsável da criança é obrigatório'
      });
      return false;
    }
    else {
      delete errors.responsible
    }

    if (formData.therapist === undefined) {
      setErrors({ ...errors,
        therapist: 'Terapeuta é obrigatório(a)'
      });
      return false;
    }
    else {
      delete errors.therapist
    }

    //criar acesso usuário
    auth()
    .createUserWithEmailAndPassword(formData.email, formData.password)
    //.then(data => Alert.alert('Sucesso!', 'Usuário criado com sucesso'))
    .then( data =>{
      console.log(data.user.uid)
      setUid(data.user.uid)
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


    Alert.alert('Udi', uid)
    //verificando se criação de login e senha deu certo
    if (uid != ''){
      //convertendo a idade da criança para o formato do firebase
      var formatedAgeChild = firebase.firestore.Timestamp.fromDate(new Date(formData.ageChild));

      //salvar dados do usuário
      firestore()
      .collection('users')
      .add({
        ageChild: formatedAgeChild,
        idUser: uid,
        nameChild: formData.childName,
        password: formData.password,
        responsible: formData.responsible,
        therapist: formData.therapist,
        createdAt: firestore.FieldValue.serverTimestamp()

      })
      .then(data =>{
      //zerando os estados  
      setFormData({
        ageChild:'',
        childName:'',
        email:'',
        password:'',
        responsible:'',
        therapist:''
      });
      setUid('')
        console.log(data)
        navigation.navigate('Confirm')
      })
      .catch((error)=> console.log(error))

    }else {
      return false
    }
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
        <Box background="secondary.100" height="100%" paddingTop={5}> 
          <Stack marginRight={6} marginLeft={5} space="5">
            <FormControl isRequired isInvalid={'email' in errors}>
              <Input 
                variant="outline" 
                placeholder="E-mail" 
                keyboardType='email-address' 
                autoCorrect={false} 
                bg='white'
                onChangeText={ value => setFormData({...formData, email: value})}
                value={formData.email}
              />
              {
                'email' in errors
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
                onChangeText={ value => setFormData({...formData, password: value})}
                value={formData.password}
              />
              {
                'password' in errors 
                ? <FormControl.ErrorMessage leftIcon={<Icon as={<MaterialIcons name='error' />} size="xs" />}>{errors.password}</FormControl.ErrorMessage>
                : <></>
              }              
            </FormControl>
            <FormControl isRequired isInvalid={'childName' in errors}>
              <Input 
                variant="outline" 
                placeholder="Nome da criança" 
                bg='white'
                onChangeText={ value => setFormData({...formData, childName: value})}
                value={formData.childName}
              />
              {
                'childName' in errors 
                ? <FormControl.ErrorMessage leftIcon={<Icon as={<MaterialIcons name='error' />} size="xs" />}>{errors.childName}</FormControl.ErrorMessage>
                : <></>
              }              
            </FormControl>
            <FormControl isRequired isInvalid={'ageChild' in errors}>
              <Input 
                variant="outline" 
                placeholder="Data nascimento da criança ex: 12/05/1999"  
                bg='white'
                onChangeText={ value => setFormData({...formData, ageChild: value})}
                value={formData.ageChild}
              />
              {
                'ageChild' in errors 
                ? <FormControl.ErrorMessage leftIcon={<Icon as={<MaterialIcons name='error' />} size="xs" />}>{errors.ageChild}</FormControl.ErrorMessage>
                : <></>
              }              
            </FormControl>
            <FormControl isRequired isInvalid={'responsible' in errors}>
              <Input 
                variant="outline" 
                placeholder="Nome do cuidador"  
                bg='white'
                onChangeText={ value => setFormData({...formData, responsible: value})}
                value={formData.responsible}
              />
              {
                'responsible' in errors 
                ? <FormControl.ErrorMessage leftIcon={<Icon as={<MaterialIcons name='error' />} size="xs" />}>{errors.responsible}</FormControl.ErrorMessage>
                : <></>
              }              
            </FormControl>
            <FormControl isRequired isInvalid={'therapist' in errors}>
              <Input 
                variant="outline" 
                placeholder="Terapeuta"
                bg='white'
                onChangeText={ value => setFormData({...formData, therapist: value})}
                value={formData.therapist}
              />
              {
                'therapist' in errors 
                ? <FormControl.ErrorMessage leftIcon={<Icon as={<MaterialIcons name='error' />} size="xs" />}>{errors.therapist}</FormControl.ErrorMessage>
                : <></>
              }              
            </FormControl>

            <Button bg="primary.50" size="lg" marginTop={10} onPress={onSubmit}>
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
