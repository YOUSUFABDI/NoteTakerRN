import { StyleSheet } from "react-native"

export const globalStyle = StyleSheet.create({
  // input
  label: {
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#FAFAFA",
    color: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  // text
  textLg: {
    fontSize: 24,
  },
  textSm: {
    fontSize: 16,
  },

  // paragraph
  paragraphSm: {
    fontSize: 16,
  },

  withGoogle: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 40,
  },
})
