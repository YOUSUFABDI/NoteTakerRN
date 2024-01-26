import React, { useState } from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Button,
  Platform,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { useAuth } from "../../context/Auth"
import { RouterPropsDT, SignupDT } from "../../lib/types"

const Signup = ({ navigation }: RouterPropsDT) => {
  const [inputValues, setInputValues] = useState<SignupDT>({
    full_name: "",
    age: "",
    phone_number: "",
    address: "",
    username: "",
    gmail: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const { signup, isLoading } = useAuth()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (fieldName: keyof SignupDT, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }))
  }

  const handleRegister = () => {
    if (
      !inputValues.full_name ||
      !inputValues.age ||
      !inputValues.phone_number ||
      !inputValues.address ||
      !inputValues.username ||
      !inputValues.gmail ||
      !inputValues.password
    ) {
      return Alert.alert("Error", "Please fill all inputs.", [{ text: "OK" }])
    }

    signup(inputValues)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.registerContainer}>
          <View style={styles.registerTop}>
            <View style={styles.registerTitle}>
              <Text style={styles.titleTxt}>Sign Up</Text>
              <Text style={styles.subTxt}>
                Create account and store your notes.
              </Text>
            </View>

            <View style={styles.inputsContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                  placeholder="Your full name."
                  style={styles.input}
                  placeholderTextColor="#B8B8B8"
                  autoCapitalize="none"
                  value={inputValues.full_name}
                  onChangeText={(text) => handleChange("full_name", text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Age</Text>
                <TextInput
                  placeholder="Your age."
                  style={styles.input}
                  placeholderTextColor="#B8B8B8"
                  autoCapitalize="none"
                  value={inputValues.age}
                  onChangeText={(text) => handleChange("age", text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Phone</Text>
                <TextInput
                  placeholder="Your phone number."
                  style={styles.input}
                  placeholderTextColor="#B8B8B8"
                  autoCapitalize="none"
                  value={inputValues.phone_number}
                  onChangeText={(text) => handleChange("phone_number", text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Address</Text>
                <TextInput
                  placeholder="Your address."
                  style={styles.input}
                  placeholderTextColor="#B8B8B8"
                  autoCapitalize="none"
                  value={inputValues.address}
                  onChangeText={(text) => handleChange("address", text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Username</Text>
                <TextInput
                  placeholder="Your username."
                  style={styles.input}
                  placeholderTextColor="#B8B8B8"
                  autoCapitalize="none"
                  value={inputValues.username}
                  onChangeText={(text) => handleChange("username", text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Gmail</Text>
                <TextInput
                  placeholder="Your gmail."
                  style={styles.input}
                  placeholderTextColor="#B8B8B8"
                  autoCapitalize="none"
                  value={inputValues.gmail}
                  onChangeText={(text) => handleChange("gmail", text)}
                />
              </View>
              <View style={styles.inputContainerPass}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  placeholder="Your password."
                  style={styles.input}
                  placeholderTextColor="#B8B8B8"
                  autoCapitalize="none"
                  value={inputValues.password}
                  onChangeText={(text) => handleChange("password", text)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 16, bottom: 18 }}
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
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.registerBtnTxt}>Register</Text>
                )}
              </TouchableOpacity>
              <View style={styles.haveAnAcc}>
                <Text style={styles.haveAnAccTxt}>Have an account?</Text>
                <Button
                  title="Sign In"
                  color="#54408C"
                  onPress={() => navigation.navigate("Login")}
                />
              </View>
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
  },
  registerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "white",
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
  titleTxt: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subTxt: {
    color: "#A6A6A6",
    fontSize: 16,
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
})
