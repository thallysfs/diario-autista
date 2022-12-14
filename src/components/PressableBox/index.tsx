import React, { ReactNode } from 'react'

import { HStack, Text, Icon, IPressableProps, Pressable } from "native-base";
import { Feather } from '@expo/vector-icons';

interface Props extends IPressableProps {
    title: string;
    iconName: React.ComponentProps<typeof Feather>['name'];
    children?: ReactNode
}
 
 export function PressableBox({title, iconName, children, ...rest }: Props){
   return(
     <Pressable {...rest} >
        {({
            isHovered,
            isFocused,
            isPressed
        }) => {
        return <HStack  opacity={isPressed ? 0.5 : 100}>
           <Icon 
              as={Feather}
              name={iconName}
              size={10}
              color="black"
            />
            <Text color="black" fontFamily="Poppins_600SemiBold" fontSize={20} textAlign="center">
              {title}
            </Text>
          </HStack>
        {children}
      }}
     </Pressable>
   )
 }

 // bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
