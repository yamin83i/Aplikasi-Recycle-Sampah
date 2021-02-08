import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Value} from 'react-native-reanimated';

export class RequestNasabah extends Component {
  state = {
    data: [],
    token: '',
    role: '',
    diterima: [],
    ditolak: [],
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
      'https://toressu.herokuapp.com/api/nasabah/penjemputan/show-request';

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
        this.setState({data: resJson.data.menunggu});
        this.setState({diterima: resJson.data.diterima});
        this.setState({ditolak: resJson.data.ditolak});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  cancel = (id) => {
    const url = `https://toressu.herokuapp.com/api/nasabah/penjemputan/request/cancel/${id}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log('ini resjon');
        console.log(resJson);
        ToastAndroid.show(
          'Berhasil Membatalkan',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.componentDidMount();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        {this.state.data == null ? (
          <View
            style={{
              backgroundColor: '#047af1f2',
              padding: 10,
              marginBottom: 10,
              elevation: 1,
            }}>
            <Text style={{fontSize: 20, color: 'white'}}>
              Detail Penjemputan
            </Text>
          </View>
        ) : (
          <View>
            <View
              style={{
                backgroundColor: '#047af1f2',
                padding: 10,
                marginBottom: 10,
                elevation: 1,
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>
                Detail Penjemputan
              </Text>
            </View>

            {this.state.data.map((value, index) => {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      elevation: 2,
                      paddingVertical: 7,
                    }}>
                    <Image style={Styles.image} source={{uri: value.image}} />
                    <View style={{flex: 1, marginStart: 10}}>
                      <Text style={Styles.fontsize}>
                        Nama: {value.nasabah.name}
                      </Text>
                      <Text style={Styles.fontsize}>
                        No Handphone: {value.nasabah.no_telephone}
                      </Text>
                      <Text style={Styles.fontsize}>
                        Lokasi: {value.lokasi}
                      </Text>
                      <Text style={Styles.fontsize}>
                        Status: {value.status} diterima Pengurus
                      </Text>
                    </View>
                  </View>
                  <Button
                    title="cancel Request"
                    color={'red'}
                    onPress={() => this.cancel(value.id)}
                  />
                </View>
              );
            })}
            <View>
              {this.state.diterima.map((value, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      elevation: 2,
                      paddingVertical: 7,
                      marginTop: 20,
                    }}>
                    <Image style={Styles.image} source={{uri: value.image}} />
                    <View style={{flex: 1, marginStart: 10}}>
                      <Text style={Styles.fontsize}>
                        Nama: {value.nasabah.name}
                      </Text>
                      <Text style={Styles.fontsize}>
                        No Handphone: {value.nasabah.no_telephone}
                      </Text>
                      <Text style={Styles.fontsize}>
                        Lokasi: {value.lokasi}
                      </Text>
                      <Text style={Styles.fontsize}>
                        Status: {value.status} Pengurus
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View>
              {this.state.ditolak.map((value, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      elevation: 2,
                      paddingVertical: 7,
                      marginTop: 20,
                    }}>
                    <Image style={Styles.image} source={{uri: value.image}} />
                    <View style={{flex: 1, marginStart: 10}}>
                      <Text style={Styles.fontsize}>
                        Nama: {value.nasabah.name}
                      </Text>
                      <Text style={Styles.fontsize}>
                        No Handphone: {value.nasabah.no_telephone}
                      </Text>
                      <Text style={Styles.fontsize}>
                        Lokasi: {value.lokasi}
                      </Text>
                      <Text style={Styles.fontsize}>
                        Status: {value.status} Pengurus
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

export default RequestNasabah;

const Styles = StyleSheet.create({
  image: {
    backgroundColor: 'red',
    width: 130,
    height: 160,
  },
  fontsize: {
    fontSize: 15,
  },
});
