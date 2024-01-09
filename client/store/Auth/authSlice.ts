import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_API_URL } from '../../lib/baseApiUrl'
import { router } from 'expo-router'
import { Alert } from 'react-native'

type InitialStateType = {
  isLoading: boolean
  error: string
  username: string
  gmail: string
  isLoggedIn: boolean
}

type RegisterUserData = {
  full_name: string
  age: string
  phone_number: string
  address: string
  username: string
  gmail: string
  password: string
}

type OTPDataType = {
  gmail: string
  otp_code: number
}

type LoginDataType = {
  username: string
  password: string
}

const initialState: InitialStateType = {
  isLoading: false,
  error: '',
  username: '',
  gmail: '',
  isLoggedIn: false,
}

export const registerUser = createAsyncThunk(
  'registerUser',
  async (userData: RegisterUserData, { dispatch }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.data

      if (data.message === 'success') {
        const username = data.username
        // await AsyncStorage.setItem('username', username)
        // dispatch(setUsername(username))

        const gmail = userData.gmail
        await AsyncStorage.setItem('gmail', gmail)
        dispatch(setGmail(gmail))

        router.push('/otp/')
      }
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
)

export const verifyRegisterGmailOTP = createAsyncThunk(
  'verifyRegisterGmailOTP',
  async (OTPData: OTPDataType) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/verify_otp`, OTPData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = response.data
      if (data.status === 'success') {
        router.push('/signIn/')
      }
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
)

export const loginUser = createAsyncThunk(
  'loginUser',
  async (loginData: LoginDataType) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/login`, loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.data
      if (data.status === 'success') {
        await AsyncStorage.setItem('logedInUsername', loginData.username)
        await AsyncStorage.setItem('isLoggedIn', 'true')
        router.push('/(tabs)/profile')
      }
    } catch (error: any) {
      if (error.response && error.response.status) {
        console.log(error.response.data)
        Alert.alert('Error', error.response.data.message, [{ text: 'OK' }])
      } else {
        console.log(error.message)
      }
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setGmail: (state, action: PayloadAction<string>) => {
      state.gmail = action.payload
    },
    logout: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
      AsyncStorage.removeItem('isLoggedIn')
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Something went wrong!'
      })
      // cases for verifying register gmail
      .addCase(verifyRegisterGmailOTP.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyRegisterGmailOTP.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(verifyRegisterGmailOTP.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Invalid OTP'
      })
      // cases for login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false
        state.isLoggedIn = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isLoggedIn = false
        state.error = action.error.message || 'Wrong username or password.'
      })
  },
})

export const { setUsername, setGmail, logout } = authSlice.actions
export default authSlice.reducer
