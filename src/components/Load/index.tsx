import { Center, Spinner} from 'native-base'

export function Load(){
    return(
        <Center flex={1} bg='secondary.200'>
            <Spinner color='secondary.700'/>
        </Center>
    )
}
