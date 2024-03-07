import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen"
import NotesScreen from "../screens/NotesScreen"
import { TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Profile from "../components/profile/Profile"
import MyAccount from "../components/profile/MyAccount"
import { useNavigation } from "@react-navigation/native"
import { useActiveLink } from "../context/ActiveLinkContext"

const InsideStack = createNativeStackNavigator()

const InsideStackLayout = () => {
  const { setActiveLink } = useActiveLink()

  const navigation: any = useNavigation()

  const handleGoBack = () => {
    setActiveLink("Home")
    navigation.goBack()
  }

  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
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
        name="ProfileScreen"
        component={Profile}
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
        name="MyAccountScreen"
        component={MyAccount}
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

export default InsideStackLayout
