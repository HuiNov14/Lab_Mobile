import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Media from './Media';
import Record from './Record';
const Stack = createNativeStackNavigator();
const MyGallery = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Gallery" component={Media} options={{ headerShown: false }}/>
      <Stack.Screen name="Record Video" component={Record} />
    </Stack.Navigator>
  )
}

export default MyGallery