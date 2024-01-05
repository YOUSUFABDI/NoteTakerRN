import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_API_URL } from '../lib/baseApiUrl'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type LoggedInUserInfoDataType = {
  full_name: string
  age: number
  phone_number: number
  username: string
  email: string
  address: string
}

const FetchLoggedInUserInfo = () => {
  const [loggedInUserInfo, setLoggedInUserInfo] =
    useState<LoggedInUserInfoDataType>()

  useEffect(() => {
    const fetchCurrentLoggedInUserInfo = async () => {
      const username = await AsyncStorage.getItem('logedInUsername')
      console.log('in the hook', username)

      const getUserData = {
        username: username,
      }

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
        console.log('in hook func', data)
      } catch (error: any) {
        if (error.response && error.response.status) {
          console.log(error.response.data)
          if (error.response.status === 'error') {
            Alert.alert('Error', error.response.data.message, [{ text: 'OK' }])
          }
        } else {
          console.log(error.message)
        }
      }
    }
    fetchCurrentLoggedInUserInfo()
  }, [])

  return { loggedInUserInfo }
}

export default FetchLoggedInUserInfo
