import { createContext, ReactNode, useEffect, useState } from 'react'
import auth, { FirebaseAuthTypes} from '@react-native-firebase/auth'
import { Load } from '../components/Load'

//Tipagem do contexto
export interface Child {
    childId: string
    name: string
}
interface UserType {
    user: FirebaseAuthTypes.User
    child: Child
    setChild: (value: Child) => void
}

// definindo tipagem para receber os componentes filhos
type UserContextProviderProps = {
    children: ReactNode
}

//criando o contexto para armazenar os dados do login
export const UserContext = createContext<UserType>({} as UserType)

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>()
    const [child, setChild] = useState<Child>({} as Child)
    const [loading, setLoading] = useState(true)

    //regras de negócio
    useEffect(()=>{
        //verifica se o usuário está autenticado
        auth()
        .onAuthStateChanged(response => {
            //setTokenUser(responser.uid)
            setUser(response)
            setLoading(false)
        })

    }, [])

    if(loading) {
        return <Load />
    }

    //retornando o provider
    return (
        <UserContext.Provider value={{user, child, setChild}} >
            {children}
        </UserContext.Provider>
    )
}
