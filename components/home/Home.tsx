import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FetchLoggedUser from "../../hooks/FetchLoggedUser"
import { RouterPropsDT } from "../../lib/types"

const Home = ({ navigation }: RouterPropsDT) => {
  const { loggedInUserInfo } = FetchLoggedUser()

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.hiTxt}>Hi {loggedInUserInfo?.username} 👋</Text>

      <View style={styles.middleContainer}>
        <Image
          source={require("../../assets/start.png")}
          style={{ objectFit: "contain" }}
        />
        <TouchableOpacity
          style={styles.addNewNote}
          onPress={() => navigation.navigate("NotesScreen")}
        >
          <Text style={styles.addNewNoteTxt}>Start making your notes</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  homeContainer: {
    height: "100%",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  hiTxt: {
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 12,
  },
  middleContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "75%",
    gap: 10,
  },
  addNewNote: {
    marginTop: 20,
    backgroundColor: "#54408C",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  addNewNoteTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})
