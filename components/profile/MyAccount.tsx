import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import FetchLoggedUser from "../../hooks/FetchLoggedUser"
import { useImageContext } from "../../context/ImageContext"

const MyAccount = () => {
  const { selectedImage, handleImageChange, loading } = useImageContext()
  const { isLoading, loggedInUserInfo } = FetchLoggedUser()

  return (
    <View style={styles.myAccountContainer}>
      <View style={styles.myAccountTop}>
        <Image
          style={styles.myImg}
          source={{
            uri: selectedImage,
          }}
        />
        <TouchableOpacity onPress={handleImageChange}>
          <Text style={styles.changeImgTxt}>
            {loading ? "Changing..." : "Change Picture"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            placeholder="Your full name."
            style={[styles.input, { pointerEvents: "none" }]}
            placeholderTextColor="#B8B8B8"
            defaultValue={
              isLoading ? "Loading ..." : loggedInUserInfo?.full_name
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            placeholder="Your email."
            style={[styles.input, { pointerEvents: "none" }]}
            placeholderTextColor="#B8B8B8"
            defaultValue={isLoading ? "Loading ..." : loggedInUserInfo?.gmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Phone</Text>
          <TextInput
            placeholder="Your phone number."
            style={[styles.input, { pointerEvents: "none" }]}
            placeholderTextColor="#B8B8B8"
            defaultValue={
              isLoading ? "Loading ..." : loggedInUserInfo?.phone_number
            }
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveChanges}>
        <Text style={styles.saveChangeTxt}>Save changes</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MyAccount

const styles = StyleSheet.create({
  myAccountContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 40,
    paddingHorizontal: 15,
    paddingVertical: 15,
    height: "100%",
    backgroundColor: "white",
  },
  myAccountTop: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 16,
  },
  myImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  changeImgTxt: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#54408C",
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
  saveChanges: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#54408C",
    paddingVertical: 12,
    borderRadius: 48,
  },
  saveChangeTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})
