import { useEffect, useState, createContext, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Load } from '../components/Load'
import auth, { FirebaseAuthTypes} from '@react-native-firebase/auth'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

interface UserType {
    uid: string;
}

//criando o contexto para armazenar os dados do login
export const UserContext = createContext({} as UserType)

export function Routes(){
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<FirebaseAuthTypes.User>()


    //estado para atualizar o contexto
    //onst [userContext, setUserContext] = useState<UserType>({} as UserType)

    
    useEffect(()=>{
        //verifica se o usuário está autenticado
        const subscriber = auth()
        .onAuthStateChanged(response => {
            setUser(response)
            //setTokenUser(responser.uid)
            setLoading(false)
            console.log(response)
        })

        return subscriber
    }, [])

    if(loading) {
        return <Load />
      }
    
    return(
        <NavigationContainer>
            <UserContext.Provider value={user?.uid}>
                {
                    user ? <AppRoutes /> : <AuthRoutes />
                }
            </UserContext.Provider>
        </NavigationContainer>
    )
} 
