import { ReactNode, createContext, useContext, useState } from "react"
import { LoginDT, SignupDT, UserDT } from "../lib/types"
import { getCurrentDate } from "../lib/utils"
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore"
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebase/firebase"
import { Alert } from "react-native"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationProp } from "@react-navigation/native"
import { FIREBASE_STORAGE } from "../firebase/firebase"
import { getDownloadURL, ref, uploadString } from "firebase/storage"

type AuthContextPropsDT = {
  children: ReactNode
}

type AuthContextMethodsDT = {
  login: (input: LoginDT) => void
  signup: (input: SignupDT) => void
  logout: () => void
  getUser: () => void
  changeProfileImage: (base64Image: string) => void
  loading: boolean
  isLoggedIn: boolean
  user: UserDT | null
}

const AuthContext = createContext<AuthContextMethodsDT | null>(null)

export const AuthContextProvider = ({ children }: AuthContextPropsDT) => {
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserDT | null>(null)

  const navigation: NavigationProp<any> = useNavigation()

  const auth = FIREBASE_AUTH
  const db = FIRESTORE_DB
  const storage = FIREBASE_STORAGE

  const signup = async (input: SignupDT) => {
    const date = getCurrentDate()

    setLoading(true)
    try {
      const isUser = await getDocs(
        query(collection(db, "users"), where("gmail", "==", input.email))
      )
      if (!isUser.empty) {
        setLoading(false)
        return Alert.alert("Error", "User already exists.", [{ text: "OK" }])
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      )

      const { user } = userCredential
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        full_name: input.full_name,
        username: input.username,
        email: input.email,
        password: input.password,
        profileImg: "",
        notes: [],
        createdAt: date,
      })

      navigation.navigate("LoginScreen")
    } catch (error: any) {
      console.log(error)
      Alert.alert("Error", error.message, [{ text: "OK" }])
    } finally {
      setLoading(false)
    }
  }

  const login = async (input: LoginDT) => {
    await AsyncStorage.setItem("email", input.email)

    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, input.email, input.password)
      setIsLoggedIn(true)
    } catch (error: any) {
      console.log(error)
      if (error.code === "auth/user-not-found") {
        Alert.alert(
          "Error",
          "User not found. Please check your email and password.",
          [{ text: "OK" }]
        )
      } else {
        Alert.alert("Error", error.message, [{ text: "OK" }])
      }
    } finally {
      setLoading(false)
    }
  }

  const getUser = async () => {
    const email = await AsyncStorage.getItem("email")

    setLoading(true)
    try {
      const q = query(collection(db, "users"), where("email", "==", email))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) return setUser(null)

      let userDoc: any
      querySnapshot.forEach((doc) => {
        userDoc = doc.data()
      })
      setUser(userDoc)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const changeProfileImage = async (base64Image: string) => {
    const storageRef = ref(storage, `profile_images/${user?.uid}`)
    setLoading(true)
    try {
      await uploadString(storageRef, base64Image, "base64", {
        contentType: "image/jpeg",
      })

      const imageUrl = await getDownloadURL(storageRef)

      // await db.doc(`users/${userId}`).update({
      //   profileImg: imageUrl,
      // });
    } catch (error) {
      Alert.alert("Error", "Failed to update profile image", [{ text: "OK" }])
    }
  }

  const logout = () => {
    auth.signOut()
    setIsLoggedIn(false)
  }

  const values = {
    signup,
    login,
    logout,
    loading,
    isLoggedIn,
    user,
    getUser,
    changeProfileImage,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider")
  }
  return context
}

export default useAuth
