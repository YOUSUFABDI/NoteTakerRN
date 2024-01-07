import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_API_URL } from '../lib/baseApiUrl'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type LoggedInUserInfoDataType = {
  full_name: string
  age: number
  phone_number: string
  username: string
  gmail: string
  address: string
}

const FetchLoggedInUserInfo = () => {
  const [loggedInUserInfo, setLoggedInUserInfo] =
    useState<LoggedInUserInfoDataType>()
  const [isLoading, setIsLoading] = useState<boolean>()

  useEffect(() => {
    const fetchCurrentLoggedInUserInfo = async () => {
      const username = await AsyncStorage.getItem('logedInUsername')

      const getUserData = {
        username: username,
      }

      setIsLoading(true)
      try {
        const response = await axios.post(
          `${BASE_API_URL}/get_user`,
          getUserData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.data
        setLoggedInUserInfo(data.user)
      } catch (error: any) {
        if (error.response && error.response.status) {
          console.log(error.response.data)
          if (error.response.status === 'error') {
            Alert.alert('Error', error.response.data.message, [{ text: 'OK' }])
          }
        } else {
          console.log(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchCurrentLoggedInUserInfo()
  }, [])

  return { loggedInUserInfo, isLoading }
}

export default FetchLoggedInUserInfo
