import React, { createContext, useContext, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Foundation, MaterialIcons, FontAwesome } from "@expo/vector-icons"

type ActiveLinkContextProps = {
  children: React.ReactNode
}

type ActiveLinkContextMethods = {
  activeLink: string
  setActiveLink: (value: string) => void
  handleActiveLink: (linkName: string, to: string) => void
  getIconElement: (iconName: string, isActive: boolean) => any
}

const ActiveLinkContext = createContext<ActiveLinkContextMethods | null>(null)

export const ActiveLinkContextProvider = ({
  children,
}: ActiveLinkContextProps) => {
  const [activeLink, setActiveLink] = useState("Home")

  const navigation: any = useNavigation()

  const handleActiveLink = (linkName: string, to: string) => {
    setActiveLink(linkName)
    navigation.navigate(to)
  }

  const getIconElement = (iconName: string, isActive: boolean) => {
    switch (iconName) {
      case "Home":
        return (
          <Foundation
            name="home"
            size={24}
            color={isActive ? "#54408C" : "black"}
          />
        )
      case "Notes":
        return (
          <MaterialIcons
            name="note"
            size={24}
            color={isActive ? "#54408C" : "black"}
          />
        )
      case "Profile":
        return (
          <FontAwesome
            name="user"
            size={24}
            color={isActive ? "#54408C" : "black"}
          />
        )
      default:
        return null
    }
  }

  const values = { activeLink, setActiveLink, handleActiveLink, getIconElement }

  return (
    <ActiveLinkContext.Provider value={values}>
      {children}
    </ActiveLinkContext.Provider>
  )
}

export const useActiveLink = () => {
  const context = useContext(ActiveLinkContext)
  if (!context) {
    throw new Error(
      "useActiveLink must be used within an ActiveLinkContextProvider"
    )
  }
  return context
}
