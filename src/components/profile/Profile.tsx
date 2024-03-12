import {
  AntDesign,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import useAuth from "../../context/AuthContext"
import { RouterPropsDT } from "../../lib/types"
import { DEFAULT_PROFILE_IMAGE } from "../../lib/data"

const Profile = ({ navigation }: RouterPropsDT) => {
  const { logout, loading, getUser, user } = useAuth()

  const [profileImage, setProfileImage] = useState(user?.profileImg)

  useEffect(() => {
    getUser()
  }, [])

  return (
    <View style={styles.profileTabcontainer}>
      <View style={styles.profileTabTop}>
        <View style={styles.profileTabTopImgInfo}>
          <Image
            style={styles.profileImg}
            source={{
              uri:
                loading || profileImage === ""
                  ? DEFAULT_PROFILE_IMAGE
                  : profileImage,
            }}
            onError={() => {
              setProfileImage(DEFAULT_PROFILE_IMAGE)
            }}
          />
          <View style={styles.profileNamePhone}>
            <Text style={styles.name}>
              {loading ? "Loading ..." : user?.full_name}
            </Text>
            <Text style={styles.phone}>
              {loading ? "Loading ..." : user?.username}
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.logoutTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.links}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("MyAccountScreen")}
        >
          <View style={styles.linkIconName}>
            <View style={styles.linkIcon}>
              <Ionicons name="person" size={24} color="#54408C" />
            </View>
            <View style={styles.linkName}>
              <Text>My Account</Text>
            </View>
          </View>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("NotesScreen")}
        >
          <View style={styles.linkIconName}>
            <View style={styles.linkIcon}>
              <Foundation name="clipboard-notes" size={24} color="#54408C" />
            </View>
            <View style={styles.linkName}>
              <Text>Notes</Text>
            </View>
          </View>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
        <View style={styles.link}>
          <View style={styles.linkIconName}>
            <View style={styles.linkIcon}>
              <MaterialCommunityIcons
                name="key-change"
                size={24}
                color="#54408C"
              />
            </View>
            <View style={styles.linkName}>
              <Text>Security</Text>
            </View>
          </View>
          <AntDesign name="right" size={20} color="black" />
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  profileTabcontainer: {
    flexDirection: "column",
    gap: 40,
    width: "100%",
    height: "100%",
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: "white",
  },
  profileTabTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  profileTabTopImgInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  profileNamePhone: {
    flexDirection: "column",
    gap: 2,
  },
  profileImg: {
    width: 56,
    height: 56,
    borderRadius: 100,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  phone: {
    color: "#A6A6A6",
    fontSize: 14,
  },
  logoutTxt: {
    color: "#EF5A56",
    fontSize: 14,
    fontWeight: "bold",
  },
  links: {
    flexDirection: "column",
    gap: 25,
    width: "95%",
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkIconName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  linkIcon: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  linkName: {
    flex: 1,
  },
})
