import React from "react"
import { StyleSheet, Text, View } from "react-native"

const Header = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
})
