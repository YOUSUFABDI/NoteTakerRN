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
}

export type CreateNoteDT = {
  title: string
  description: string
}

export type NoteDT = {
  noteID: number
  title: string
  description: string
  createdDT: number
  updatedDT: number
}

export type NoteProps = {
  notes: NoteDT[]
}
