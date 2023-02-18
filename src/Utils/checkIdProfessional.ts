import { useContext, useState } from 'react'
import  firestore  from '@react-native-firebase/firestore';
import { UserContext } from '../context/UserContext'

export function checkIdProfessional() {
  const { user } = useContext(UserContext)

    // ler da tabela user
    firestore()
    .collection('users')
    .where('idUser', '==', user?.uid)
    .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
            const { isProfessional} = doc.data();

            return {
            isProfessional
            }
        })
        // retornando
        console.log("utilContext", data[0].isProfessional)
        var professional = data[0].isProfessional ? true : false
        return professional
    })
}
