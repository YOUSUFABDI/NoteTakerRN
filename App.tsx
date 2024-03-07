import { NavigationContainer } from "@react-navigation/native"
import MainNavigator from "./src/navigation/navigation"
import { AuthContextProvider } from "./src/context/AuthContext"
import { ActiveLinkContextProvider } from "./src/context/ActiveLinkContext"
import { NoteContextProvider } from "./src/context/NoteContex"

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <NoteContextProvider>
          <ActiveLinkContextProvider>
            <MainNavigator />
          </ActiveLinkContextProvider>
        </NoteContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  )
}
