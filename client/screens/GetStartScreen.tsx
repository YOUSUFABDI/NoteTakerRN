import React from "react"
import { SafeAreaView, Text, View } from "react-native"
import GetStart from "../components/GetStart"
import { RouterPropsDT } from "../lib/types"

const GetStartScreen = ({ navigation }: RouterPropsDT) => {
  return (
    <SafeAreaView>
      <GetStart navigation={navigation} />
    </SafeAreaView>
  )
}

export default GetStartScreen
