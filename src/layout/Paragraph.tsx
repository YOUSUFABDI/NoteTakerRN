import { Text, TextStyle } from "react-native"
import { globalStyle } from "../styles/globalStyles"

type ParagraphPropsDT = {
  children: React.ReactNode
  customStyle?: TextStyle
}

const Paragraph = ({ children, customStyle }: ParagraphPropsDT) => {
  return <Text style={[globalStyle.paragraphSm, customStyle]}>{children}</Text>
}

export default Paragraph
