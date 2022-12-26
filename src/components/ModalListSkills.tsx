import {Button, Modal, IModalProps, Text, Box } from 'native-base'
import { ListItem } from './ListItem';

//tipagem do item
interface itemProps {
  id: string;
  description: string;
}
//tipagem do modal
interface Props extends IModalProps {
    title: string;
    showModal?: boolean;
    setShowModal: (showModal: boolean)=> void
    data: itemProps[]
}

//tipagem do objeto que vai pro onSubmite

export function ModalListSkills({
    title, 
    showModal=false, 
    setShowModal, 
    data, 
    ...rest } 
: Props){

  return(
    <Modal {...rest}  size="xl">
    <Modal.Content flex={1}>
      <Modal.CloseButton />
      <Modal.Header bg="secondary.200">{title}</Modal.Header>
      <Modal.Body>
        {/* listar orientações */}
        {data.map((dat,index) =>
          <Box pt={2} pr={2}>
            <ListItem key={dat.id} decription={dat.description} />
          </Box>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button 
            bg="primary.50" 
            onPress={() => setShowModal(showModal)}
            _pressed={{ bg: 'yellow.50' }}
          >
            <Text 
              color="tertiary.50"
              fontSize={14}           
              fontFamily="heading"
              fontWeight={500}
            >Fechar</Text>
          </Button> 
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
  )
}
