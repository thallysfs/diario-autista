import { useContext } from 'react'

import { UserContext } from '../context/UserContext'

export function useUser(){

  //criando o contexto para armazenar os dados do login
  const context = useContext(UserContext)

  return context;
}
