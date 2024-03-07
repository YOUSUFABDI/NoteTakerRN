import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBwpsONbGmiQFQFq1PLM4lDcave6M6G8os",
  authDomain: "notesdb-5716f.firebaseapp.com",
  projectId: "notesdb-5716f",
  storageBucket: "notesdb-5716f.appspot.com",
  messagingSenderId: "684153728928",
  appId: "1:684153728928:web:3017eb5e8c09b6386f7ec5",
}

if (!initializeApp.length) {
  initializeApp(firebaseConfig)
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP)
