import { createNativeStackNavigator } from "@react-navigation/native-stack"
import GetStartScreen from "../screens/GetStartScreen"
import LoginScreen from "../screens/LoginScreen"
import SignupScreen from "../screens/SignupScreen"

const OutsideStack = createNativeStackNavigator()

const OutsideStackLayout = () => {
  return (
    <OutsideStack.Navigator>
      <OutsideStack.Screen
        name="getStartScreen"
        component={GetStartScreen}
        options={{
          headerShown: false,
        }}
      />
      <OutsideStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <OutsideStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </OutsideStack.Navigator>
  )
}

export default OutsideStackLayout
