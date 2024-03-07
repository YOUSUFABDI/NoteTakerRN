import { SafeAreaView } from "react-native"
import Login from "../components/Login/Login"
import { RouterPropsDT } from "../lib/types"

const LoginScreen = ({ navigation }: RouterPropsDT) => {
  return (
    <SafeAreaView>
      <Login navigation={navigation} />
    </SafeAreaView>
  )
}

export default LoginScreen
