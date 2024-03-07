import React, { useEffect } from "react"
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import useAuth from "../../context/AuthContext"
import { RouterPropsDT } from "../../lib/types"

const Home = ({ navigation }: RouterPropsDT) => {
  const { user, loading, getUser } = useAuth()

  useEffect(() => {
    getUser()
  }, [])

  return (
    <View style={styles.homeContainer}>
      {loading ? (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color="#7D64C3" />
        </View>
      ) : (
        <>
          <Text style={styles.hiTxt}>Hi {user?.username} 👋</Text>

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
        </>
      )}
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
