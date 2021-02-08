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
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Register extends Component {
  state = {
    user: {},
    token: '',
    role:""
  };

  componentDidMount() {
    this.ambldata();
  }

  ambldata = () => {
    AsyncStorage.getItem('token').then((token) => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token},()=>this.getData());
      } 
      else {
        console.log('tidak ada token');
      }
    });
    AsyncStorage.getItem('role').then((role) => {
      console.log('respon si' + role);
      if (role != null) {
        console.log(role);
        this.setState({role: role});
      } else {
        console.log('tidak ada role');
      }
    });
  };

  getData = () => {
    const url = 'https://toressu.herokuapp.com/api/profile';

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log('ini resjon');
        console.log(resJson);
        this.setState({user: resJson.data});
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  logout() {
    AsyncStorage.clear();
    this.props.navigation.replace('Login');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        
          <View style={{backgroundColor: '#047af1f2', elevation: 5,paddingStart:5}}>
            <Text style={{fontSize: 30,color:"white"}}>Detail Akun</Text>
          </View>
          <ScrollView>

          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              margin: 10,
              backgroundColor: 'white',
              elevation: 5,
            }}>
            <Image
              style={{
                width: 70,
                height: 70,
                backgroundColor: 'blue',
                borderRadius: 100,
              }}
              source={{uri: this.state.user.profile_picture}}
              />
            <View>
              <Text
                style={{
                  fontSize: 20,
                  paddingStart: 30,
                  textDecorationLine: 'underline',
                  paddingTop: 10,
                }}>
                {this.state.user.name}{' '}
              </Text>
              <Text style={{fontSize: 17, paddingStart: 10}}>
                "Manusia Peduli Sampah"
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#ffffffd4',
              marginHorizontal: 10,
              elevation: 3,
              paddingBottom: 10,
            }}>
            <View style={styles.mail}>
              <Icon name="mail" size={20} />
              <View
                style={{
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  width: '90%',
                }}>
                <Text style={{fontSize: 17}}>Email</Text>
                <Text style={{fontSize: 17}}>{this.state.user.email}</Text>
              </View>
            </View>
            <View style={styles.mail}>
              <Icon name="phone" size={20} />
              <View
                style={{
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  width: '90%',
                }}>
                <Text style={{fontSize: 17}}>No. Telephone</Text>
                <Text style={{fontSize: 17}}>
                  {this.state.user.no_telephone}
                </Text>
              </View>
            </View>
            <View style={styles.mail}>
              <Icon name="home" size={20} />
              <View
                style={{
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  width: '90%',
                }}>
                <Text style={{fontSize: 17}}>Alamat</Text>
                <Text style={{fontSize: 17}}>{this.state.user.location}</Text>
              </View>
            </View>
            <View style={styles.mail}>
              <Icon name="user-check" size={20} />
              <View
                style={{
                  marginHorizontal: 10,
                  borderBottomWidth: 1,
                  width: '90%',
                }}>
                <Text style={{fontSize: 17}}>Status</Text>
                <Text style={{fontSize: 17}}>{this.state.user.role}</Text>
              </View>
            </View>
          
          </View>

          <View
            style={{
              backgroundColor: 'white',
              marginHorizontal: 10,
              elevation: 3,
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={styles.help}
              onPress={() => this.props.navigation.navigate('Contact')}>
              <Text>Chat</Text>
              <Icon name="message-circle" />
            </TouchableOpacity>
            {this.state.role == "nasabah" ? (

              <TouchableOpacity
              style={styles.help}
              onPress={() => this.props.navigation.navigate('EditProfile')}>
              <Text>Edit Profile</Text>
              <Icon name="user-check" />
            </TouchableOpacity>
                ):(<View></View>)}
            <TouchableOpacity
              style={styles.logout}
              onPress={() => this.logout()}>
              <Text>Log Out</Text>
              <Icon name="log-out" />
            </TouchableOpacity>
          </View>
       
</ScrollView>
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
    marginTop: 10,
  },
  pesan: {
    width: '90%',
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    paddingStart: 10,
    flexDirection: 'row',
    elevation: 5,
    marginTop: 30,
    marginStart: 15,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  help: {
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    paddingStart: 15,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  logout: {
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingStart: 15,
  },
});
