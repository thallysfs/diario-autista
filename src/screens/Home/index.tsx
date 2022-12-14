import React, { useEffect } from 'react'
import { Box, Text, HStack, Icon, VStack, Pressable } from 'native-base'
import { Feather } from '@expo/vector-icons';
import { PressableBox } from '../../components/PressableBox';
//import {dados197} from '../../Utils/dados'
import  firestore from '@react-native-firebase/firestore';

export function Home(){

    // const m = dados197.split("|")

    // console.log("My array", m)

    // //salvar dados na tabela nova - apagar depois
    // firestore()
    //   .collection('skills')
    //   .add({
    //     ageMonth: m[1],
    //     description: m[3],
    //     id: m[0],
    //     type: m[2]
    //   })
    //   .then(data =>{
    //     console.log("ok")
    //   })

  return(
    <Box marginBottom={280}>
      <HStack space={2} justifyContent="space-between" margin={15} height="25%">
        <Pressable 
          background="primary.50" 
          width="50%" 
          borderRadius={5}
          shadow="2"
        >
          <HStack justifyContent="center" marginTop={5}>
            <Icon 
              as={Feather}
              name="user"
              size={10}
              color="black"
            />
            <Text color="black" fontFamily="Poppins_600SemiBold" fontSize={18} textAlign="center">
              Dados da {'\n'}
              conta
            </Text>
          </HStack>
        </Pressable>
        <Pressable background="#73B0E6" width="50%" borderRadius={5} shadow="2" justifyContent="center">
          <Icon 
            as={Feather}
            name="settings"
            size={10}
            color="black"
          />
          <Text color="black" fontFamily="Poppins_600SemiBold" fontSize={18} textAlign="center">
            Configurações
          </Text>
        </Pressable>
      </HStack>
      <VStack>
      <PressableBox 
        title='Último registro do diário'
        iconName='book'
        background="#E68E8A" 
        height="25%" 
        marginX={15} 
        borderRadius={5} 
        shadow="2"
        marginBottom={2}
      />
      <PressableBox 
        title='Informações úteis'
        iconName='settings'
        background="#949945" 
        height="75%" 
        marginX={15} 
        borderRadius={5} 
        shadow="2"
      />
      </VStack>
    </Box>
  )
}


// import React from "react";
// import { Pressable, Text, Box, HStack, Spacer, Flex, Badge, Center, NativeBaseProvider, Icon } from "native-base";

// export function Home() {
//   return <Box alignItems="center">
//       <Pressable maxW="96">
//         {({
//         isHovered,
//         isFocused,
//         isPressed
//       }) => {
//         return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}  p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
//           <HStack>
//            <Icon 
//               as={Feather}
//               name="settings"
//               size={10}
//               color="black"
//             />
//             <Text color="black" fontFamily="Poppins_600SemiBold" fontSize={20} textAlign="center">
//               Informações úteis
//             </Text>
//           </HStack>
//         </Box>;
        
//       }}
//       </Pressable>
//     </Box>;
// }
