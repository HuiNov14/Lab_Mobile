import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Info = ({ route, navigation }) => {
  const { note } = route.params;
  return (
    <View style={styles.container}>
      
        <Image source={{ uri: note.image }} style={styles.image} />
        <Text style={styles.addressText}>{note.formattedAddress}</Text>
     
        <TouchableOpacity onPress={() => navigation.navigate('Map Info', { note})}>
          <View style={styles.textContainer}>
            <Image source={require('../assets/maps.png')} style={styles.image2}></Image>
            <Text style={styles.Text}>View on Map</Text>
          </View>
        </TouchableOpacity>
  
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 15, 
    fontWeight: 'bold', 
    alignItems: 'center', 
    marginTop: 20,
  },
  Text: {
    alignSelf: 'center'
  },
  textContainer: {
    marginTop: 20,
    borderWidth: 2, 
    borderColor: '#87CEEB', 
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonAdd: {
    backgroundColor: 'orange',
    borderRadius: 25,
    width: 31,
    height: 31,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  image: {
    marginTop: 30,
    alignSelf: 'center',
    width: 360,
    height: 300,
  },
  image2: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    marginRight: 5,
  },
});

export default Info