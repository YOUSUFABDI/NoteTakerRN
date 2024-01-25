import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen"
import { NavigationContainer } from "@react-navigation/native"
import GetStartScreen from "./screens/GetStartScreen"
import SignupScreen from "./screens/SignupScreen"
import LoginScreen from "./screens/LoginScreen"
import { AuthContextProvider, useAuth } from "./context/Auth"
import RegisterOTPScreen from "./screens/RegisterOTPScreen"
import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import ProfileScreen from "./screens/ProfileScreen"
import NotesScreen from "./screens/NotesScreen"
import { ActiveLinkContextProvider } from "./context/ActiveLinkContext"
import { useActiveLink } from "./context/ActiveLinkContext"
import { useNavigation } from "@react-navigation/native"
import MyAccountScreen from "./screens/MyAccountScreen"

const Stack = createNativeStackNavigator()
const InsideStack = createNativeStackNavigator()
const OutsideStack = createNativeStackNavigator()

function InsideStackLayout() {
  const { setActiveLink } = useActiveLink()

  const navigation: any = useNavigation()

  const handleGoBack = () => {
    setActiveLink("Home")
    navigation.goBack()
  }

  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" component={HomeScreen} />
      <InsideStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: "Profile",
        })}
      />
      <InsideStack.Screen
        name="NotesScreen"
        component={NotesScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: "Notes",
        })}
      />
      <InsideStack.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: "My Account",
        })}
      />
    </InsideStack.Navigator>
  )
}

function OutsideStackLayout() {
  return (
    <OutsideStack.Navigator>
      <OutsideStack.Screen
        name="GetStart"
        component={GetStartScreen}
        options={{ headerShown: false }}
      />
      <OutsideStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <OutsideStack.Screen
        name="RegisterOTPScreen"
        component={RegisterOTPScreen}
        options={{ headerShown: false }}
      />
      <OutsideStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </OutsideStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <ActiveLinkContextProvider>
          <MainNavigator />
        </ActiveLinkContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  )
}

function MainNavigator() {
  const { isLoggedIn } = useAuth()

  return (
    <Stack.Navigator initialRouteName="GetStart">
      {isLoggedIn ? (
        <Stack.Screen
          name="Inside"
          component={InsideStackLayout}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="OutsideStack"
          component={OutsideStackLayout}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  )
}
