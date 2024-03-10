import { DocumentData, doc, getDoc, updateDoc } from "firebase/firestore"
import React, { createContext, useContext, useState } from "react"
import { Alert } from "react-native"
import { FIRESTORE_DB } from "../firebase/firebase"
import { CreatingNoteDT, UpdatingNoteDT } from "../lib/types"
import { getCurrentDate } from "../lib/utils"
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

  const date = getCurrentDate()

  const db = FIRESTORE_DB

  const getNotes = async () => {
    setLoading(true)
    try {
      if (!user) {
        throw new Error("User is not authenticated")
      }

      const userRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        throw new Error("User document does not exist")
      }

      const userData = userDoc.data()
      const userNotes = userData.notes || []

      setNotes(userNotes)
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

      const userRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        throw new Error("User document does not exist")
      }

      const userData = userDoc.data()

      const newNote = {
        noteId: Date.now(),
        createdBy: user.uid,
        title: note.title,
        description: note.description,
        createdAt: date,
      }

      const updatedNotes = [...userData.notes, newNote]

      await updateDoc(userRef, {
        notes: updatedNotes,
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

      const userRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        throw new Error("User document does not exist")
      }

      const userData = userDoc.data()

      const updatedNotes = userData.notes.filter(
        (note: any) => note.noteId !== noteId
      )

      await updateDoc(userRef, {
        notes: updatedNotes,
      })

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

      const userRef = doc(db, "users", user.uid)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        throw new Error("User document does not exist")
      }

      const userData = userDoc.data()

      const noteIndex = userData.notes.findIndex(
        (note: any) => note.noteId === updatedNote.id
      )

      if (noteIndex === -1) {
        throw new Error("Note not found")
      }

      const updatedNotes = [...userData.notes]
      updatedNotes[noteIndex] = {
        ...updatedNotes[noteIndex],
        title: updatedNote.title,
        description: updatedNote.description,
        updatedAt: date,
      }

      await updateDoc(userRef, {
        notes: updatedNotes,
      })

      await getNotes()
    } catch (error: any) {
      Alert.alert("Error", error.message, [{ text: "OK" }])
    } finally {
      setLoading(false)
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
