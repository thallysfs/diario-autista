import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Icon } from 'native-base';

//meu contexto que possui o estado das questions
import { QuestionContextProvider } from '../context/QuestionsContext'


import { Header } from '../components/Header';

// Telas para navegar
import { Home } from '../screens/Home';
import { Diary } from '../screens/Diary';
import { Skills } from '../screens/Skills';
import { Assessment } from '../screens/Assessment';
import { EndSkill } from '../screens/EndSkill';
import { Account } from '../screens/Account';
import { Records } from '../screens/Records';


const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){

    //Aqui estão as telas de navegação via Tab navigator

    return(
        <QuestionContextProvider>         
            <Navigator
            //estilizando a tab
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "tertiary.200",
                    tabBarInactiveTintColor: "tertiary.300",
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height: 68,
                        paddingVertical: Platform.OS === 'ios' ? 20 : 0
                    }
                }}
            >
                {/* Telas abaixo: */}
                <Screen 
                    name="Home"
                    component={Home}
                    //essa desestruturação de size e color é para pegar dinamicamente a cor para o ícone.
                    // se selecionado é uma cor, senão outra. Se eu definir uma cor, ela ficará fixa independente da seleção
                    options={{
                        tabBarLabel:'Home',
                        tabBarLabelPosition: 'below-icon',
                        tabBarShowLabel: true,
                        tabBarIcon: ({ color }) => (
                            <Icon 
                                as={Feather}
                                name="list"
                                size={35}
                                color={color}
                            />)
                        
                    }}
                />        
                <Screen 
                    name="Diário"
                    component={Diary}
                    options={{
                        tabBarLabelPosition: 'below-icon',
                        tabBarShowLabel: true,
                        tabBarIcon: ({ size, color }) => 
                        <Icon 
                            as={Feather}
                            name="edit"
                            size={35}
                            color={color}
                        />,
                        tabBarLabel:'Diário'
                        
                    }}
                />              
                <Screen 
                    name="Habilidades"
                    component={Skills}
                    options={{
                        tabBarLabelPosition: 'below-icon',
                        tabBarShowLabel: true,
                        tabBarIcon: ({ size, color }) => 
                        <Icon 
                            as={Feather}
                            name="trending-up"
                            size={35}
                            color={color}
                        />,
                        tabBarLabel:'Habilidades'
                    }}
                />            
                <Screen 
                    name="Avaliações"
                    component={Assessment}
                    options={{
                        tabBarLabelPosition: 'below-icon',
                        tabBarShowLabel: true,
                        tabBarIcon: ({ size, color }) => 
                        <Icon 
                            as={Feather}
                            name="pie-chart"
                            size={35}
                            color={color}
                        />,
                        tabBarLabel:'Avaliações'
                        
                    }}
                />

                {/* Essas telas não aparece no tabBar, serve apenas para navegar na rota */}
                <Screen 
                    name='FimTeste'
                    component={EndSkill}
                    options={{ tabBarButton: () => null }}
                />
                <Screen 
                    name='Conta'
                    component={Account}
                    options={{ tabBarButton: () => null }}
                />
                                <Screen 
                    name='Cadastros'
                    component={Records}
                    options={{ tabBarButton: () => null }}
                />
            </Navigator>
        </QuestionContextProvider>
    )
}
