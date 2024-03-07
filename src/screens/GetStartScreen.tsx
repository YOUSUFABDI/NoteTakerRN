import { SafeAreaView } from "react-native"
import GetStart from "../components/GetStart/Getstart"
import { RouterPropsDT } from "../lib/types"

const GetStartScreen = ({ navigation }: RouterPropsDT) => {
  return (
    <SafeAreaView>
      <GetStart navigation={navigation} />
    </SafeAreaView>
  )
}

export default GetStartScreen
