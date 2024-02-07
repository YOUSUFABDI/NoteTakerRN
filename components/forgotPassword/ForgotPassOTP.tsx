import React, { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import OTPTextView from "react-native-otp-textinput"
import { ForgotPassOTPDT, RouterPropsDT } from "../../lib/types"
import { useRoute } from "@react-navigation/native"
import axios from "axios"
import { BASE_API_URL } from "../../lib/baseApiUrl"

const ForgotPassOTP = ({ navigation }: RouterPropsDT) => {
  const [otp, setOTP] = useState(0)
  const [loading, setLoading] = useState(false)

  const route = useRoute()
  const { gmail } = route.params as ForgotPassOTPDT

  const handleOtpChange = (newOTP: number) => {
    setOTP(newOTP)
  }

  const handleForgotPasswordOTP = async () => {
    if (!otp) {
      Alert.alert("Please fill the otp field")
      return
    }

    setLoading(true)
    try {
      const OTPData: ForgotPassOTPDT = {
        gmail: gmail,
        otp_code: otp,
      }

      const response = await axios.post(
        `${BASE_API_URL}/verify_reset_otp`,
        OTPData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await response.data
      if (data.status === "success") {
        const gmail = OTPData.gmail
        navigation.navigate("ChangePassScreen", { gmail })
      } else {
        Alert.alert("Error", data.message, [{ text: "OK" }])
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.otpSecContainer}>
      <View style={styles.otpTop}>
        <Text style={styles.otpTopTitle}>Verification Code</Text>
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
            onPress={handleForgotPasswordOTP}
          >
            {loading ? (
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

export default ForgotPassOTP

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
