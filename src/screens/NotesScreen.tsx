import { SafeAreaView } from "react-native"
import { RouterPropsDT } from "../lib/types"
import Notes from "../components/note/Notes"

const NotesScreen = ({ navigation }: RouterPropsDT) => {
  return (
    <SafeAreaView>
      <Notes />
    </SafeAreaView>
  )
}

export default NotesScreen
