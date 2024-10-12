import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect,useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const db = SQLite.openDatabase('Storage.db');

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function AddPlace({ route, navigation }) {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const handleTextInputChange = (text) => {
    setTitle(text);
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Quyền truy cập ảnh',
          'Bạn cần cấp quyền truy cập thư viện ảnh để có thể chọn ảnh.',
          [{ text: 'OK' }]
        );
      }
    })();
  }, []);
  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("URI of the selected image:", result.uri);
      setImage(result.uri);
    }
  };
  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("URI of the taken image:", result.uri);
      setImage(result.uri);
    } else if (result.cancelled && result.errorCode === 'E_PERMISSION_MISSING') {
      Alert.alert(
        'Quyền truy cập camera',
        'Bạn cần cấp quyền truy cập camera để có thể sử dụng chức năng này.',
        [{ text: 'OK' }]
      );
    }
  };

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
      } else {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      }
    })();
  }, []);

  const locateUser = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
  };
  const [region, setRegion] = useState(null);

  const [formattedAddress, setFormattedAddress] = useState('');
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setRegion({
          latitude: latitude, 
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421, 
        });

        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        const newFormattedAddress = address
          .map(
            (address) =>
              `${address.streetNumber} ${address.street}, ${address.city}, ${address.region}, ${address.country}`
          )
          .join(', ');

        setFormattedAddress(newFormattedAddress);
        console.log('Current Address:', newFormattedAddress);
      } else {
        console.log('Permission to access location was denied');
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const { latitude = 0, longitude = 0 } = route.params || {};
  const customLatitude = latitude;
  const customLongitude = longitude;
  const getCustomLocation = async (customLatitude, customLongitude) => {
    navigation.navigate('Map');

    try {
      if (typeof customLatitude === 'number' && typeof customLongitude === 'number') {
        const latitude = customLatitude;
        const longitude = customLongitude;

        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        const address = await Location.reverseGeocodeAsync({
          latitude: latitude,
          longitude: longitude,
        });

        const newFormattedAddress = address
          .map(
            (address) =>
              `${address.streetNumber} ${address.street}, ${address.city}, ${address.region}, ${address.country}`
          )
          .join(', ');

        setFormattedAddress(newFormattedAddress);
        console.log('Custom Location Address:', newFormattedAddress);
      } else {
        console.error('Invalid latitude or longitude values');
      }
    } catch (error) {
      console.error('Error getting custom location:', error);
    }
  };

  const addPlace = () => {
    const newPlace = {
      title: title,
      formattedAddress: formattedAddress,
    };
  
    if (customLatitude != 0 && customLongitude != 0) {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'INSERT INTO storage (title, image, formattedAddress, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
            [title, image, formattedAddress, customLatitude, customLongitude],
            (_, { insertId }) => {
              console.log('Place saved with ID:', insertId);
              console.log('Current Address:', formattedAddress);
              schedulePushNotification()
              navigation.navigate('My Places');
              
            },
            (error) => {
              console.error('Error saving place:', error);
            }
          );
        },
        null,
        null
      );
    }
    else {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'INSERT INTO storage (title, image, formattedAddress, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
            [title, image, formattedAddress, region.latitude, region.longitude],
            (_, { insertId }) => {
              console.log('Place saved with ID:', insertId);
              console.log('Current Address:', formattedAddress);
              schedulePushNotification()
              navigation.navigate('My Places');
            },
            (error) => {
              console.error('Error saving place:', error);
            }
          );
        },
        null,
        null
      );
    }


  };
  return (
    <View style={styles.container}>
      <View style={{}}>
        <Text style={styles.titleText}>
          Title
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Text...."
          onChangeText={handleTextInputChange}
          value={title}
        />
      </View>
      <View style={{}}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.noImageContainer}>
              <Text>No image taken yet</Text>
            </View>
          )}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 0 }}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.greenBorder}>

              <Image source={require('../assets/gallery.png')} style={styles.image2}>

              </Image>
              <Text style={styles.text}>Pick Image</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={takeImage}>
            <View style={styles.greenBorder}>

              <Image source={require('../assets/camera.png')} style={styles.image2}>

              </Image>
              <Text style={styles.text}>Take Image</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
      <View style={{marginTop: 10}}>
        <View style={{}}>

          {region ? (
            <View style={{ width:360, height: 210}}>
              <MapView style={{ width: 360, height: 210}} region={region}>
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
              </MapView>
            </View>
          ) : (
            <View style={{}}>
              <View style={styles.noImageContainer}>
                <Text>No location picked yet</Text>
              </View>
            </View>
          )}
        </View>
        <View style={{ marginTop: 70, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 20, }}>
          <TouchableOpacity onPress={getCurrentLocation}>
            <View style={styles.greenBorder}> 

              <Image source={require('../assets/map.png')} style={styles.image2}>

              </Image>
              <Text style={styles.text}>Locate User</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => getCustomLocation(customLatitude, customLongitude)}>
            <View style={styles.greenBorder}>

              <Image source={require('../assets/maps.png')} style={styles.image2}>

              </Image>
              <Text style={styles.text}>Pick on Map</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>


      <View style={{ marginTop: 20 }}>
        <Button title="Add Place" onPress={addPlace}></Button>
      </View>


    </View>
  );
}
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  titleText: {
    fontSize: 17,
    margin: 5,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    height: 230,
  },
  image: {
    width: 340,
    height: 210,
    marginBottom: 20,
  },
  noImageContainer: {
    width: 340,
    height: 210,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e1dd',
    marginHorizontal: 10,
  },
  greenBorder: {
    borderWidth: 2,
    borderColor: '#00BFFF',
    padding: 3,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    justifyContent: 'center',
    fontSize: 13,
    textAlignVertical: 'center',
    marginRight: 20,
  },
  image2: {
    width: 25,
    height: 25,
    marginLeft: 15,
  },
  noLocationContainer: { 
    height: 200, 
    alignSelf: 'center',
    backgroundColor: '#808080'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
});