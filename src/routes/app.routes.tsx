import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Icon } from 'native-base';

//meu contexto que possui o estado das questions
import { QuestionContextProvider } from '../context/QuestionsContext'


// Telas para navegar
import { Home } from '../screens/Home';
import { Diary } from '../screens/Diary';
import { Skills } from '../screens/Skills';
import { Graphic } from '../screens/Graphic';
import { Header } from '../components/Header';


const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){

    //Aqui estão as telas de navegação via Tab navigator

    return(
        <QuestionContextProvider>
            <Header avatar='http://github.com/thallysfs.png' name='Thallys'/> 
            
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
                        tabBarIcon: (({ size, color }) => 
                            <Icon 
                                as={Feather}
                                name="list"
                                size={45}
                                color={color}
                            />
                        )
                    }}
                />        
                <Screen 
                    name="Diário"
                    component={Diary}
                    options={{
                        tabBarIcon: (({ size, color }) => 
                        <Icon 
                            as={Feather}
                            name="edit"
                            size={45}
                            color={color}
                        />
                        )
                    }}
                />              
                <Screen 
                    name="Habilidades"
                    component={Skills}
                    options={{
                        tabBarIcon: (({ size, color }) => 
                        <Icon 
                            as={Feather}
                            name="trending-up"
                            size={45}
                            color={color}
                        />
                        )
                    }}
                />            
                <Screen 
                    name="Gráfico"
                    component={Graphic}
                    options={{
                        tabBarIcon: (({ size, color }) => 
                        <Icon 
                            as={Feather}
                            name="pie-chart"
                            size={45}
                            color={color}
                        />
                        )
                    }}
                />
            </Navigator>
        </QuestionContextProvider>
    )
}
