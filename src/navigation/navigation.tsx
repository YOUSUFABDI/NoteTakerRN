import { createNativeStackNavigator } from "@react-navigation/native-stack"
import useAuth from "../context/AuthContext"
import InsideStackLayout from "./InsideStackLayout"
import OutsideStackLayout from "./OutsideStackLayout"

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
  const { isLoggedIn } = useAuth()

  return (
    <Stack.Navigator initialRouteName="getStartScreen">
      {isLoggedIn ? (
        <Stack.Screen
          name="InsideStack"
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

export default MainNavigator
