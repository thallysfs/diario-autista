import React, { useRef, useState } from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native'
import FormSvg from '../../assets/form.svg'
import { Box, Text, Button, HStack, Stack, Input, Icon, FormControl, useToast } from 'native-base'
import LogoPng from '../../assets/logo.png'
import { MaterialIcons } from '@expo/vector-icons';
import { Toast } from '../../components/Toast' 

import { useNavigation, useRoute } from '@react-navigation/native';
import firestore, { firebase } from '@react-native-firebase/firestore'

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

export function RegisterChild(){
  const [formData, setFormData] = useState<UserData>({} as UserData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const ageRef = useRef();
  const responsibleRef = useRef();
  const therapistRef = useRef();
  
  const navigation = useNavigation<any>();
  const route = useRoute()
  const { idUser } = route.params as Params;

  const toast = useToast();

  function onSubmit() {

    //validar form
    setErrors({
      childName:'',
      ageChild:'',
      responsible: '',
      therapist: ''
    });
    //Alert.alert('Erro', 'email ' + errors[0] + ' idade '+ formData.ageChild)

    //Validar form
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

      //convertendo a idade da criança para o formato do firebase
      var formatedAgeChild = firebase.firestore.Timestamp.fromDate(new Date(formData.ageChild));

      //desabilitando botão
      setLoading(true);
      //salvar dados do usuário
      firestore()
      .collection('users')
      .add({
        ageChild: formatedAgeChild,
        createdAt: firestore.FieldValue.serverTimestamp(),
        idUser: idUser,
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
        //habilitando botão
        setLoading(false);
      })
  }
  return(

    <Box>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView  behavior="position" style={{flex: 1}}>
          <ScrollView>
      <Box background="secondary.200" paddingTop={5} height={200}>
            <HStack space={2} justifyContent="center">
                <FormSvg 
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
              Dados da Conta
            </Text>
          </Box>        
          <Box background="secondary.100" height="100%" paddingTop={100}> 
            <Stack marginRight={6} marginLeft={5} space="5">
              
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

              <Button 
                isLoading={loading}
                _loading={{
                  bg: "primary.50",
                  _text: {
                    color: "black"
                  }
                }} _spinner={{
                  color: "black"
                }}
                _pressed={{ bg: "yellow.50" }}
                isLoadingText="Enviando..." 
                bg="primary.50" 
                size="lg" 
                marginTop={10} 
                onPress={onSubmit}>
                  <Text 
                    color="tertiary.50" 
                    fontSize={14}           
                    fontFamily="heading"
                    fontWeight={500}
                  >
                  Cadastrar
                </Text>
              </Button>
            </Stack>
    </Box>
          </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </Box>
  )
}
