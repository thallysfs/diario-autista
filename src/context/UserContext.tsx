import { createContext, ReactNode, useEffect, useState } from 'react'
import auth, { FirebaseAuthTypes} from '@react-native-firebase/auth'
import { Load } from '../components/Load'

//Tipagem do contexto
interface UserType {
    uid: string;
}

// definindo tipagem para receber os componentes filhos
type UserContextProviderProps = {
    children: ReactNode
}

//criando o contexto para armazenar os dados do login
export const UserContext = createContext<UserType>({} as UserType)

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<FirebaseAuthTypes.User>()
    const [loading, setLoading] = useState(true)

    //regras de negócio
    useEffect(()=>{
        //verifica se o usuário está autenticado
        auth()
        .onAuthStateChanged(response => {
            setUser(response)
            //setTokenUser(responser.uid)
            setLoading(false)
            console.log(response)
        })

    }, [])

    if(loading) {
        return <Load />
    }

    //retornando o provider
    return (
        <UserContext.Provider value={user} >
            {children}
        </UserContext.Provider>
    )
}