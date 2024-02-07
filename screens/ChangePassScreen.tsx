import React from "react"
import { SafeAreaView } from "react-native"
import ChangePassword from "../components/forgotPassword/ChangePassword"
import { RouterPropsDT } from "../lib/types"

const ChangePassScreen = ({ navigation }: RouterPropsDT) => {
  return (
    <SafeAreaView>
      <ChangePassword navigation={navigation} />
    </SafeAreaView>
  )
}

export default ChangePassScreen
