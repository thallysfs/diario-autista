import React from 'react'
import { Box, Text, VStack, ScrollView } from 'native-base'
import { InfoBox } from '../../components/InfoBox'

import LinguagemPng from '../../assets/linguagem.png'
import CognicaoPng from '../../assets/cognicao.png'
import SocializacaoPng from '../../assets/socializacao.png'
import MotorPng from '../../assets/motor.png'


export function Skills(){
  return(
    <Box>
      <ScrollView marginBottom={10}>
        <Box background="secondary.200">  
          <Text 
            textAlign="center"
            fontFamily="heading"
            fontWeight={500}
            fontSize={30}
          >
            Habilidades      
          </Text>
        </Box>


      <Text
          textAlign="center"
          marginTop={5}
          fontFamily="heading"
          fontWeight={500}
          fontSize={18}
      >
        Os testes abaixo são baseados{`\n`}na metodologia Portage
      </Text>
 
            <VStack space={4} alignItems="center" marginTop={5}>
              <InfoBox name='Linguagem' image={LinguagemPng} alt='balões de diálogo'/>
              <InfoBox name='Cognição' image={CognicaoPng} alt='Cabeça, emgrenagem e lâmpada'/>
              <InfoBox name='Socialização' image={SocializacaoPng} alt='balões de diálogo com três pessoas'/>
              <InfoBox name='Hab. Motora' image={MotorPng} alt='boneco de perfil em movimento'/>
            </VStack>
          </ScrollView>
     
    </Box>
  )
}

