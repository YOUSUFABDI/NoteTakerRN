import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="register/index"
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen
          name="signIn/index"
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen
          name="otp/index"
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen
          name="congratulation/index"
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen
          name="home/index"
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  )
}
