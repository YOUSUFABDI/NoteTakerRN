import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Congratulation = () => {
  return (
    <View style={styles.congratulationContainer}>
      <View>
        <Image source={require("../../assets/images/Congratulation.png")} />
      </View>
      <View style={styles.congratulationContainerTop}>
        <Text style={styles.congratulationTxt}>Congratulation!</Text>
        <Text style={styles.congratulationPargraph}>
          your account is complete, please login to start storing notes.
        </Text>
      </View>
      <View style={styles.congratulationBottom}>
        <TouchableOpacity style={styles.signInBtn} onPress={() => {}}>
          <Text style={styles.signInBtnTxt}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Congratulation

const styles = StyleSheet.create({
  congratulationContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    height: "100%",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  congratulationContainerTop: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
  },
  congratulationTxt: {
    fontSize: 24,
    fontWeight: "bold",
  },
  congratulationPargraph: {
    color: "#A6A6A6",
    fontSize: 16,
    textAlign: "center",
  },
  congratulationBottom: {
    width: "100%",
  },
  signInBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#54408C",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 48,
  },
  signInBtnTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})
