import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Load } from '../components/Load'
import auth, { FirebaseAuthTypes} from '@react-native-firebase/auth'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'



export function Routes(){
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<FirebaseAuthTypes.User>()
    
    useEffect(()=>{
        //verifica se o usuário está autenticado
        const subscriber = auth()
        .onAuthStateChanged(response => {
            setUser(response)
            setIsLoading(false)
        })

        return subscriber
    }, [])

    if(isLoading) {
        return <Load />
      }
    
    return(
        <NavigationContainer>
            {
                user ? <AppRoutes /> : <AuthRoutes />
            }
        </NavigationContainer>
    )
} 
