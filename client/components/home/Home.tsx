import React from "react"
import { StyleSheet, Text, View } from "react-native"
import FetchLoggedUser from "../../hooks/FetchLoggedUser"
import FetchLoggedInUserNotes from "../../hooks/FetchLoggedInUserNotes"
import Note from "../note/Note"

const Home = () => {
  const { loggedInUserInfo } = FetchLoggedUser()
  const { notes } = FetchLoggedInUserNotes()

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.hiTxt}>Hi {loggedInUserInfo?.username} 👋</Text>

      <Note notes={notes} />
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
  addNewNote: {
    marginTop: 20,
    backgroundColor: "#54408C",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addNewNoteTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  notesWrapper: {
    flexDirection: "column",
    width: "100%",
    gap: 15,
    flex: 1,
    maxHeight: "87%",
  },
  noteContainer: {
    position: "relative",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#FAF9FD",
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: "#7D64C3",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  noteDescriptionContainer: {
    maxHeight: 100,
  },
  noteDescription: {
    fontSize: 16,
    color: "#000",
    paddingVertical: 8,
  },
  noteBottom: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  deleteButtonText: {
    color: "#EF5A56",
    fontWeight: "bold",
  },
})
