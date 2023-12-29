import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Foundation,
} from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUsername } from '../../store/Auth/authSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const storedUsername = useSelector((state: RootState) => state.auth.username)

  useEffect(() => {
    AsyncStorage.getItem('username').then((username) => {
      if (username) {
        dispatch(setUsername(username))
      }
    })
  }, [dispatch])

  console.log('profile', storedUsername)

  return (
    <View style={styles.profileTabcontainer}>
      <View style={styles.profileTabTop}>
        <View style={styles.profileTabTopImgInfo}>
          <Image
            style={styles.profileImg}
            source={require('../../assets/images/profileImage.jpg')}
          />
          <View style={styles.profileNamePhone}>
            <Text style={styles.name}>{storedUsername || 'John doe'}</Text>
            <Text style={styles.phone}>61554455</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity>
            <Text style={styles.logoutTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.links}>
        <View style={styles.link}>
          <View style={styles.linkIconName}>
            <View style={styles.linkIcon}>
              <Ionicons name="person" size={24} color="#54408C" />
            </View>
            <View style={styles.linkName}>
              <Text>My Account</Text>
            </View>
          </View>
          <AntDesign name="right" size={20} color="black" />
        </View>
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
