import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, setUsername } from '../../store/Auth/authSlice'
import { AppDispatch, RootState } from '../../store/store'
import { AntDesign } from '@expo/vector-icons'

type SignupState = {
  full_name: string
  age: string
  address: string
  username: string
  gmail: string
  password: string
}

const Signup = () => {
  const [inputValues, setInputValues] = useState<SignupState>({
    full_name: '',
    age: '',
    address: '',
    username: '',
    gmail: '',
    password: '',
  })

  const dispatch = useDispatch<AppDispatch>()
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)

  const handleChange = (fieldName: keyof SignupState, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }))
  }

  const handleRegister = () => {
    if (
      !inputValues.full_name ||
      !inputValues.age ||
      !inputValues.address ||
      !inputValues.username ||
      !inputValues.gmail ||
      !inputValues.password
    ) {
      console.log('Please fill in all the fields')
      return
    }

    dispatch(registerUser(inputValues))
  }

  return (
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
                value={inputValues.full_name}
                onChangeText={(text) => handleChange('full_name', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Age</Text>
              <TextInput
                placeholder="Your age."
                style={styles.input}
                placeholderTextColor="#B8B8B8"
                value={inputValues.age}
                onChangeText={(text) => handleChange('age', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Address</Text>
              <TextInput
                placeholder="Your address."
                style={styles.input}
                placeholderTextColor="#B8B8B8"
                value={inputValues.address}
                onChangeText={(text) => handleChange('address', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Username</Text>
              <TextInput
                placeholder="Your username."
                style={styles.input}
                placeholderTextColor="#B8B8B8"
                value={inputValues.username}
                onChangeText={(text) => handleChange('username', text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Gmail</Text>
              <TextInput
                placeholder="Your gmail."
                style={styles.input}
                placeholderTextColor="#B8B8B8"
                value={inputValues.gmail}
                onChangeText={(text) => handleChange('gmail', text)}
              />
            </View>
            <View style={styles.inputContainerPass}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput
                placeholder="Your password."
                style={styles.input}
                placeholderTextColor="#B8B8B8"
                value={inputValues.password}
                onChangeText={(text) => handleChange('password', text)}
              />
              <View style={{ position: 'absolute', right: 16, bottom: 18 }}>
                <Feather name="eye-off" size={18} color="#B8B8B8" />
                {/* <AntDesign name="eyeo" size={18} color="#B8B8B8" /> */}
              </View>
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
              <Link href="/signIn/" style={styles.SignInTxt}>
                Sign In
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Signup

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  registerTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  registerTitle: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  titleTxt: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTxt: {
    color: '#A6A6A6',
    fontSize: 16,
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  inputContainerPass: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FAFAFA',
    color: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  registerBtns: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  registerBtn: {
    backgroundColor: '#54408C',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 48,
  },
  registerBtnTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  haveAnAcc: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  haveAnAccTxt: {
    color: '#A6A6A6',
    fontSize: 16,
  },
  SignInTxt: {
    color: '#54408C',
    fontSize: 16,
  },
})
