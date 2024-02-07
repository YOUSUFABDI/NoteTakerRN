import React from "react"
import { SafeAreaView } from "react-native"
import { RouterPropsDT } from "../lib/types"
import ForgotPassword from "../components/forgotPassword/ForgotPassword"

const ForgotPasswordScreen = ({ navigation }: RouterPropsDT) => {
  return (
    <SafeAreaView>
      <ForgotPassword navigation={navigation} />
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen
