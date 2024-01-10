import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

type LogInUserNotesDataType = {
  id: number
  user_id: number
  title: string
  description: string
  createdDT: number
  updatedDT: number
}

const Home = () => {
  const loggedInUserInfo = useSelector(
    (state: RootState) => state.auth.logedInUserInfo
  )
  const logedInUserNotes = useSelector(
    (state: RootState) => state.auth.logedInUserNotes
  )

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.hiTxt}>Hi {loggedInUserInfo?.username} 👋</Text>
      <TouchableOpacity style={styles.addNewNote}>
        <Text style={styles.addNewNoteTxt}>Add new note</Text>
      </TouchableOpacity>
      <ScrollView style={styles.notesWrapper}>
        {logedInUserNotes.map((note: any) => {
          return (
            <View style={styles.noteContainer} key={note.id}>
              <View>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <ScrollView style={styles.noteDescriptionContainer}>
                  <Text style={styles.noteDescription}>{note.description}</Text>
                </ScrollView>
              </View>
              <View style={styles.noteBottom}>
                <Text>Created At: {note.createdDT}</Text>
                <TouchableOpacity>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </ScrollView>
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
    paddingTop: 20,
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
