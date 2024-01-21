import { useEffect, useState } from "react"
import { Alert } from "react-native"
import axios from "axios"
import { BASE_API_URL } from "../lib/baseApiUrl"
import { NoteDT } from "../lib/types"
import AsyncStorage from "@react-native-async-storage/async-storage"

const FetchLoggedInUserNotes = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [notes, setNotes] = useState<NoteDT[]>([])

  const fetchNotes = async () => {
    const currentLoggedInUsername = await AsyncStorage.getItem("username")
    if (!currentLoggedInUsername) {
      return Alert.alert("Error", "You are not logged in.", [{ text: "OK" }])
    }
    console.log("currentLoggedInUsername: ", currentLoggedInUsername)

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
      console.log("data: " + JSON.stringify(data))
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

  useEffect(() => {
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
        console.log("data: " + JSON.stringify(data))
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
    fetchNotes()
  }, [])

  return { fetchNotes, notes, isLoading }
}

export default FetchLoggedInUserNotes
