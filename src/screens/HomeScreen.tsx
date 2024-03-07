import React from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"
import Home from "../components/Home/Home"
import Footer from "../components/Home/Footer"
import { RouterPropsDT } from "../lib/types"

const HomeScreen = ({ navigation }: RouterPropsDT) => {
  return (
    <SafeAreaView style={{ position: "relative" }}>
      <Home navigation={navigation} />
      <View style={styles.footer}>
        <Footer navigation={navigation} />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 12,
    right: 12,
  },
})
