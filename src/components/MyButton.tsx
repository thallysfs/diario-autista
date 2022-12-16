import {Button , Text, IButtonProps} from 'native-base'

interface ButtonProps extends IButtonProps{
  title: string;
  type?: 'success' | 'error'
}

export function MyButton({title, type='success', ...rest}: ButtonProps){
  return (
    <Button 
      bg={type === 'error' ? 'tertiary.200' : 'primary.50'}
      size="lg" 
      _pressed={{ bg: type === 'error' ? 'red.400' : 'yellow.50' }}
      {...rest} 
    >
    <Text 
      color={type === 'error' ? 'white' : 'tertiary.50'}
      fontSize={14}           
      fontFamily="heading"
      fontWeight={500}
    >
      {title}
    </Text>
  </Button>
  )
}

// <Button.Group space={2}>
// <Button variant="ghost" colorScheme="blueGray" onPress={()=>setShowModal(showModal)}>
//   Cancelar
// </Button>
// <Button onPress={() => onSave(data)}>
//   {
//     isEditing ? 'Editar' : 'Salvar'
//   }
// </Button>
// </Button.Group>
