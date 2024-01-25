import React from "react"
import { SafeAreaView, Text } from "react-native"
import SignIn from "../components/signIn/SignIn"
import { RouterPropsDT } from "../lib/types"

const LoginScreen = ({ navigation }: RouterPropsDT) => {
  return (
    <SafeAreaView>
      <SignIn navigation={navigation} />
    </SafeAreaView>
  )
}

export default LoginScreen
