import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Home = () => {
  return (
    <View style={styles.homeContainer}>
      <Text>Hi Yusuf 👋</Text>
      <View style={styles.notesWrapper}>
        <View style={styles.noteContainer}>
          <View style={styles.notesTop}>
            <Text style={styles.noteTitle}>Title</Text>
            <Text style={styles.noteDescription}>Description</Text>
          </View>
          <View style={styles.noteBottom}>
            <Text>Created At: 00/00/000</Text>
            <TouchableOpacity>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.noteContainer}>
          <View style={styles.notesTop}>
            <Text style={styles.noteTitle}>Title</Text>
            <Text style={styles.noteDescription}>Description</Text>
          </View>
          <View style={styles.noteBottom}>
            <Text>Created At: 00/00/000</Text>
            <TouchableOpacity>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.noteContainer}>
          <View style={styles.notesTop}>
            <Text style={styles.noteTitle}>Title</Text>
            <Text style={styles.noteDescription}>Description</Text>
          </View>
          <View style={styles.noteBottom}>
            <Text>Created At: 00/00/000</Text>
            <TouchableOpacity>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  homeContainer: {
    height: '100%',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  notesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  noteContainer: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FAF9FD',
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#7D64C3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  noteDescription: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  notesTop: {
    // position: 'absolute',
    // top: 5,
    // left: 8,
    // right: 8,
  },
  noteBottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    // position: 'absolute',
    // bottom: 5,
    // left: 8,
    // right: 8,
  },
  deleteButtonText: {
    color: '#EF5A56',
    fontWeight: 'bold',
  },
})
