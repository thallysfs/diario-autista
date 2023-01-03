import React from 'react'
import { useToast, VStack, HStack, Text,  Box, Icon, } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
    title: string;
    description: string;
    colorBg: string;
    iconName: React.ComponentProps<typeof MaterialIcons>['name'];
}

export function Toast({description, title, colorBg, iconName}: Props){
    const toast = useToast();
    
    return(
      <Box bg={colorBg} maxWidth="80%" alignSelf="center" flexDirection="row" rounded={5}>
      <VStack space={1} flexShrink={1} w="100%" justifyContent="center" alignItems='center'>
        <HStack space={2} alignItems="center">
          <Icon as={<MaterialIcons name={iconName} />} marginTop={2} ml={1} color='black' size='md'/>
          <Text fontSize="md" fontWeight="medium" color="solid" marginTop={2}>
            {title}
          </Text>
        </HStack>
        <Text px="6" marginBottom={2}>
          {description}
        </Text>
      </VStack>
    </Box>
  )
}


