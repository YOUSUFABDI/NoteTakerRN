import {
  initializeApp,
  FirebaseApp,
  FirebaseOptions,
  getApps,
} from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBwpsONbGmiQFQFq1PLM4lDcave6M6G8os",
  authDomain: "notesdb-5716f.firebaseapp.com",
  projectId: "notesdb-5716f",
  storageBucket: "notesdb-5716f.appspot.com",
  messagingSenderId: "684153728928",
  appId: "1:684153728928:web:3017eb5e8c09b6386f7ec5",
}

let firebaseApp: FirebaseApp

try {
  firebaseApp = initializeApp(firebaseConfig)
} catch (error) {
  firebaseApp = getApps()[0] // Retrieve existing app if it exists
}

export const FIREBASE_APP = firebaseApp
export const FIREBASE_AUTH = getAuth(firebaseApp)
export const FIRESTORE_DB = getFirestore(firebaseApp)
export const FIREBASE_STORAGE = getStorage(firebaseApp)
