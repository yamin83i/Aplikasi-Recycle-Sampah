import React, {Component} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  ImageBackground,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  register = () => {
    const {
      name,
      email,
      password,
      password_confirmation,
    } = this.state;
    const url = 'https://toressu.herokuapp.com/api/auth/register';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      }),
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.token) {
          this.props.navigation.replace('Login');
          ToastAndroid.show(
            'Register Berhasil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          alert('try again');
        }
      })
      .catch(error => {
        console.log('error is ' + error);
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../Image/d0fe3a2cc79628c6a017f0066d4dee63.jpeg')}
          style={styles.image}
          imageStyle={{width: '100%', resizeMode: 'cover'}}>
          <View
            style={{
              backgroundColor: '#ffffffde',
              margin: 20,
              elevation: 1,
              borderRadius: 5,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 30, color:"#1b95c5e8"}}>Torasshu</Text>
            </View>
            <View style={styles.mail}>
              <Icon name="user" size={20} />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '90%',
                }}
                placeholder="Username"
                value={this.state.name}
                onChangeText={(teks) => this.setState({name: teks})}
              />
            </View>
            <View style={styles.mail}>
              <Icon name="mail" size={20} />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '90%',
                }}
                placeholder="Email"
                value={this.state.email}
                onChangeText={(teks) => this.setState({email: teks})}
              />
            </View>
            <View style={styles.mail}>
              <Icon name="lock" size={20} />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '90%',
                }}
                placeholder="Password"
                value={this.state.password}
                onChangeText={(teks) => this.setState({password: teks})}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.mail}>
              <Icon name="lock" size={20} />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '90%',
                }}
                placeholder="Password Confirmation"
                value={this.state.password_confirmation}
                onChangeText={(teks) => this.setState({password_confirmation: teks})}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1b95c5e8',
                marginHorizontal: '5%',
                height: 30,
                marginVertical: 10,
                marginTop:20
              }} onPress={()=>this.register()}>
              <Text style={{color: 'white',fontSize:17}}>Sign Up</Text>
            </TouchableOpacity>
            
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  mail: {
    width: '90%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 7,
  },
 
});
