import axios from "axios"
import React, { createContext, useContext, useState } from "react"
import { BASE_API_URL } from "../lib/baseApiUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { LoginDT, OTPDT, SignupDT } from "../lib/types"

type AuthContextProps = {
  children: React.ReactNode
}

type AuthContextMethods = {
  signup: (userData: SignupDT) => void
  verifyRegisterGmailOTP: (OTPData: OTPDT) => void
  login: (loginData: LoginDT) => void
  logout: () => void
  isLoading: boolean
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextMethods | null>(null)

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [isLoading, setIsloading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigation: any = useNavigation()

  const signup = async (userData: SignupDT) => {
    setIsloading(true)
    try {
      const response = await axios.post(`${BASE_API_URL}/register`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.data
      if (data.message === "success") {
        const gmail = userData.gmail
        navigation.navigate("RegisterOTPScreen", { gmail })
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
      setIsloading(false)
    }
  }

  const verifyRegisterGmailOTP = async (OTPData: OTPDT) => {
    setIsloading(true)
    try {
      const response = await axios.post(`${BASE_API_URL}/verify_otp`, OTPData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = response.data
      if (data.status === "success") {
        navigation.navigate("Login")
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
      setIsloading(false)
    }
  }

  const login = async (loginData: LoginDT) => {
    setIsloading(true)
    try {
      const response = await axios.post(`${BASE_API_URL}/login`, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.data
      if (data.status === "success") {
        const username = data.username
        if (username) {
          await AsyncStorage.removeItem("username")
        } else {
          await AsyncStorage.setItem("username", loginData.username)
        }

        setIsLoggedIn(true)
        await AsyncStorage.setItem("isLoggedIn", "true")
      }
    } catch (error: any) {
      if (error.response && error.response.status) {
        console.log(error.response.data)
        Alert.alert("Error", error.response.data.message, [{ text: "OK" }])
      } else {
        console.log(error.message)
      }
    } finally {
      setIsloading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoggedIn(false)
      await AsyncStorage.setItem("isLoggedIn", "false")
    } catch (error: any) {
      console.error("Error during logout:", error.message)
    }
  }

  const values = {
    isLoading,
    signup,
    verifyRegisterGmailOTP,
    login,
    logout,
    isLoggedIn,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider")
  }
  return context
}
