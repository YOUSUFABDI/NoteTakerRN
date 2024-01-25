import React from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { NoteProps } from "../../lib/types"

const Note = ({ isLoading, notes, deleteNote }: NoteProps) => {
  return (
    <ScrollView
      style={styles.notesWrapper}
      showsVerticalScrollIndicator={false}
    >
      {isLoading && <Text>Loading...</Text>}
      {Array.isArray(notes) &&
        notes.length > 0 &&
        notes.map((note, index) => {
          return (
            <TouchableOpacity
              style={styles.noteContainer}
              key={index}
              onPress={() => {}}
            >
              <View>
                <Text style={styles.noteTitle}>{note.title}</Text>
                <ScrollView style={styles.noteDescriptionContainer}>
                  <Text style={styles.noteDescription}>{note.description}</Text>
                </ScrollView>
              </View>
              <View style={styles.noteBottom}>
                <Text>{note.createdDT}</Text>
                <TouchableOpacity
                  onPress={() => {
                    deleteNote(note.id)
                  }}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        })}
    </ScrollView>
  )
}

export default Note

const styles = StyleSheet.create({
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
