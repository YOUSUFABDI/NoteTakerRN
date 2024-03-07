import { Text, TextStyle } from "react-native"
import { globalStyle } from "../styles/globalStyles"
import React from "react"

type TitlePropsDT = {
  children: React.ReactNode
  customStyle?: TextStyle
}

const Title = ({ children, customStyle }: TitlePropsDT) => {
  return <Text style={[globalStyle.textSm, customStyle]}>{children}</Text>
}

export default Title
