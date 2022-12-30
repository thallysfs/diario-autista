import { useState, useContext } from 'react'
import {Box, Text, Center, VStack, Image, Button, Pressable, useToast} from 'native-base'
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../context/UserContext'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'


import UserImg from '../assets/user.png'
import { Toast } from '../components/Toast';


export function Account(){
  const [image, setImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fullPath, setFullPath] = useState('')
  const { uid } = useContext(UserContext)
  const toast = useToast();

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

    const fileName = new Date().getTime() + '_' + uid;
    const MIME = image.match(/\.(?:.(?!\.))+$/)
    const reference = storage().ref(`/images/${fileName}.${MIME}`);

    console.log(MIME)

    const teste = reference
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
        //pegando retorno do upload, salvando o caminho que a imgem fica
        setFullPath(res.metadata.fullPath)

        //atualizando tabela de usuário com o FullPath
        // firestore()
        //   .collection('users')
        //   //.doc('imagePath')
        //   .update({
        //     imagePath: res.metadata.fullPath
        //   })

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

  return (
    <VStack bg="secondary.200" space={3}>
      <Center justifyContent="center" pt={37}>
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

      <Center>

      </Center>

      <Center>

      </Center>
    </VStack>
  )
}
