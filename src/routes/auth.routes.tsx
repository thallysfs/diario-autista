import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FirstAccess } from '../screens/FirstAccess';
import { Register } from '../screens/Register';
import { Confirm } from '../screens/Confirm'



const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="SignIn"
                component={FirstAccess}
            />
            <Screen
                name="Register"
                component={Register}
            />            
            <Screen
                name="Confirm"
                component={Confirm}
            />
        </Navigator>
    )
}
