import { ReactNode } from 'react';
import {Button,Box, Modal, IModalProps, Text, useToast} from 'native-base'
import firestore from '@react-native-firebase/firestore'
import { Toast } from '../../components/Toast' 

//tipagem do modal
interface Props extends IModalProps {
    title: string;
    children: ReactNode;
    updatedAt?: string | undefined;
    showModal?: boolean;
    typeModal: 'save' | 'edit' | 'date'
    setShowModal: (showModal: boolean)=> void
    data: {}
}

//tipagem do objeto que vai pro onSubmite

export function CustomModal({
    title, 
    children, 
    updatedAt, 
    showModal=false, 
    setShowModal,
    typeModal, 
    data, 
    ...rest } 
: Props){
  const toast = useToast();

  function onSave(data: any){
    //salvando dados da criança na tabela de Users
    if(typeModal == 'edit'){
      //atualiza descrição existente
    }
    else{
      //create
      firestore()
      .collection('diary')
      .add({
        createdAt: firestore.FieldValue.serverTimestamp(),
        uidUser: data.uidUser,
        description: data.description,
        idChild: data.idChild  
      })
      .then(data =>{
        //toast de confirmação
        toast.show({
          placement: "top",
          render: () => {
            return <Toast 
              colorBg='success.400' 
              title='Registrado com sucesso!' 
              description={`Página do diário salva`}
              iconName='check-circle'
            />
          }
        });

        //fechando modal
        setShowModal(false)
      })
      .catch(error => {
        console.log(error.code);
        toast.show({
          placement: "top",
          render: () => {
            return <Toast 
                colorBg='error.400' 
                title='Não foi possível salvar, tente novamente mais tarde' 
                description={`Erro ${error}`}
                iconName='error'
              />
          }
        });
      })
    }
  }
  

  return(
    <Modal {...rest}  size="xl">
    <Modal.Content flex={1}>
      <Modal.CloseButton />
      <Modal.Header bg="secondary.200">{title}</Modal.Header>
      <Modal.Body>
        {/* Aqui vai o TextArea ou o corpo do Modal */}
        { children }
        {
          !!updatedAt 
          ? <Box><Text>Atualizado em: {updatedAt}</Text></Box>
          : <></>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={()=>setShowModal(showModal)}>
            Cancelar
          </Button>
          {
            typeModal != 'date' 
            ? (
              <Button onPress={() => onSave(data)}>
                {
                  typeModal == 'edit' ? 'Editar' : 'Salvar'
                }
              </Button>
            ) 
            : (
              <Button onPress={()=>setShowModal(showModal)}>
                Fechar
              </Button>
            )
          }
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
  )
}
