import React, { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { ForgotPassEmailDT, RouterPropsDT } from "../../lib/types"
import axios from "axios"
import { BASE_API_URL } from "../../lib/baseApiUrl"

const ForgotPassword = ({ navigation }: RouterPropsDT) => {
  const [email, setEmail] = useState<ForgotPassEmailDT>({
    email: "",
  })
  const [loading, setLoading] = useState(false)

  const handleOnchange = (
    fieldName: keyof ForgotPassEmailDT,
    value: string
  ) => {
    setEmail((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }))
  }

  const handleForgotPassword = async () => {
    const requestDT = {
      gmail: email.email,
    }

    setLoading(true)
    try {
      const response = await axios.post(
        `${BASE_API_URL}/forgot_password`,
        requestDT,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await response.data
      if (data.status === "success") {
        const gmail = email.email
        navigation.navigate("ForgotPasswordOTPScreen", { gmail })
      } else {
        Alert.alert("Error", data.message, [{ text: "OK" }])
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: "column",
        gap: 24,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View style={styles.top}>
        <Text style={styles.resetTxt}>Reset Password</Text>
        <Text style={{ color: "#A6A6A6" }}>
          Please enter your email, we will send verification code to your email.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Email</Text>
        <TextInput
          placeholder="example@email.com"
          style={styles.input}
          placeholderTextColor="#B8B8B8"
          autoCapitalize="none"
          value={email.email}
          onChangeText={(text) => handleOnchange("email", text)}
        />
      </View>

      <TouchableOpacity style={styles.sendBtn} onPress={handleForgotPassword}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.sendBtnTxt}>Send</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  top: {
    flexDirection: "column",
    gap: 8,
  },
  resetTxt: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  inputTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#FAFAFA",
    color: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  sendBtn: {
    backgroundColor: "#54408C",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 48,
  },
  sendBtnTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
})
