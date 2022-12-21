import {Box, Text, Center} from 'native-base'
import { useRoute } from '@react-navigation/native'

interface RouteParams {
  ageSelected: string;
}

export function EndSkill(){
  const route = useRoute()
  const { ageSelected } = route.params as RouteParams

  //construir interface de finalização e filtrar orientações por "ageSelected" e mostrar na tela
  //ver no figma detalhes

  return (
    <Box>
      <Text>{ageSelected}</Text>
    </Box>
  )
}
