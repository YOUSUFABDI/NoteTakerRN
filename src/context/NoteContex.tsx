import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore"
import React, { createContext, useContext, useState } from "react"
import { Alert } from "react-native"
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebase/firebase"
import { CreatingNoteDT, UpdatingNoteDT } from "../lib/types"
import useAuth from "./AuthContext"

type NoteContextProviderPropsDT = {
  children: React.ReactNode
}

type NoteContextMethodsDT = {
  createNote: (note: CreatingNoteDT) => void
  getNotes: () => void
  deleteNote: (noteID: string) => void
  updateNote: (updatedNote: UpdatingNoteDT) => void
  notes: DocumentData[]
  loading: boolean
}

const NoteContext = createContext<NoteContextMethodsDT | null>(null)

export const NoteContextProvider = ({
  children,
}: NoteContextProviderPropsDT) => {
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState<DocumentData[]>([])

  const { user } = useAuth()

  const db = FIRESTORE_DB
  const auth = FIREBASE_AUTH

  const getNotes = async () => {
    setLoading(true)
    try {
      if (!user) {
        throw new Error("User is not authenticated")
      }

      const notesSnapshot = await getDocs(
        collection(db, `users/${user.uid}/notes`)
      )
      const notes: DocumentData[] = notesSnapshot.docs.map((doc) => doc.data())
      setNotes(notes)
    } catch (error: any) {
      console.log(error)
      Alert.alert("Error", error.message, [{ text: "OK" }])
    } finally {
      setLoading(false)
    }
  }

  const createNote = async (note: CreatingNoteDT) => {
    setLoading(true)
    try {
      if (!user) {
        throw new Error("User is not authenticated")
      }

      const notesRef = collection(db, `users/${user.uid}/notes`)
      const docRef = await addDoc(notesRef, {
        createdBy: user.uid,
        title: note.title,
        description: note.description,
        createdAt: new Date(),
      })
      await updateDoc(docRef, {
        noteId: docRef.id,
      })

      await getNotes()
    } catch (error: any) {
      console.log(error)
      Alert.alert("Error", error.message, [{ text: "OK" }])
    } finally {
      setLoading(false)
    }
  }

  const deleteNote = async (noteId: string) => {
    try {
      if (!user) {
        throw new Error("User is not authenticated")
      }

      const noteRef = doc(db, `users/${user.uid}/notes/${noteId}`)
      await deleteDoc(noteRef)
      await getNotes()
    } catch (error: any) {
      Alert.alert("Error", error.message, [{ text: "OK" }])
    }
  }

  const updateNote = async (updatedNote: UpdatingNoteDT) => {
    setLoading(true)

    try {
      if (!user) {
        throw new Error("User is not authenticated")
      }

      const noteRef = doc(db, `users/${user.uid}/notes/${updatedNote.id}`)
      await updateDoc(noteRef, {
        title: updatedNote.title,
        description: updatedNote.description,
        updatedAt: new Date(),
      })
      await getNotes()
    } catch (error: any) {
      Alert.alert("Error", error.message, [{ text: "OK" }])
    }
  }

  const values = {
    createNote,
    getNotes,
    deleteNote,
    updateNote,
    notes,
    loading,
  }

  return <NoteContext.Provider value={values}>{children}</NoteContext.Provider>
}

const useNote = () => {
  const context = useContext(NoteContext)
  if (!context) {
    throw new Error("useNote must be used within an NoteContextProvider")
  }

  return context
}

export default useNote
