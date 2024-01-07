import { useState, useEffect } from 'react'
import axios from 'axios'
import FetchLoggedInUserInfo from './FetchLoggedInUserInfo'
import { Alert } from 'react-native'
import { BASE_API_URL } from '../lib/baseApiUrl'

const FetchNotes = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  const { loggedInUserInfo } = FetchLoggedInUserInfo()

  const fetchNotes = async () => {
    const id = loggedInUserInfo?.id
    const notesRequest = {
      id: id,
    }

    setLoading(true)
    try {
      const response = await axios.post(
        `${BASE_API_URL}/get_notes`,
        notesRequest,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.data
      setNotes(data.message)
    } catch (error: any) {
      if (error.response && error.response.status) {
        console.log(error.response.data)
        Alert.alert('Error', error.response.data.message, [{ text: 'OK' }])
      } else {
        console.log(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const deleteNote = async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_API_URL}/delete_note/${id}`)
      const data = await response.data
      if (data.status === 'success') {
        fetchNotes()
        Alert.alert('Deleted!', data.message, [{ text: 'OK' }])
      }
    } catch (error: any) {
      if (error.response && error.response.status) {
        console.log(error.response.data)
        Alert.alert('Error', error.response.data.message, [{ text: 'OK' }])
      } else {
        console.log(error.message)
      }
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return { notes, loading, fetchNotes, deleteNote }
}

export default FetchNotes
