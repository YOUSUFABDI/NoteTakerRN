import { useState, useEffect } from "react"
import { BASE_API_URL } from "../lib/baseApiUrl"
import axios from "axios"
import { GetUserDT, LoggedInUserInfoDT } from "../lib/types"
import AsyncStorage from "@react-native-async-storage/async-storage"

const FetchLoggedUser = () => {
  const [loggedInUserInfo, setLoggedInUserInfo] =
    useState<LoggedInUserInfoDT | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchLoggedUserInfo = async () => {
    setIsLoading(true)

    const currentUsername = await AsyncStorage.getItem("username")

    const getUserData: GetUserDT = {
      username: currentUsername,
    }

    try {
      const response = await axios.post(
        `${BASE_API_URL}/get_user`,
        getUserData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await response.data
      if (data.status === "success") {
        setLoggedInUserInfo(data.user)
      } else {
        throw new Error(data.message || "Failed to fetch user information")
      }
    } catch (error: any) {
      throw new Error(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLoggedUserInfo()
  }, [])

  return { isLoading, loggedInUserInfo, fetchLoggedUserInfo }
}

export default FetchLoggedUser
