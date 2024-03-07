import { StyleSheet, View } from "react-native"

const Skeleton = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonItem} />
      <View style={[styles.skeletonItem, { width: "80%" }]} />
      <View style={[styles.skeletonItem, { width: "60%" }]} />
    </View>
  )
}

export default Skeleton

const styles = StyleSheet.create({
  skeletonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    marginBottom: 15,
  },
  skeletonItem: {
    backgroundColor: "#CCCCCC",
    height: 20,
    marginBottom: 8,
  },
})
