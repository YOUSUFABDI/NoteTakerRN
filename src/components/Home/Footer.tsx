import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useActiveLink } from "../../context/ActiveLinkContext"
import { LINKS } from "../../lib/data"
import { RouterPropsDT } from "../../lib/types"

const Footer = ({ navigation }: RouterPropsDT) => {
  const { activeLink, handleActiveLink, setActiveLink, getIconElement } =
    useActiveLink()

  return (
    <View style={styles.conntainer}>
      {LINKS.map((link) => (
        <TouchableOpacity
          key={link.id}
          style={styles.footerLink}
          onPress={() => handleActiveLink(link.name, link.to)}
        >
          <View>{getIconElement(link.name, link.name === activeLink)}</View>
          <View>
            <Text
              style={[
                styles.footerLinkTxt,
                { color: link.name === activeLink ? "#54408C" : "black" },
              ]}
            >
              {link.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  conntainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  footerLink: {
    flexDirection: "column",
    alignItems: "center",
  },
  footerLinkTxt: {
    fontWeight: "bold",
  },
})
