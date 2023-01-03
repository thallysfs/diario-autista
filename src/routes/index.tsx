import { NavigationContainer } from '@react-navigation/native';
//rotas
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

//importando o hook
import { useUser } from '../hooks/useUser'
import { useEffect } from 'react';


export function Routes(){
    //chamando o hook para pegar o valor da variável, desestruturando para pegar o uid que está dentro de "user"
    const { user } = useUser()
    console.log('uid', user?.uid)

    return(
        <NavigationContainer>
            { user?.uid ? <AppRoutes /> : <AuthRoutes /> }
        </NavigationContainer>

    )
} 
