import { Link, router } from 'expo-router'
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

const SignIn = () => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.signInContainer}>
        <View style={styles.signInTop}>
          <View style={styles.signInTitle}>
            <Text style={styles.titleTxt}>Welcome Back 👋</Text>
            <Text style={styles.subTxt}>Sign to your account</Text>
          </View>

          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Username</Text>
              <TextInput
                placeholder="Your full username."
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

            <View style={styles.inputContainerPass}>
              <Text style={styles.forgotPass}>Forgot password?</Text>
            </View>
          </View>

          <View style={styles.signInBtns}>
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => router.push('/(tabs)/')}
            >
              <Text style={styles.signInBtnTxt}>Login</Text>
            </TouchableOpacity>
            <View style={styles.haveAnAcc}>
              <Text style={styles.haveAnAccTxt}>Don’t have an account?</Text>
              <Link href="/register/" style={styles.SignInTxt}>
                Sign Up
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  signInContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  signInTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  signInTitle: {
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
  forgotPass: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#54408C',
  },
  input: {
    backgroundColor: '#FAFAFA',
    color: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  signInBtns: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
  signInBtn: {
    backgroundColor: '#54408C',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 48,
  },
  signInBtnTxt: {
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
