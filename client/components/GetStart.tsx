import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'

function GetStart() {
  const goToRegistration = () => {
    router.push('/register/')
  }

  return (
    <View style={styles.getStartContainer}>
      <View style={styles.GetStartTop}>
        <Image source={require('../assets/images/get_start.png')} />
        <Text style={styles.GetStartTopText}>Start your Note taking</Text>
        <Text style={styles.GetStartTopParagraph}>
          Store your notes and access any time any where, start exploring it
          will be cool 😎.
        </Text>
      </View>

      <View style={styles.GetStartBottom}>
        <TouchableOpacity style={styles.GetStartBtn} onPress={goToRegistration}>
          <Text style={styles.GetStartBtnText}>Get started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SigninBtn}
          onPress={() => router.push('/signIn/')}
        >
          <Text style={styles.SigninBtnText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GetStart

const styles = StyleSheet.create({
  getStartContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 68,
    height: '100%',
    backgroundColor: 'white',
  },
  GetStartTop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  GetStartTopText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 14,
  },
  GetStartTopParagraph: {
    fontSize: 16,
    marginTop: 44,
    color: '#A6A6A6',
    textAlign: 'center',
    maxWidth: 243,
  },
  GetStartBottom: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  GetStartBtn: {
    backgroundColor: '#54408C',
    paddingLeft: 116,
    paddingRight: 116,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 12,
  },
  GetStartBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  SigninBtn: {
    backgroundColor: '#FAF9FD',
    paddingLeft: 116,
    paddingRight: 116,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 12,
  },
  SigninBtnText: {
    color: '#54408C',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
