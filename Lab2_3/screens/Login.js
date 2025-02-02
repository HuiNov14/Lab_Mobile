import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './AuthContext';

const Login = () => {

  const navigation = useNavigation();

  const { email, setEmail, password, setPassword, isAuthenticated, setisAuthenticated } = useContext(AuthContext);

  const handleLogin = (email, password) => {
    // Thêm xử lý đăng nhập tại đây
    if (email === '21520910@gm.uit.edu.vn' && password === 'buiminhhuy') {
      setisAuthenticated(true);
    } else {
      Alert.alert('Warning', 'incorrect email or password.');
    };
  };
  const handleOnPressSignup = () => {
    navigation.navigate('Signup');
  };

  return (

    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../assets/piggy-bank.png')}
      />
      <Text style={styles.text}>Welcome</Text>
      <View style={styles.containerTextInput}>
        <Image style={styles.imageTextInput}
          source={require('../assets/mail.png')}>

        </Image>
        <TextInput
          style={styles.textI}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.containerTextInput}>
        <Image style={styles.imageTextInput}
          source={require('../assets/padlock.png')}>

        </Image>
        <TextInput
          style={styles.textI}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.forgotContainer}>
        <Text style={styles.Forgot}>Forgot password?</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleLogin(email, password)} >
        <Text style={styles.textLogin}>LOG IN</Text>
      </TouchableOpacity>
      <Text style={styles.text}> Or login with</Text>

      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle2}
          source={require('../assets/facebook.png')}
        />
        <Image
          style={styles.imageStyle2}
          source={require('../assets/google.png')}
        />
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText2}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleOnPressSignup}>
          <Text style={styles.signUpText}>Sign up here.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#ffb5a7',
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 120,
  },
  text: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#003049',
  },
  textInput: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 25,
    color: '#003049',
  },
  Forgot: {
    fontSize: 12,
    marginTop: 5,
    marginRight: 20,
    color: '#FF1493',
  },
  button: {
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    width: 300,
    alignSelf: 'center',
    height: 45,
  },
  textLogin: {
    fontSize: 15,
    color: '#003049',
    alignSelf: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  imageStyle2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignSelf: 'center',
  },
  signUpText: {
    color: 'blue',
  },
  signUpText2: {
    color: '#003049',
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginRight: 25,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  iconContainer: {
    padding: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  textI: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    color: '#003049',
  },
  containerTextInput: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: '#ede7e3',
  },
  imageTextInput: {
    width: 27,
    height: 27,
    marginTop: 11,
    marginLeft: 12,
  },
})
export default Login;