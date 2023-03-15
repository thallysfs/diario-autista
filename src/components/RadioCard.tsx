import {Box, Text, HStack, VStack, Pressable, IPressableProps} from 'native-base'
import { useState } from 'react';

import { convertBirthdayTodate } from '../Utils/convertBirthdayTodate'

export interface DataChildren extends IPressableProps {
  id: string;
  name: string;
  responsible: string;
  birthday: string;
  selected: boolean;
  onSelect?: (value: string) => void
}


export function RadioCard({id, name, responsible, birthday, selected, onSelect, ...rest} : DataChildren){

  return (
    <Box
      borderWidth={1}
      borderStyle="solid"
      borderColor="black"
      borderRadius={12}
      background="white"
      maxHeight={55}
      width={80}
      shadow={2}
      mt={5}  
    >
      <Pressable
        key={id}
        borderRadius={12}
        bg={ selected  ? 'light.200' : 'white'}
        _pressed={{ 
          bg: 'light.200',
          borderWidth:"1",
          borderStyle:"solid",
          shadow:"2",
          borderColor:"light.400"
        }}
        {...rest}
      >
        <HStack>
          <VStack mt={2}>
            <Text
              ml={2}
              fontFamily="heading"
              fontSize={14}
            >
              {name}
            </Text>
            <HStack>
              <Text
              ml={2}
                fontFamily="body"
                fontSize={10}
              >
                Responsável: {responsible}
              </Text>
              <Text
              ml={2}
                fontFamily="body"
                fontSize={10}
              >
                {convertBirthdayTodate(birthday)} ano(s)
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Pressable>
    </Box>
  )
}
