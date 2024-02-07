import { useRoute } from "@react-navigation/native"
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
import { ChangePassDT, ForgotPassOTPDT, RouterPropsDT } from "../../lib/types"
import { BASE_API_URL } from "../../lib/baseApiUrl"
import axios from "axios"

const ChangePassword = ({ navigation }: RouterPropsDT) => {
  const [values, setValues] = useState<ChangePassDT>({
    newPassword: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)

  const handleOnchange = (fieldName: keyof ChangePassDT, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }))
  }

  const route = useRoute()
  const { gmail } = route.params as ForgotPassOTPDT

  const handleChangePassword = async () => {
    if (!values.newPassword || !values.confirmPassword) {
      return Alert.alert("Error", "Please fill all inputs.", [{ text: "OK" }])
    }

    if (values.newPassword !== values.confirmPassword) {
      return Alert.alert("Error", "Passwords do not match.", [{ text: "OK" }])
    }

    const requestDT = {
      gmail: gmail,
      new_password: values.newPassword,
    }

    setLoading(true)
    try {
      const response = await axios.post(
        `${BASE_API_URL}/reset_password`,
        requestDT,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await response.data
      if (data.status === "success") {
        navigation.navigate("Login")
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
        <Text style={styles.resetTxt}>New Password</Text>
        <Text style={{ color: "#A6A6A6" }}>
          Create your new password, so you can login to your account.
        </Text>
      </View>

      <View style={{ flexDirection: "column", gap: 16 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>New Password</Text>
          <TextInput
            placeholder="Your password"
            style={styles.input}
            placeholderTextColor="#B8B8B8"
            autoCapitalize="none"
            value={values.newPassword}
            onChangeText={(text) => handleOnchange("newPassword", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Confirm Password</Text>
          <TextInput
            placeholder="Your password"
            style={styles.input}
            placeholderTextColor="#B8B8B8"
            autoCapitalize="none"
            value={values.confirmPassword}
            onChangeText={(text) => handleOnchange("confirmPassword", text)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.sendBtn} onPress={handleChangePassword}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.sendBtnTxt}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default ChangePassword

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
