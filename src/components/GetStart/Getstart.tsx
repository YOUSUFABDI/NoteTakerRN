import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Paragraph from "../../layout/Paragraph"
import Title from "../../layout/Title"
import { RouterPropsDT } from "../../lib/types"

const GetStart = ({ navigation }: RouterPropsDT) => {
  return (
    <View style={styles.getStartContainer}>
      <View style={styles.GetStartTop}>
        <Image source={require("../../assets/get_start.png")} />
        <View style={[styles.GetStartTop, { maxWidth: 243 }]}>
          <Title customStyle={{ fontWeight: "bold" }}>
            Start your Note taking
          </Title>
          <Paragraph
            customStyle={{
              color: "#A6A6A6",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Store your notes and access any time any where, start exploring it
            will be cool 😎.
          </Paragraph>
        </View>
      </View>

      <View style={styles.GetStartBottom}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignupScreen")
          }}
          style={{
            backgroundColor: "#54408C",
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              paddingLeft: 116,
              paddingRight: 116,
              paddingTop: 16,
              paddingBottom: 16,
            }}
          >
            Get started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginScreen")
          }}
          style={{
            backgroundColor: "#FAF9FD",
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#54408C",
              fontWeight: "bold",
              paddingLeft: 116,
              paddingRight: 116,
              paddingTop: 16,
              paddingBottom: 16,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GetStart

const styles = StyleSheet.create({
  getStartContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 48,
    height: "100%",
    backgroundColor: "white",
  },
  GetStartTop: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
  },
  GetStartBottom: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
})
