import { Text, TextStyle } from "react-native"
import { globalStyle } from "../styles/globalStyles"

type LabelPropsDT = {
  children: React.ReactNode
  customStyle?: TextStyle
}

const Label = ({ children, customStyle }: LabelPropsDT) => {
  return <Text style={[globalStyle.label, customStyle]}>{children}</Text>
}

export default Label
