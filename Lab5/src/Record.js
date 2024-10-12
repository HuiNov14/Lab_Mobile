import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';

export default function Record() {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [record, setRecord] = useState(null);
  const video = React.useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [status, setStatus] = React.useState({});
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');
    })();
  }, []);

  const takeVideo = async () => {
    if (camera) {
      setIsRecording(true);
      const data = await camera.recordAsync({
        maxDuration: 10
      });
      setIsRecording(false);
      setRecord(data.uri);
      console.log(data.uri);
    }
  };

  const stopVideo = () => {
    if (camera) {
      camera.stopRecording();
      setIsRecording(false);
    }
  };

  const reRecord = () => {
    setRecord(null);
  };

  if (hasCameraPermission === null || hasAudioPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        {record ? (
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: record,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
        ) : (
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fixedRatio}
            type={type}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              {isRecording ? (
                <TouchableOpacity
                  style={styles.iconImg}
                  onPress={() => stopVideo()}
                >
                  <Image source={require('../assets/stop.png')} style={styles.image2} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.iconImg}
                  onPress={() => takeVideo()}
                >
                  <Image source={require('../assets/start.png')} style={styles.image2} />
                </TouchableOpacity>
              )}
            </View>
          </Camera>
        )}

        {record && (
          <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 5, alignSelf: 'center' }}>
            <TouchableOpacity onPress={() => reRecord()} style={styles.recordC}>
              <Text style={styles.reRecordText}>Re-record</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveC}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  fixedRatio: {
    flex: 1,
  },
  video: {
    alignSelf: 'center',
    width: 860,
    height: 680,
  },
  image2: {
    width: 50,
    height: 50,
  },
  reRecordText: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  saveC: {
    width: 80,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginLeft: 10,
  },
  saveText: {
    alignSelf: 'center', 
    marginTop: 5, 
    fontSize: 17, 
    color: 'white', 
    fontWeight: 'bold'
  },
  recordC: {
    width: 120, 
    height: 40, 
    backgroundColor: 'red', 
    borderRadius: 10
  },
  iconImg: {
    alignItems: 'center',
    marginBottom: 30 
  },
});
