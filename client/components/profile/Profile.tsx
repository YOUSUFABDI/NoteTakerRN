import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Foundation,
} from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { logout } from '../../store/Auth/authSlice'
import { router } from 'expo-router'
import FetchLoggedInUserInfo from '../../hooks/FetchLoggedInUserInfo'

const Profile = () => {
  const { loggedInUserInfo } = FetchLoggedInUserInfo()
  console.log(loggedInUserInfo)

  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const handleLogout = () => {
    dispatch(logout(false))
    router.push('/signIn/')
  }

  return (
    <View style={styles.profileTabcontainer}>
      <View style={styles.profileTabTop}>
        <View style={styles.profileTabTopImgInfo}>
          <Image
            style={styles.profileImg}
            source={require('../../assets/images/profileImage.jpg')}
          />
          <View style={styles.profileNamePhone}>
            <Text style={styles.name}>{loggedInUserInfo?.username}</Text>
            <Text style={styles.phone}>{loggedInUserInfo?.phone_number}</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.links}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => router.push('/my-account/')}
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

        <View style={styles.link}>
          <View style={styles.linkIconName}>
            <View style={styles.linkIcon}>
              <Foundation name="clipboard-notes" size={24} color="#54408C" />
            </View>
            <View style={styles.linkName}>
              <Text>Notes</Text>
            </View>
          </View>
          <AntDesign name="right" size={20} color="black" />
        </View>
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
    flexDirection: 'column',
    gap: 40,
    width: '100%',
    height: '100%',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  profileTabTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  profileTabTopImgInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileNamePhone: {
    flexDirection: 'column',
    gap: 2,
  },
  profileImg: {
    width: 56,
    height: 56,
    borderRadius: 100,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phone: {
    color: '#A6A6A6',
    fontSize: 14,
  },
  logoutTxt: {
    color: '#EF5A56',
    fontSize: 14,
    fontWeight: 'bold',
  },
  links: {
    flexDirection: 'column',
    gap: 25,
    width: '95%',
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkIconName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  linkIcon: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkName: {
    flex: 1,
  },
})
