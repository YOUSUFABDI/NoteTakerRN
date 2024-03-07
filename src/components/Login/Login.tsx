import { Feather } from "@expo/vector-icons"
import React, { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import useAuth from "../../context/AuthContext"
import Label from "../../layout/Label"
import Title from "../../layout/Title"
import { LoginDT, RouterPropsDT } from "../../lib/types"
import { globalStyle } from "../../styles/globalStyles"

const Login = ({ navigation }: RouterPropsDT) => {
  const [loginInputValues, setLoginInputValues] = useState<LoginDT>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const { login, loading } = useAuth()

  const handleOnchange = (fieldName: keyof LoginDT, value: string) => {
    setLoginInputValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }))
    if (fieldName === "password") {
      setIsPasswordValid(value.length >= 7)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = () => {
    if (!loginInputValues.email || !loginInputValues.password) {
      return Alert.alert("Error", "Please fill all inputs.", [{ text: "OK" }])
    }

    login(loginInputValues)
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.signInContainer}>
        <View style={styles.signInTop}>
          <View style={styles.signInTitle}>
            <Title customStyle={{ fontSize: 24, fontWeight: "bold" }}>
              Welcome Back 👋
            </Title>
            <Title customStyle={{ color: "#A6A6A6", fontSize: 16 }}>
              Sign to your account
            </Title>
          </View>

          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <Label customStyle={{ fontSize: 14 }}>Email</Label>
              <TextInput
                placeholder="Your email."
                style={globalStyle.input}
                placeholderTextColor="#B8B8B8"
                autoCapitalize="none"
                value={loginInputValues.email}
                onChangeText={(text) => handleOnchange("email", text)}
              />
            </View>

            <View style={styles.inputContainerPass}>
              <Label customStyle={{ fontSize: 14 }}>Password</Label>
              <TextInput
                placeholder="Your password."
                style={[
                  globalStyle.input,
                  isPasswordFocused &&
                    !isPasswordValid &&
                    styles.invalidPasswordInput,
                ]}
                placeholderTextColor="#B8B8B8"
                autoCapitalize="none"
                value={loginInputValues.password}
                onChangeText={(text) => handleOnchange("password", text)}
                secureTextEntry={!showPassword}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 16, bottom: 13 }}
                onPress={toggleShowPassword}
              >
                <Feather
                  name={`${showPassword ? "eye" : "eye-off"}`}
                  size={18}
                  color="#B8B8B8"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.inputContainerPass}
              onPress={() => {}}
              // onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotPass}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signInBtns}>
            <TouchableOpacity style={styles.signInBtn} onPress={handleLogin}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.signInBtnTxt}>Login</Text>
              )}
            </TouchableOpacity>
            <View style={styles.haveAnAcc}>
              <Text style={styles.haveAnAccTxt}>Don’t have an account?</Text>
              <Button
                title="Sign Up"
                color="#54408C"
                onPress={() => navigation.navigate("SignupScreen")}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    height: "100%",
  },
  signInContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  signInTop: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  signInTitle: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
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
  forgotPass: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#54408C",
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
  haveAnAcc: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  haveAnAccTxt: {
    color: "#A6A6A6",
    fontSize: 16,
  },
  invalidPasswordInput: {
    borderColor: "red",
    borderWidth: 1,
  },
})

export default Login
