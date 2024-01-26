import { useEffect, useState } from "react"
import { Alert } from "react-native"
import axios from "axios"
import { BASE_API_URL } from "../lib/baseApiUrl"
import { CreatingNoteDT, NoteDT, UpdatingNoteDT } from "../lib/types"
import AsyncStorage from "@react-native-async-storage/async-storage"

const UseNote = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState<NoteDT[]>([])

  const fetchNotes = async () => {
    const currentLoggedInUsername = await AsyncStorage.getItem("username")
    if (!currentLoggedInUsername) {
      return Alert.alert("Error", "You are not logged in.", [{ text: "OK" }])
    }

    const requestData = {
      username: currentLoggedInUsername,
    }

    setIsLoading(true)
    try {
      const response = await axios.post(
        `${BASE_API_URL}/get_notes`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await response.data
      if (data.status === "success") {
        setNotes(data.message)
      }
    } catch (error: any) {
      if (error.response && error.response.status) {
        console.log(error.response.data)
        if (error.response.status === "error") {
          Alert.alert("Error", error.response.data.message, [{ text: "OK" }])
        }
      } else {
        console.log(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const createNote = async (note: CreatingNoteDT) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/create_note`, note, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.data
      if (data.status === "success") {
        fetchNotes()
      }
    } catch (error: any) {
      if (error.response && error.response.status) {
        console.log(error.response.data)
        if (error.response.status === "error") {
          Alert.alert("Error", error.response.data.message, [{ text: "OK" }])
        }
      } else {
        console.log(error.message)
      }
    }
  }

  const deleteNote = async (noteId: number) => {
    try {
      const response = await axios.delete(
        `${BASE_API_URL}/delete_note/${noteId}`
      )
      const data = await response.data
      if (data.status === "success") {
        Alert.alert(data.message, "🎇🎇🎇")
        fetchNotes()
      }
    } catch (error: any) {
      if (error.response && error.response.status) {
        console.log(error.response.data)
        if (error.response.status === "error") {
          Alert.alert("Error", error.response.data.message, [{ text: "OK" }])
        }
      } else {
        console.log(error.message)
      }
    }
  }

  const updateNote = async (updatingNote: UpdatingNoteDT) => {
    const note = {
      title: updatingNote.title,
      description: updatingNote.description,
      updated_dt: updatingNote.updated_dt,
    }

    try {
      const response = await axios.put(
        `${BASE_API_URL}/update_note/${updatingNote.id}`,
        note,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await response.data
      if (data.status === "success") {
        Alert.alert(data.message)
        fetchNotes()
      }
    } catch (error: any) {
      if (error.response && error.response.status) {
        console.log(error.response.data)
        if (error.response.status === "error") {
          Alert.alert("Error", error.response.data.message, [{ text: "OK" }])
        }
      } else {
        console.log(error.message)
      }
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return { fetchNotes, notes, isLoading, createNote, deleteNote, updateNote }
}

export default UseNote
