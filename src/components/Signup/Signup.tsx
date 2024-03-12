import { Feather } from "@expo/vector-icons"
import React, { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import useAuth from "../../context/AuthContext"
import { RouterPropsDT, SignupDT } from "../../lib/types"
import { globalStyle } from "../../styles/globalStyles"
import Divider from "../../layout/Divider"

const Signup = ({ navigation }: RouterPropsDT) => {
  const [inputValues, setInputValues] = useState<SignupDT>({
    full_name: "",
    username: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const { signup, loading } = useAuth()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (fieldName: keyof SignupDT, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }))
    if (fieldName === "password") {
      setIsPasswordValid(value.length >= 7)
    }
  }

  const handleRegister = () => {
    if (
      !inputValues.full_name ||
      !inputValues.username ||
      !inputValues.email ||
      !inputValues.password
    ) {
      return Alert.alert("Error", "Please fill all inputs.", [{ text: "OK" }])
    }

    if (inputValues.password.length < 7) {
      return Alert.alert(
        "Error",
        "Password must be at least 7 characters long.",
        [{ text: "OK" }]
      )
    }

    signup(inputValues)
    setInputValues({
      full_name: "",
      username: "",
      email: "",
      password: "",
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.registerContainer}>
          <View style={styles.registerTop}>
            <View style={styles.registerTitle}>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sign Up</Text>
              <Text style={{ color: "#A6A6A6", fontSize: 16 }}>
                Create account and store your notes.
              </Text>
            </View>

            <View style={styles.inputsContainer}>
              <View style={styles.inputContainer}>
                <Text style={{ fontSize: 14 }}>Name</Text>
                <TextInput
                  placeholder="Your full name."
                  style={globalStyle.input}
                  placeholderTextColor="#B8B8B8"
                  autoCapitalize="none"
                  value={inputValues.full_name}
                  onChangeText={(text) => handleChange("full_name", text)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={{ fontSize: 14 }}>Username</Text>
                <TextInput
                  placeholder="Your username."
                  style={globalStyle.input}
                  placeholderTextColor="#B8B8B8"
                  autoCapitalize="none"
                  value={inputValues.username}
                  onChangeText={(text) => handleChange("username", text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={{ fontSize: 14 }}>Gmail</Text>
                <TextInput
                  placeholder="Your gmail."
                  style={globalStyle.input}
                  placeholderTextColor="#B8B8B8"
                  autoCapitalize="none"
                  value={inputValues.email}
                  onChangeText={(text) => handleChange("email", text)}
                />
              </View>
              <View style={styles.inputContainerPass}>
                <Text style={{ fontSize: 14 }}>Password</Text>
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
                  value={inputValues.password}
                  onChangeText={(text) => handleChange("password", text)}
                  secureTextEntry={!showPassword}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 16,
                    bottom: 13,
                  }}
                  onPress={toggleShowPassword}
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={18}
                    color="#B8B8B8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.registerBtns}>
              <TouchableOpacity
                style={styles.registerBtn}
                onPress={handleRegister}
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.registerBtnTxt}>Register</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 7,
              }}
            >
              <Divider />
              <Text style={{ color: "#A6A6A6", fontSize: 14 }}>Or with</Text>
              <Divider />
            </View> */}

            {/* <TouchableOpacity style={globalStyle.withGoogle}>
              <Image source={require("../../assets/google.png")} />
              <Text style={{ color: "#000", fontSize: 14 }}>
                Signup with Google
              </Text>
            </TouchableOpacity> */}

            <View style={styles.haveAnAcc}>
              <Text style={styles.haveAnAccTxt}>Have an account?</Text>
              <Button
                title="Sign In"
                color="#54408C"
                onPress={() => navigation.navigate("LoginScreen")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Signup

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: "white",
  },
  registerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  registerTop: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  registerTitle: {
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
  registerBtns: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  registerBtn: {
    backgroundColor: "#54408C",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 48,
  },
  registerBtnTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  haveAnAcc: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  haveAnAccTxt: {
    color: "#A6A6A6",
    fontSize: 16,
  },
  SignInTxt: {
    color: "#54408C",
    fontSize: 16,
  },
  invalidPasswordInput: {
    borderColor: "red",
    borderWidth: 1,
  },
})
