import { ReactNode } from 'react';
import {Button, Modal, IModalProps} from 'native-base'

interface Props extends IModalProps {
    title: string;
    children: ReactNode;
    updatedAt?: string;
    isEditing?: boolean;
    showModal?: boolean;
    setShowModal: (showModal: boolean)=> void
    onSubmit: () => void
}

export function CustomModal({
    title, 
    children, 
    updatedAt, 
    isEditing=false, 
    showModal=false, 
    setShowModal, 
    onSubmit, 
    ...rest } 
: Props){

  return(
    <Modal {...rest}  size="xl">
    <Modal.Content flex={1}>
      <Modal.CloseButton />
      <Modal.Header bg="secondary.200">{title}</Modal.Header>
      <Modal.Body>
        {/* Aqui vai o TextArea ou o corpo do Modal */}
        { children }
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={()=>setShowModal(showModal)}>
            Cancelar
          </Button>
          <Button onPress={onSubmit}>
            Salvar
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
  )
}
