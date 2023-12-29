import { Tabs } from 'expo-router'
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'
import { Text } from 'react-native'

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? '#54408C' : color || 'black'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#54408C' : 'black' }}>Home</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="notes"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="list-alt"
              size={24}
              color={focused ? '#54408C' : color || 'black'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#54408C' : 'black' }}>Notes</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="person"
              size={24}
              color={focused ? '#54408C' : color || 'black'}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#54408C' : 'black' }}>
              Profile
            </Text>
          ),
          headerTitle: 'Profile',
          headerTitleAlign: 'center',
        }}
      />
    </Tabs>
  )
}
