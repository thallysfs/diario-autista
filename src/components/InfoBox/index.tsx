import { Box, Center, HStack, VStack, Text, Button, Image, IImageProps } from 'native-base'
import React from 'react'


interface Props {
  name: string;
  image: string;
  alt: string;
}


export function InfoBox({name, image, alt} : Props){
  return(
    <Box background="white" rounded={5} shadow="2" justifyContent="space-between" height={100} width={350}>
      <HStack space={2} justifyContent="space-between" marginRight={19} marginLeft={5}>
        <VStack space={2} alignItems="center">
            <Text
                marginTop={2}
                fontFamily="heading"
                fontWeight={500}
                fontSize={20}
                marginBottom={1}
            >
                {name}
            </Text>
            <Button alignItems="center" width={131} >
               <Text fontFamily="heading" fontWeight={500} color="white">Começar</Text> 
            </Button>
        </VStack>
        <Box marginTop={5}>
            <Image alt={alt} source={image}  width="57" height="57"/>
        </Box>
      </HStack>
    </Box>
  )
}
