import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box } from "native-base";
import { theme } from './src/theme';
import { Routes } from './src/routes';
import { useFonts, Poppins_500Medium, Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';
import { UserContextProvider } from './src/context/UserContext'
import * as SplashScreen from 'expo-splash-screen'


export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // useEffect(()=>{
  //   // Hides native splash screen after 2s
  //   setTimeout(async () => {
  //     await SplashScreen.hideAsync();
  //   }, 2000)
  // },[])

  return (
    <NativeBaseProvider theme={theme}>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>

      <StatusBar style="dark" />
    </NativeBaseProvider>
  );
}
