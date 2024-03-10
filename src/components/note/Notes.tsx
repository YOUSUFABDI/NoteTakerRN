import React, { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import useNote from "../../context/NoteContex"
import { CreateNoteDT, CreatingNoteDT } from "../../lib/types"
import { getCurrentDate } from "../../lib/utils"
import Note from "./Note"

const Notes = () => {
  const [inputValues, setInputValues] = useState<CreateNoteDT>({
    title: "",
    description: "",
  })
  const [modalVisible, setModalVisible] = useState(false)

  const { createNote, loading } = useNote()

  const handleOnchange = (fieldName: keyof CreateNoteDT, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }))
  }

  const handleCreateNote = () => {
    if (!inputValues.title || !inputValues.description) {
      return Alert.alert("Error", "Please fill all inputs.", [{ text: "OK" }])
    }

    const note: CreatingNoteDT = {
      title: inputValues.title,
      description: inputValues.description,
      created_dt: getCurrentDate(),
    }

    setInputValues({
      title: "",
      description: "",
    })

    setModalVisible(false)

    createNote(note)
  }

  return (
    <View style={styles.containter}>
      <TouchableOpacity
        style={styles.createNoteBtn}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          Create new note
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 12,
          height: "100%",
        }}
      >
        <Note />
      </View>

      {/* create note modal */}
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
                    value={inputValues.title}
                    onChangeText={(text) => handleOnchange("title", text)}
                  />
                </View>

                <View style={styles.inputContainerPass}>
                  <Text style={styles.inputTitle}>Description</Text>
                  <TextInput
                    placeholder="Description."
                    style={styles.input}
                    placeholderTextColor="#B8B8B8"
                    multiline={true}
                    value={inputValues.description}
                    onChangeText={(text) => handleOnchange("description", text)}
                  />
                </View>

                <TouchableOpacity
                  style={styles.signInBtn}
                  onPress={handleCreateNote}
                >
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.signInBtnTxt}>Create</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {/* create note modal */}
    </View>
  )
}

export default Notes

const styles = StyleSheet.create({
  containter: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    backgroundColor: "white",
  },
  createNoteBtn: {
    backgroundColor: "#54408C",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
  },

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
