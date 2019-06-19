import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';

type Props = {};
export default class LoginForm extends Component<Props> {

  constructor(props) {
    super(props);
  
    this.state = {
      email: '',
      password: ''
    }
  
    this.onButtonPress = this.onButtonPress.bind(this);
    this.storeUser = this.storeUser.bind(this);
  }

  onButtonPress() {
    const data = {
      email: this.state.email,
      password: this.state.password,
    }
    // Serialize and post the data
    const json = JSON.stringify(data);
    fetch(Config.API_URL_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: json
    })
    .then((response) => response.json())
    .then((json) => {
      this.storeUser(json.data);
      this.props.navigation.navigate('Home');
    })
    .catch((error) => {
      alert('failed to log in. \n' + error);
    })
    .done()
  }

  storeUser = async (values) => {
    try {
      await AsyncStorage.setItem('@currentToken', values.token);
      await AsyncStorage.setItem('@currentUserEmail', values.user.email);
    } catch (e) {
      alert('async storage failed' + e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          autoCapitalize='none'
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType='next'
          placeholder='Email'
          placeholderTextColor='rgba(225,225,225,0.7)'
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email} />

        <TextInput style={styles.input}
          returnKeyType='go'
          ref={(input) => this.passwordInput = input}
          placeholder='Password'
          placeholderTextColor='rgba(225,225,225,0.7)'
          secureTextEntry 
          onChangeText={(pwd) => this.setState({ password: pwd })}
          value={this.state.password}/>

        <TouchableOpacity style={styles.buttonContainer}
          onPress={this.onButtonPress}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  input: {
    height: 40,
    width: 150,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff'
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    width: 150
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
});