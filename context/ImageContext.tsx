import { createContext, useContext, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import axios from "axios"
import { BASE_API_URL } from "../lib/baseApiUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"

type ImageContextPropsDT = {
  children: React.ReactNode
}

type ImageContextMethodsDT = {
  handleImageChange: () => Promise<void>
  setSelectedImage: (value: string) => void
  selectedImage: string
}

const ImageContext = createContext<ImageContextMethodsDT | null>(null)

export const ImageContextProvider = ({ children }: ImageContextPropsDT) => {
  const [selectedImage, setSelectedImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  )

  const handleImageChange = async () => {
    const currentUsername = await AsyncStorage.getItem("username")

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      })
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri)

        const formData: any = new FormData()
        formData.append("file", {
          uri: result.assets[0].uri,
          type: "image/*",
          name: `profile_image_${Date.now()}.jpg`,
        })

        const response = await axios.post(
          `${BASE_API_URL}/upload/${currentUsername}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        const data = await response.data
        console.log("data____________----::", data)
      } else {
        alert("You did not select any image.")
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const values = {
    selectedImage,
    setSelectedImage,
    handleImageChange,
  }

  return (
    <ImageContext.Provider value={values}>{children}</ImageContext.Provider>
  )
}

export const useImageContext = () => {
  const context = useContext(ImageContext)
  if (!context) {
    throw new Error(
      "useImageContext must be used within an ImageContextProvider"
    )
  }
  return context
}
