import { StatusBar } from 'expo-status-bar';
import React , { useContext }from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import AddPlace from './AddPlace';
import MyPlaces from './MyPlaces';
import Map from './Map';
import Info from './Info';
import MapInfo from './MapInfo';
export default function Places({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Places"
        component={MyPlaces}
        options={{
          headerRight: () => (
            <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('Add a new Place')}>
               <Image source={require('../assets/plus.png')} style={styles.add}/>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Add a new Place" component={AddPlace} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Map Info" component={MapInfo} />
    </Stack.Navigator>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAdd: {
  
    marginRight:15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
   height:30,
   width:30,
  },
});
