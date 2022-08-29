import {createContext, useContext, useState} from 'react'
import { FirebaseAuthTypes} from '@react-native-firebase/auth'

export function UserProvider(){
    const UserContext = createContext<FirebaseAuthTypes.User>({} as FirebaseAuthTypes.User)
    
  return(

  )
}
