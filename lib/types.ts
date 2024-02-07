import { NavigationProp } from "@react-navigation/native"

export type SignupDT = {
  full_name: string
  age: string
  phone_number: string
  address: string
  username: string
  gmail: string
  password: string
}

export type OTPDT = {
  gmail: string | null
  otp_code: number
}

export type LoginDT = {
  username: string
  password: string
}

export type RouterPropsDT = {
  navigation: NavigationProp<any, any>
}

export type GetUserDT = {
  username: string | null
}

export type LoggedInUserInfoDT = {
  id: number
  full_name: string
  age: number
  phone_number: string
  username: string
  gmail: string
  address: string
  profile_image: string
}

export type CreateNoteDT = {
  title: string
  description: string
}

export type CreatingNoteDT = {
  title: string
  description: string
  created_dt: string | number
  user_id: number | undefined
}

export type UpdateNoteDT = {
  id: number | undefined
  title: string | undefined
  description: string | undefined
}

export type UpdatingNoteDT = {
  title: string | undefined
  description: string | undefined
  updated_dt: string | number
  id: number
}

export type NoteDT = {
  id: number
  title: string
  description: string
  createdDT: number
  updatedDT: number
}

export type NoteProps = {
  notes: NoteDT[]
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
