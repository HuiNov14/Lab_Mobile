import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity,FlatList } from 'react-native';
import React, { useContext,useState, useRef,useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';
export default function Media({navigation}) {
  const [media, setMedia] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  
  useEffect(() => {
    (async () => {
      await getMediaAssets();
    })();
  }, []);

  const getMediaAssets = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      const mediaAssets = await MediaLibrary.getAssetsAsync();
      setMedia(mediaAssets.assets);
    }
  };
  const handlePress = async () => {
    await getMediaAssets();
  };
  const toggleNumColumns = () => {
    setNumColumns((prevNumColumns) => (prevNumColumns === 2 ? 1 : 2));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Gallery</Text>
       <TouchableOpacity onPress={() => navigation.navigate('Record Video')}>
        <Image source={require('../assets/record.png')} style={styles.icon}>
        </Image>
        </TouchableOpacity>
      </View>
      <View style={{}}>
      <FlatList
        data={media}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            {item.mediaType === 'video' ? (
              <Video
              source={{ uri: item.uri }}
              style={styles.vid}
              resizeMode="cover"
              useNativeControls
            />
              
            ) : (
              <Image
                source={{ uri: item.uri }}
                style={styles.img}
              />
            )}
          </TouchableOpacity>
        )}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignSelf: 'center',
    tintColor: 'red',
    marginTop: 10,
    marginRight: 15,
  },
  header: {
    height: 80, 
    backgroundColor: 'white', 
    flexDirection: 'row', 
    paddingTop: 20, 
    justifyContent: 'space-between' 
  },
  headerText: {
    justifyContent: 'center', 
    alignSelf: 'center', 
    fontSize: 17, 
    marginLeft: 15, 
    fontWeight: 'bold' 
  },
  img: {
    width: 180, 
    height: 135,
    marginTop:10,
    alignContent:'center' 
  },
  vid: {
    width: 100, 
    height: 100 
  },
});
