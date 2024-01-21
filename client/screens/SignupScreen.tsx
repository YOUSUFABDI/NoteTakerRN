import React from "react"
import { SafeAreaView } from "react-native"
import Signup from "../components/register/Signup"
import { RouterPropsDT } from "../lib/types"

const SignupScreen = ({ navigation }: RouterPropsDT) => {
  return (
    <SafeAreaView>
      <Signup navigation={navigation} />
    </SafeAreaView>
  )
}

export default SignupScreen
