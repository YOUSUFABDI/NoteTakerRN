import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import OTPTextView from 'react-native-otp-textinput'

const OTP = () => {
  const [otp, setOtp] = useState('')

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp)
    // console.log('OTP changed:', otp)
  }

  return (
    <View style={styles.otpSecContainer}>
      <View style={styles.otpTop}>
        <Text style={styles.otpTopTitle}>Verification Email</Text>
        <Text style={styles.otpTopSubtitle}>
          Please enter the code we just sent to email{' '}
        </Text>
        <Text style={styles.otpTopEmail}>Johndoe@gmail.com</Text>
      </View>
      <View style={styles.otpWrapper}>
        <OTPTextView
          containerStyle={styles.otpContainer}
          textInputStyle={styles.otpInput}
          tintColor="#54408C"
          handleTextChange={handleOtpChange}
          inputCount={4}
          keyboardType="numeric"
          autoFocus
        />
        <View style={styles.otpBtnContainer}>
          <TouchableOpacity style={styles.otpBtn}>
            <Text style={styles.otpBtnTxt}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default OTP

const styles = StyleSheet.create({
  otpSecContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 40,
    height: '100%',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  otpTop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  otpTopTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  otpTopSubtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#A6A6A6',
  },
  otpTopEmail: {
    fontSize: 16,
    marginTop: 2,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  otpWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    width: '100%',
  },
  otpBtnContainer: {
    width: '100%',
  },
  otpBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#54408C',
    width: '100%',
    borderRadius: 48,
    height: 48,
    paddingVertical: 12,
  },
  otpBtnTxt: {
    color: 'white',
    textAlign: 'center',
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
