import { Box, HStack, Text, VStack, Pressable, IPressableProps, Icon} from 'native-base'
import { Feather } from '@expo/vector-icons';

//criando tipagem dos dados
export interface DiaryData{
    id: string;
    createdAt: string | undefined;
    description: string;
    uidUser: string;
    updatedAt?: string;
    idChild?: string;
}

interface Props extends IPressableProps {
    data: DiaryData;
}

export function DailyRecordCard({data, ...rest}: Props){

    return(
        <Pressable {...rest} mt={2} height={65} rounded="md" marginX={2}>
        <HStack 
            flex={1} 
            bg='white'
            alignItems="center"
            justifyContent="space-between"
            rounded="sm"
            overflow="hidden"
        >
            {/* Barrinha com cor na lateral */}
            <Box h="full" w={2} bg="primary.50" />

            <VStack flex={1} marginY={5} marginLeft={5}>
                <Text 
                    fontSize="sm" 
                    color="black"
                    fontFamily="Poppins_600SemiBold"
                    paddingBottom={1} 
                >
                    Registrado em:
                </Text>
                <HStack alignItems="center">
                <Icon 
                    as={Feather}
                    name="clock"
                    size={14}
                    color="black"
                />
                <Text
                    textAlign="center"
                    fontFamily="heading"
                    fontWeight={400}
                    fontSize={14}
                    color='black'
                    marginLeft={3}
                >
                    {data.createdAt}
                </Text>
                </HStack>
            </VStack>

            <Box mr={5}>
                <Icon 
                    as={Feather}
                    name="file-text"
                    size={22}
                    color="tertiary.50"
                />
            </Box>
        </HStack>
    </Pressable>
    )
    
}
