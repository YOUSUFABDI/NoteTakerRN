import { Link, router } from 'expo-router'
import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Router } from 'expo-router'

const Signup = () => {
  return (
    <View style={styles.registerContainer}>
      <View style={styles.registerTop}>
        <View style={styles.registerTitle}>
          <Text style={styles.titleTxt}>Sign Up</Text>
          <Text style={styles.subTxt}>
            Create account and choose favorite menu
          </Text>
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput
              placeholder="Your full name."
              style={styles.input}
              placeholderTextColor="#B8B8B8"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Age</Text>
            <TextInput
              placeholder="Your full age."
              style={styles.input}
              placeholderTextColor="#B8B8B8"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Address</Text>
            <TextInput
              placeholder="Your full address."
              style={styles.input}
              placeholderTextColor="#B8B8B8"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Username</Text>
            <TextInput
              placeholder="Your full username."
              style={styles.input}
              placeholderTextColor="#B8B8B8"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Gmail</Text>
            <TextInput
              placeholder="Your gmail."
              style={styles.input}
              placeholderTextColor="#B8B8B8"
            />
          </View>
          <View style={styles.inputContainerPass}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              placeholder="Your password."
              style={styles.input}
              placeholderTextColor="#B8B8B8"
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
            onPress={() => router.push('/otp/')}
          >
            <Text style={styles.registerBtnTxt}>Register</Text>
          </TouchableOpacity>
          <View style={styles.haveAnAcc}>
            <Text style={styles.haveAnAccTxt}>Have an account?</Text>
            <Link href="/" style={styles.SignInTxt}>
              Sign In
            </Link>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
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
