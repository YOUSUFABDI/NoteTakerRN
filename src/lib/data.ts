import React from "react"
import { Foundation, MaterialIcons, FontAwesome } from "@expo/vector-icons"

export const LINKS = [
  {
    id: 1,
    name: "Home",
    icon: React.createElement(Foundation),
    to: "Home",
  },
  {
    id: 2,
    name: "Notes",
    icon: React.createElement(MaterialIcons),
    to: "NotesScreen",
  },
  {
    id: 3,
    name: "Profile",
    icon: React.createElement(FontAwesome),
    to: "ProfileScreen",
  },
]
