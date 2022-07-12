import { extendTheme } from "native-base";
import { useFonts, Poppins_500Medium, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'

export const theme = extendTheme({
      colors: {
        // Add new color
        primary: {
          50: '#F9F7AE',
        },
        // Redefinig only one shade, rest of the color will remain same.
        secondary: {
          50: '#d97706',
          100: '#E5E5E5',
          200: '#E0E9F1'
        },
          tertiary: {
            50: '#3F5BA7',
            100: '#000000',
            200: '#DA0F10',
            300: '#4FA6CD',
            400: '#363F5F'
        }
      },
      fontConfig: {
        Poppins: {
          400: {
            normal: 'Poppins_400Regular'
          },
          500: {
            normal: 'Poppins_500Medium'
          },
          600: {
            normal: 'Poppins_600SemiBold'
          }
        }
      },
      fonts: {
        heading:  'Poppins',
        body:     'Poppins',
        mono:     'Poppins',
      }
    });
  
  