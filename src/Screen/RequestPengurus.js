import React, {Component,useCallback} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity,Linking,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return (
   
      <Text style={{fontSize: 15}} onPress={handlePress}>{children}</Text>
   
  );
};

export class RequestNasabah extends Component {
  state = {
    data: [],
    token: '',
    role: '',
    id: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token}, () => this.getRequest());
      } else {
        console.log('tidak ada token');
      }
    });
  }

  getRequest = () => {
    const url =
      'https://toressu.herokuapp.com/api/pengurus_satu/penyetoran/show-request';

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
        console.log(resJson.data);
        this.setState({data: resJson.data});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  Accept = (id) => {
    const url = `https://toressu.herokuapp.com/api/pengurus_satu/penyetoran/accept-request/${id}`;

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
        if (resJson.status == 'succes') {
          console.log(resJson);
          this.componentDidMount();
        } else {
          alert('try again');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  Decline = (id) => {
    const url = `https://toressu.herokuapp.com/api/pengurus_satu/penyetoran/decline-request/${id}`;

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
        if (resJson.status == 'succes') {
          console.log(resJson);
          this.componentDidMount();
        } else {
          alert('try again');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  chat = (id) => {
    console.log('ini inini ', id);
    const url = `https://toressu.herokuapp.com/api/message/fetch-message`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        user_id: id,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log('ini id ku ');
        console.log(resJson);
        const {status} = resJson
        console.log(status);
        if (status == 'success') {
          this.props.navigation.navigate('Chat', {id: id});
        } else {
          alert('try again');
        }
      })
      .catch((err) => {
        console.log('selesai.');
        console.log(err);
      });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#047af1f2',
            padding: 10,
            marginBottom: 10,
            elevation: 1,
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Detail Penjemputan</Text>
        </View>
        {this.state.data.map((value, index) => {
          return (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                }}>
                <Image style={Styles.image} source={{uri: value.image}} />
                <View style={{flex: 1, marginStart: 10}}>
                  <Text style={Styles.fontsize}>
                    Nama: {value.nasabah.name}
                  </Text>
                  <Text style={Styles.fontsize}>
                    No Handphone: {value.nasabah.no_telephone}
                  </Text>
                  <Text style={Styles.fontsize}>Lokasi:</Text>
                  <OpenURLButton url={value.lokasi}>{value.lokasi}</OpenURLButton>
               
                  <Text style={Styles.fontsize}>
                    Status: {value.status} diterima Pengurus
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: '#06d7ef',
                  padding: 5,
                }}
                onPress={() => this.chat(value.nasabah_id)}>
                <Text style={{color: 'white', fontSize: 20}}>Chat</Text>
              </TouchableOpacity>
              <View
                style={{flexDirection: 'row', width: '100%', marginBottom: 10}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fa1e1ee8',
                    padding: 5,
                    alignItems: 'center',
                    width: '50%',
                  }}
                  onPress={() => this.Decline(value.id)}>
                  <Text style={{color: 'white', fontSize: 20}}>Tolak</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#047af1f2',
                    padding: 5,
                    alignItems: 'center',
                    width: '50%',
                  }}
                  onPress={() => this.Accept(value.id)}>
                  <Text style={{color: 'white', fontSize: 20}}>Setuju</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default RequestNasabah;

const Styles = StyleSheet.create({
  image: {
    backgroundColor: 'white',
    width: 130,
    height: 160,
  },
  fontsize: {
    fontSize: 15,
  },
});
