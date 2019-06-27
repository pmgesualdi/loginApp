import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
import { Spinner } from 'native-base';
import { toaster } from './Toaster';

type Props = {};
export default class LoginForm extends Component<Props> {

  constructor(props) {
    super(props);
  
    this.state = {
      email: '',
      password: '',
      loading: false
    }
  
    this.onButtonPress = this.onButtonPress.bind(this);
    this.storeUser = this.storeUser.bind(this);
  }

  onButtonPress() {
    this.setState({ loading: true });

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
      this.setState({ loading: false });

      if (json.error) {
        toaster.showToast(json.error, 'danger');
      } else {
        this.storeUser(json.data);
        this.props.navigation.navigate('Profile');
      }
    })
    .catch((error) => {
      this.setState({ loading: false });
      toaster.showToast('Hubo un error en el login', 'danger');
      console.log('failed to log in. \n' + error);
    })
    .done()
  }

  storeUser = async (values) => {
    try {
      await AsyncStorage.setItem('@currentToken', values.token);
      await AsyncStorage.setItem('@currentUserEmail', values.user.email);
    } catch (error) {
      toaster.showToast('Hubo un error al obtener los datos del user', 'danger');
      console.log('async storage failed. \n' + error);
    }
  }

  render() {
    const isLoading = this.state.loading;
    let content;

    if (isLoading) {
      content = <Spinner />;
    } else {
      content = 
        <View>
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
        </View>;
    }
      
    return (
      <View style={styles.container}>
        {content}
      </View>
    )
  };
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
    width: 200,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff'
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    width: 200
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
});