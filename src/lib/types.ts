import { NavigationProp } from "@react-navigation/native"
import { DocumentData } from "firebase/firestore"

export type SignupDT = {
  full_name: string
  username: string
  email: string
  password: string
}

export type OTPDT = {
  gmail: string | null
  otp_code: number
}

export type LoginDT = {
  email: string
  password: string
}

export type RouterPropsDT = {
  navigation: NavigationProp<any, any>
}

export type UserDT = {
  uid: string
  full_name: string
  photoURL: string
  email: string
  username: string
  createdAt: string
  notes: []
}

export type CreateNoteDT = {
  title: string
  description: string
}

export type CreatingNoteDT = {
  title: string
  description: string
  created_dt: string | number
}

export type UpdateNoteDT = {
  title: string | undefined
  description: string | undefined
  id: string | undefined
}

export type UpdatingNoteDT = {
  title: string | undefined
  description: string | undefined
  id: string | undefined
}

export type NoteDT = {
  title: string
  description: string
  createdDT: number
  updatedDT: number
}

export type NoteProps = {
  deleteNote: (noteId: number) => void
  isLoading: boolean
  updateNote: (updatingNote: UpdatingNoteDT) => void
}

export type ForgotPassEmailDT = {
  email: string
}

export type ForgotPassOTPDT = {
  gmail: string | null
  otp_code: number
}

export type ChangePassDT = {
  newPassword: string
  confirmPassword: string
}
