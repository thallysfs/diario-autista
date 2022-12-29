import React from 'react'
import { Box, HStack, VStack, Text, Button, Image } from 'native-base'


interface Props {
  name: string;
  image: string;
  alt: string;
  redirect: () => void;
}


export function InfoBox({name, image, alt, redirect} : Props){
  
  return(
    <Box background="white" rounded={5} shadow="2" justifyContent="space-between" height={100} width={350}>
      <HStack space={3} justifyContent="space-between" marginRight={19} marginLeft={5}>
        <VStack space={2} alignItems="center">
            <Text
                marginTop={2}
                fontFamily="heading"
                fontWeight={500}
                fontSize={18}
                marginBottom={1}
            >
                {name}
            </Text>
            <Button width={131} onPress={redirect}>
              <Text fontFamily="heading" fontWeight={500} color="white">Abrir</Text> 
            </Button>
        </VStack>
        <Box marginTop={5}>
            <Image alt={alt} source={image}  width="57" height="57"/>
        </Box>
      </HStack>
    </Box>
  )
}
