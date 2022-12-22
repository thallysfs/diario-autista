import { Text, HStack, Icon} from 'native-base'
import { Feather } from '@expo/vector-icons';

interface ListItemProps {
  decription: string
}

export function ListItem({ decription }: ListItemProps){
  return (
    <HStack>
      <Icon 
        as={Feather}
        name="arrow-right"
        size={15}
        mr={1}
        color="black"
      />
      <Text>{decription}</Text>
    </HStack>
  )
}
