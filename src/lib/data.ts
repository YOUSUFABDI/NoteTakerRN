import React from "react"
import { Foundation, MaterialIcons, FontAwesome } from "@expo/vector-icons"

export const DEFAULT_PROFILE_IMAGE =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

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
