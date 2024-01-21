import React from "react"
import { SafeAreaView, StyleSheet, View } from "react-native"
import Home from "../components/home/Home"
import Footer from "../components/home/Footer"
import { RouterPropsDT } from "../lib/types"

const HomeScreen = ({ navigation }: RouterPropsDT) => {
  return (
    <SafeAreaView style={{ position: "relative" }}>
      <Home />
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
