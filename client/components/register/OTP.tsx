import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import OTPTextView from 'react-native-otp-textinput'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setGmail, verifyRegisterGmailOTP } from '../../store/Auth/authSlice'

type OTPDataType = {
  gmail: string
  otp_code: number
}

const OTP = () => {
  const [otp, setOtp] = useState(0)

  const dispatch = useDispatch<AppDispatch>()

  const storedGmail = useSelector((state: RootState) => state.auth.gmail)
  const isLoading = useSelector((state: RootState) => state.auth.isLoading)

  const handleOtpChange = (newOtp: number) => {
    setOtp(newOtp)
  }

  useEffect(() => {
    AsyncStorage.getItem('gmail').then((gmail) => {
      if (gmail) {
        dispatch(setGmail(gmail))
      }
    })
  }, [dispatch])

  const handleOTPVerification = async () => {
    if (!otp) {
      console.log('Please fill the otp field')
      return
    }

    const OTPData: OTPDataType = {
      gmail: storedGmail,
      otp_code: otp,
    }

    dispatch(verifyRegisterGmailOTP(OTPData))
  }

  return (
    <View style={styles.otpSecContainer}>
      <View style={styles.otpTop}>
        <Text style={styles.otpTopTitle}>Verification Email</Text>
        <Text style={styles.otpTopSubtitle}>
          Please enter the code we just sent to email{' '}
        </Text>
        <Text style={styles.otpTopEmail}>{storedGmail}</Text>
      </View>
      <View style={styles.otpWrapper}>
        <OTPTextView
          containerStyle={styles.otpContainer}
          textInputStyle={styles.otpInput}
          tintColor="#54408C"
          handleTextChange={(newOtp: string) =>
            handleOtpChange(parseInt(newOtp, 10))
          }
          inputCount={4}
          keyboardType="numeric"
          autoFocus
        />
        <View style={styles.otpBtnContainer}>
          <TouchableOpacity
            style={styles.otpBtn}
            onPress={handleOTPVerification}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.otpBtnTxt}>Continue</Text>
            )}
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
