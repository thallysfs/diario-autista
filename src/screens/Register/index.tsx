import React, { useRef, useState } from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { Box, Text, Button, HStack, Stack, Input, Icon, FormControl, useToast } from 'native-base'
import RegisterSvg from '../../assets/cadastro.svg'
import LogoPng from '../../assets/logo.png'
import { MaterialIcons } from '@expo/vector-icons';
import { Toast } from '../../components/Toast' 

import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore'

import { useNavigation } from '@react-navigation/native'

interface Params {
  idUser: string;
}

interface UserData {
  idUser: string;
  childName: string;
  ageChild: string;
  responsible: string;
  therapist: string;
}


export function Register(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState<UserData>({} as UserData);
  const [uid, setUid] = useState('');

  const [showPassword, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const ageRef = useRef();
  const responsibleRef = useRef();
  const therapistRef = useRef();

  const navigation = useNavigation<any>();

  const toast = useToast();

  function onSubmit() {
    //desabilitando botão
    setLoading(true)
    
    //Validações
    if (email === '') {
      setErrors({...errors,
        email: 'Email é obrigatório'
      });
      //habilitando botão
      setLoading(false);
      return false;
    }

    if (password === '') {
      setErrors({ ...errors,
        password: 'Senha é obrigatória'
      });
      //habilitando botão
      setLoading(false);
      return false;
    }

    if (confirmPassword === '') {
      setErrors({ ...errors,
        confirmPassword: 'Senha é obrigatória'
      });
      //habilitando botão
      setLoading(false);
      return false;
    }

    if (formData.childName === undefined) {
      setErrors({ ...errors,
        childName: 'Nome da criança é obrigatório'
      });
      //habilitando botão
      setLoading(false);
      return false;
    }
    else {
      delete errors.childName
    }

    if (formData.ageChild === undefined) {
      setErrors({ ...errors,
        ageChild: 'Data de nascimento é obrigatória'
      });
      //habilitando botão
      setLoading(false);
      return false;
    }
    else {
      delete errors.ageChild
    }

    if (formData.responsible === undefined) {
      setErrors({ ...errors,
        responsible: 'Responsável da criança é obrigatório'
      });
      //habilitando botão
      setLoading(false);
      return false;
    }
    else {
      delete errors.responsible
    }

    if (formData.therapist === undefined) {
      setErrors({ ...errors,
        therapist: 'Terapeuta é obrigatório(a)'
      });
      //habilitando botão
      setLoading(false);
      return false;
    }
    else {
      delete errors.therapist
    }

    //verificando se as senhas batem
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

    //convertendo a idade da criança para o formato do firebase
    var formatedAgeChild = firebase.firestore.Timestamp.fromDate(new Date(formData.ageChild));
    
    //criar acesso usuário
    auth()
    .createUserWithEmailAndPassword(email, password)
    //.then(data => Alert.alert('Sucesso!', 'Usuário criado com sucesso'))
    .then( data =>{
      //setUid(data.user.uid) 

      //salvando dados da criança na tabela de Users
      firestore()
      .collection('users')
      .add({
        ageChild: formatedAgeChild,
        createdAt: firestore.FieldValue.serverTimestamp(),
        idUser: data.user.uid,
        nameChild: formData.childName,
        responsible: formData.responsible,
        therapist: formData.therapist,

      })
      .then(data =>{
        //zerando os estados  
        setFormData({
            ageChild:'',
            childName:'',
            responsible:'',
            therapist:'',
            idUser: ''
          });
          console.log(data)
        //habilitando botão
        setLoading(false);
        navigation.navigate('Confirm')
      })
      .catch(error => {
        console.log(error.code);

        toast.show({
          placement: "top",
          render: () => {
            return <Toast 
                      colorBg='error.400' 
                      title='Senhas diferentes' 
                      description={`Erro ${error}`}
                      iconName='error'
                    />
          }
        });
      })

      //atualizando nome do usuário
      //pegando usuário logado atualmente
      // var user = firebase.auth().currentUser;
      // user?.updateProfile({ displayName: })
      // .then(()=>{ console.log("url atualizada")})
      // .catch((error) =>{ console.log(error)})

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
    <ScrollView>    
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
        {/* Corpo */}
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


            {/* Cadastro criança */}
              <Stack  space="5">
            
              <FormControl isRequired isInvalid={'childName' in errors}>
                <Input 
                  variant="outline" 
                  placeholder="Nome da criança" 
                  bg='white'
                  onChangeText={ value => setFormData({...formData, childName: value})}
                  value={formData.childName}
                  returnKeyType={"next"}
                  onSubmitEditing={() => { 
                    ageRef.current.focus() 
                  }}
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
                  returnKeyType={"next"}
                  ref={ageRef}
                  onSubmitEditing={() => { 
                    responsibleRef.current.focus() 
                  }}
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
                  returnKeyType={"next"}
                  ref={responsibleRef}
                  onSubmitEditing={() => { 
                    therapistRef.current.focus() 
                  }}
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
                  returnKeyType={"send"}
                  ref={therapistRef}
                  onSubmitEditing={onSubmit}
                />
                {
                  'therapist' in errors 
                  ? <FormControl.ErrorMessage leftIcon={<Icon as={<MaterialIcons name='error' />} size="xs" />}>{errors.therapist}</FormControl.ErrorMessage>
                  : <></>
                }              
              </FormControl>
          </Stack>
          <Button 
            bg="primary.50" 
            size="lg" marginTop={10} 
            onPress={onSubmit} 
            _pressed={{ bg: "yellow.50" }}
            isLoading={loading}
            loading={{
              bg: "primary.50",
              _text: {
                color: "black"
              }
            }} _spinner={{
              color: "black"
            }}
            isLoadingText="Enviando..."  
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
    </ScrollView>
  )
}
