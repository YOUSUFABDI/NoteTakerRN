import React, { useEffect, useState } from "react"
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import useNote from "../../context/NoteContex"
import Skeleton from "../../layout/Skeleton"
import { UpdateNoteDT, UpdatingNoteDT } from "../../lib/types"
import { timeAgo } from "../../lib/utils"

const Note = () => {
  const [note, setNote] = useState<UpdateNoteDT>({
    title: "",
    description: "",
    id: "",
  })
  const [modalVisible, setModalVisible] = useState(false)

  const { notes, loading, getNotes, deleteNote, updateNote } = useNote()

  const handleOnchange = (fieldName: keyof UpdateNoteDT, value: string) => {
    setNote((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }))
  }

  useEffect(() => {
    getNotes()
  }, [])

  const handleUpdateNote = (id: string) => {
    setModalVisible(true)

    const selectedNote = notes.find((note) => note.noteId === id)
    setNote({
      title: selectedNote?.title,
      description: selectedNote?.description,
      id: selectedNote?.noteId,
    })
  }

  const handleUpdateBtn = () => {
    if (!note.title || !note.description) {
      return Alert.alert("Error", "Please fill all inputs.", [{ text: "OK" }])
    }

    const updatingNote: UpdatingNoteDT = {
      title: note.title,
      description: note.description,
      id: note.id,
    }

    updateNote(updatingNote)

    setModalVisible(false)
    setNote({
      title: "",
      description: "",
      id: "",
    })
  }

  return (
    <ScrollView
      style={styles.notesWrapper}
      showsVerticalScrollIndicator={false}
    >
      {loading
        ? [0, 1, 2, 3, 4, 5, 6, 7].map((el, idx) => (
            <Skeleton key={`${el}:${idx}`} />
          ))
        : Array.isArray(notes) &&
          notes.length > 0 &&
          notes.map((note, index) => {
            return (
              <TouchableOpacity
                style={styles.noteContainer}
                key={index}
                onPress={() => {
                  handleUpdateNote(note.noteId)
                }}
              >
                <View>
                  <Text style={styles.noteTitle}>{note.title}</Text>
                  <ScrollView style={styles.noteDescriptionContainer}>
                    <Text style={styles.noteDescription}>
                      {note.description}
                    </Text>
                  </ScrollView>
                </View>
                <View style={styles.noteBottom}>
                  <Text>{note.created_dt}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      deleteNote(note.noteId)
                    }}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )
          })}

      {/* update note modal */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.")
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 33,
                  right: 40,
                  zIndex: 999,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}
              >
                <Text
                  style={{ color: "#54408C", fontWeight: "bold", fontSize: 16 }}
                >
                  Close
                </Text>
              </TouchableOpacity>
              <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Title</Text>
                  <TextInput
                    placeholder="Title."
                    style={styles.input}
                    placeholderTextColor="#B8B8B8"
                    value={note.title}
                    onChangeText={(text) => handleOnchange("title", text)}
                  />
                </View>

                <View style={styles.inputContainerPass}>
                  <Text style={styles.inputTitle}>Description</Text>
                  <TextInput
                    placeholder="Description."
                    style={styles.input}
                    placeholderTextColor="#B8B8B8"
                    value={note.description}
                    onChangeText={(text) => handleOnchange("description", text)}
                  />
                </View>

                <TouchableOpacity
                  style={styles.signInBtn}
                  onPress={handleUpdateBtn}
                >
                  <Text style={styles.signInBtnTxt}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {/* update note modal */}
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

  // modal

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginHorizontal: 20,
  },
  modalView: {
    position: "relative",
    margin: 20,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: "100%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  inputContainerPass: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  forgotPass: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#54408C",
  },
  input: {
    backgroundColor: "#FAFAFA",
    color: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  signInBtns: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  signInBtn: {
    backgroundColor: "#54408C",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 48,
  },
  signInBtnTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
})
