import { useState, useContext, useEffect } from 'react'
import {Text, Center, VStack, Image, Button, Pressable, useToast, Input, Switch} from 'native-base'
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../context/UserContext'
import storage from '@react-native-firebase/storage'
import { firebase } from '@react-native-firebase/auth';
import  firestore  from '@react-native-firebase/firestore';
import { useForm, Controller } from 'react-hook-form'

import { MyButton } from '../components/MyButton'

import UserImg from '../assets/user.png'
import { Toast } from '../components/Toast';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface FormDataProps {
  name: string;
  responsible: string;
  birthday: string;
}


export function Account(){
  const [image, setImage] = useState('')
  //const [pathImage, setPathImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isActive, setIsActive] = useState();
  const [idDoc, setIdDoc] = useState('');

  const { user } = useContext(UserContext)
  const toast = useToast();


  function handleActiveProfile() {
    let prof = !isActive

    // dar update com valor do active
    firestore()
      .collection('users')
      .doc(idDoc)
      .update({
        isProfessional: prof
      })
      console.log("prof", prof)
  }
  
  // Do form
  const { control, handleSubmit, reset, formState: {errors}} = useForm<FormDataProps>()

  // salvando registro de novas crianças
  function handleSaveDataChildren({ name, birthday, responsible} : FormDataProps) {
    firestore()
      .collection('children')
      .add({
        createdAt: firestore.FieldValue.serverTimestamp(),
        birthday,
        name,
        responsible,
        idUser: user.uid
      })
      .then( data => {
        toast.show({
          placement: "top",
          render: () => {
            return <Toast 
                      colorBg='success.400' 
                      title='Sucesso!' 
                      description={'Cadastrado com sucesso'}
                      iconName='check-circle'
                    />
          }
        });

        // zerar estados ou form
        reset()
      })
      .catch((error) => {
        toast.show({
          placement: "top",
          render: () => {
            return <Toast 
                      colorBg='error.400' 
                      title='Erro' 
                      description={`Erro ${error}`}
                      iconName='error'
                    />
          }
        });
      })
    
    //console.log(name, birthday, responsible)
  }

  async function handlePickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  async function handleUpload() {
    if(!image) {
      return (
        toast.show({
          placement: "top",
          render: () => {
            return <Toast 
              colorBg='error.400'
              title='Erro' 
              description={`Selecione uma foto da sua galeria tocando na imagem acima`}
              iconName='error'
            />
          }
        })
      )
    }

    setIsLoading(true)

    const fileName = new Date().getTime() + '_' + user.email;
    const MIME = image.match(/\.(?:.(?!\.))+$/)
    const reference = storage().ref(`/images/${fileName}${MIME}`);

      reference
      .putFile(image)
      .then((res)=> {
        toast.show({
          placement: "top",
          render: () => {
            return <Toast 
                      colorBg='success.400' 
                      title='Sucesso' 
                      description={`Foto alterada com sucesso`}
                      iconName='check-circle'
                    />
          }
        });
    
        //pegando usuário logado atualmente
        var user = firebase.auth().currentUser;
        //atualizando tabela de usuário com o FullPath
        user?.updateProfile({ photoURL: res.metadata.fullPath})
        .then(()=>{ console.log("url atualizada")})
        .catch((error) =>{ console.log(error)})
        

      })
      .catch((error) => {
        toast.show({
          placement: "top",
          render: () => {
            return <Toast 
                      colorBg='error.400' 
                      title='Erro' 
                      description={`Erro ${error}`}
                      iconName='error'
                    />
          }
        });
        console.log(error)
      })
      .finally( () => setIsLoading(false))

  }

  useEffect(()=>{
    //lendo registros no usuário
    const subscriber = firestore()
    .collection('users')
    .where('idUser', '==', user.uid)
    .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
            const { isProfessional} = doc.data();

            return {
              id: doc.id,
              isProfessional
            }
          })
        
          // guardando valores retornados
        setIsActive(data[0].isProfessional)
        setIdDoc(data[0].id)

        console.log("dados", data)
        console.log("active", isActive)
    })
    

    return subscriber;

}, [])

  return (
    <>
      <VStack bg="secondary.200" space={3}>
        <Center justifyContent="center" pt={37} pb={5}>
          <Text
            fontFamily="heading"
            fontWeight={500}
            fontSize={20}
            marginBottom={30}
          >
            Dados da conta
          </Text>
          <Pressable onPress={handlePickImage}>
            {
              image
              ? <Image source={{ uri: image }} alt="imagem do usuário" width={75} height={75} rounded={50} />
              : <Image source={UserImg} alt="imagem do usuário" width={75} height={75} />
            }
          </Pressable>
          <Button 
            onPress={handleUpload} 
            mt={30}
            isLoading={isLoading}
          >
            Trocar imagem
          </Button>
        </Center>
      </VStack>
      {/* Corpo */}
      {
        isActive ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Center pt={15} px={7}>
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Informe o nome' }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome da criança"
                  variant="outline"
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="characters"
                  bg='white'
                />
              )}
            />
            <Text color="red.500">{errors.name?.message}</Text>

            {/* ****Data de nascimento**** */}
            <Controller
              control={control}
              name="birthday"
              rules={{
                required: 'Informe a data de nascimento dd/mm/aaaa',
                pattern: {
                  value:
                    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/i,
                  message: 'Informe a data no padrão dd/mm/aaaa',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Data de nascimento"
                  variant="outline"
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="characters"
                  bg='white'
                />
              )}
            />
            <Text color="red.500">{errors.birthday?.message}</Text>

            {/* Responsável */}
            <Controller
              control={control}
              name="responsible"
              rules={{ required: 'Informe o nome' }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Responsável da criança"
                  variant="outline"
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="characters"
                  bg='white'
                />
              )}
            />
            <Text color="red.500">{errors.responsible?.message}</Text>

            <MyButton title="Salvar"  onPress={handleSubmit(handleSaveDataChildren)} />
          </Center>
        </TouchableWithoutFeedback>

        ) : (
          <></>
        )
      }
        <Center pt={610} pl={250} position="absolute">
          <Text>Ativar perfil prof</Text>
          <Switch size="md" onValueChange={handleActiveProfile} value={isActive} />
        </Center>
    </>
  )
}
