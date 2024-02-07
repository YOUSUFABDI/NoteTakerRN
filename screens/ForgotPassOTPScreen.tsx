import React from "react"
import { SafeAreaView } from "react-native"
import ForgotPassOTP from "../components/forgotPassword/ForgotPassOTP"
import { RouterPropsDT } from "../lib/types"

const ForgotPassOTPScreen = ({ navigation }: RouterPropsDT) => {
  return (
    <SafeAreaView>
      <ForgotPassOTP navigation={navigation} />
    </SafeAreaView>
  )
}

export default ForgotPassOTPScreen
