import React from "react"
import { SafeAreaView, Text } from "react-native"
import Profile from "../components/profile/Profile"
import { RouterPropsDT } from "../lib/types"

const ProfileScreen = ({ navigation }: RouterPropsDT) => {
  return (
    <SafeAreaView>
      <Profile navigation={navigation} />
    </SafeAreaView>
  )
}

export default ProfileScreen
