import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box } from "native-base";
import { theme } from './src/theme';
import { Routes } from './src/routes';
import { useFonts, Poppins_500Medium, Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';
import { UserContextProvider } from './src/context/UserContext'

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>

      <StatusBar style="dark" />
    </NativeBaseProvider>
  );
}
