import { createContext, ReactNode, useEffect, useState } from 'react'
import auth, { FirebaseAuthTypes} from '@react-native-firebase/auth'
import { Load } from '../components/Load'
import  firestore  from '@react-native-firebase/firestore';

//Tipagem do contexto
interface UserType {
    user: FirebaseAuthTypes.User
}

// definindo tipagem para receber os componentes filhos
type UserContextProviderProps = {
    children: ReactNode
}

//criando o contexto para armazenar os dados do login
export const UserContext = createContext<UserType>({} as UserType)

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>()
    const [loading, setLoading] = useState(true)
    const [isProfessional, setIsProfesional] = useState(false)

    function onVerifyProfessional() {
        // ler da tabela user
        const subscriber = firestore()
        .collection('users')
        .where('idUser', '==', user?.uid)
        .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => {
                const { isProfessional} = doc.data();

                return {
                isProfessional
                }
            })
            // guardando valores retornados
            setIsProfesional(data[0].isProfessional)
            //console.log("prof", data)
        })
    }

    //regras de negócio
    useEffect(()=>{
        //verifica se o usuário está autenticado
        auth()
        .onAuthStateChanged(response => {
            //setTokenUser(responser.uid)
            setUser(response)
            setLoading(false)
        }),
        onVerifyProfessional()

    }, [])

    if(loading) {
        return <Load />
    }

    //retornando o provider
    return (
        <UserContext.Provider value={{user, isProfessional}} >
            {children}
        </UserContext.Provider>
    )
}
