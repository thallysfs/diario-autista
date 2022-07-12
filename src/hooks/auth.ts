import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { Alert } from 'react-native';

//import AsyncStorage from '@react-native-async-storage/async-storage'

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
    children: ReactNode
}

//adicionar mais campos
interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoading: boolean;

}

interface AuthorizationResponse {
    params: {
        access_token: string;
    },
    type: string; 
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps ){
    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);


    const userStorageKey = '@gofinances:user';

    //função para acessar a conta do google
    async function signIn() {
        try {

            }
            

        } catch (error) {
            throw new Error(error as string);
        }


    } 

    // função de logout
    async function signOut() {
        setUser({} as User);
        await AsyncStorage.removeItem(userStorageKey);
    }

    useEffect(() => {
        async function loadUserStorageData() {
            const userStorage = await AsyncStorage.getItem(userStorageKey);

            if(userStorage){
                const userLoged = JSON.parse(userStorage) as User;
                setUser(userLoged);
            }

            setUserStorageLoading(false);
        }

        loadUserStorageData();
    }, [])

    return (
        <AuthContext.Provider value={{ 
            user,
            signInWithGoogle,
            signInWithApple,
            signOut,
            userStorageLoading 
        }}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)

    return context;
}

export { AuthProvider, useAuth}
