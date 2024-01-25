import React, { useState } from "react"
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import OTPTextView from "react-native-otp-textinput"
import { useAuth } from "../../context/Auth"
import { useRoute } from "@react-navigation/native"
import { OTPDT } from "../../lib/types"

const OTP = () => {
  const [otp, setOtp] = useState(0)

  const route = useRoute()
  const { gmail } = route.params as OTPDT

  const { verifyRegisterGmailOTP, isLoading } = useAuth()

  const handleOtpChange = (newOtp: number) => {
    setOtp(newOtp)
  }

  const handleOTPVerification = async () => {
    if (!otp) {
      console.log("Please fill the otp field")
      return
    }

    const OTPData: OTPDT = {
      gmail: gmail,
      otp_code: otp,
    }

    verifyRegisterGmailOTP(OTPData)
  }

  return (
    <View style={styles.otpSecContainer}>
      <View style={styles.otpTop}>
        <Text style={styles.otpTopTitle}>Verification Email</Text>
        <Text style={styles.otpTopSubtitle}>
          Please enter the code we just sent to email{" "}
        </Text>
        <Text style={styles.otpTopEmail}>{gmail}</Text>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 40,
    height: "100%",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  otpTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  otpTopTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  otpTopSubtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#A6A6A6",
  },
  otpTopEmail: {
    fontSize: 16,
    marginTop: 2,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  otpWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    width: "100%",
  },
  otpBtnContainer: {
    width: "100%",
  },
  otpBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#54408C",
    width: "100%",
    borderRadius: 48,
    height: 48,
    paddingVertical: 12,
  },
  otpBtnTxt: {
    color: "white",
    textAlign: "center",
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
})
