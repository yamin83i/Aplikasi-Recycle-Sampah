import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

export class Home extends Component {
  state = {
    role: '',
    token: '',
    data: {},
  };

  componentDidMount() {
    AsyncStorage.getItem('role').then((role) => {
      console.log('respon si' + role);
      if (role != null) {
        console.log(role);
        this.setState({role: role});
      } else {
        console.log('tidak ada role');
      }
    });
    AsyncStorage.getItem('token').then((token) => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token});
        this.getData();
      } else {
        console.log('tidak ada token');
      }
    });
  }

  getData = () => {
    const url = 'https://toressu.herokuapp.com/api/nasabah/home';

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
        this.setState({data: resJson});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  Saldo() {
    const total = this.state.data.saldo;

    return <Text>{this.toPrice(total)}</Text>;
  }

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: '#047af1f2',
            padding: 10,
            elevation: 1,
          }}>
            {this.state.role == "nasabah" ? (

              <Text style={{fontSize: 20, color: 'white'}}>
            Welcome, {this.state.data.name}
          </Text>
            ):(
              <Text style={{fontSize: 20, color: 'white'}}>
            Welcome, Pengurus
          </Text>
            )}
        </View>
        {this.state.role == "nasabah" ? (
            <View
            style={{
              backgroundColor: '#047af1f2',
              width: '95%',
              elevation: 4,
              margin: '2.5%',
              padding: 5,
            }}>
            <Text style={{fontSize: 20, color: 'white'}}>
              Saldo Anda Saat ini:
            </Text>
            <Text style={{fontSize: 30, alignSelf: 'flex-end', color: 'white'}}>
              Rp. {this.Saldo()}
            </Text>
          </View>
        ):(
          <View></View>
        )}
      
        <ImageBackground
          source={{
            uri:
              'https://cdn.dribbble.com/users/2155131/screenshots/7030971/media/23b334cda4364fbeb3ca5abefbefe3a4.jpg?compress=1&resize=800x600',
          }}
          style={{width: '100%', height: 280, resizeMode: 'stretch'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 17, paddingTop: 10,color:"#0a801f"}}>
              "Jagalah Bumimu, Cintailah Masa Depanmu"
            </Text>
          </View>
        </ImageBackground>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          {this.state.role == 'nasabah' ? (
            <TouchableOpacity
              style={{paddingHorizontal: 20, alignItems: 'center'}}
              onPress={() => this.props.navigation.navigate('SetorSampah')}>
              <Image
                source={require('../Image/iconsampah.png')}
                style={{width: 50, height: 50}}
              />
              <Text>Setor Sampah</Text>
            </TouchableOpacity>
          ) : (
            <View>
              {this.state.role == 'pengurus-satu' ? (
                <TouchableOpacity
                  style={{paddingHorizontal: 20, alignItems: 'center'}}
                  onPress={() =>
                    this.props.navigation.navigate('SearchNasabah')
                  }>
                  <Image
                    source={require('../Image/iconsampah.png')}
                    style={{width: 50, height: 50}}
                  />
                  <Text>Setor Sampah</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{paddingHorizontal: 20, alignItems: 'center'}}
                  onPress={() =>
                    this.props.navigation.navigate('SearchPengepul')
                  }>
                  <Image
                    source={require('../Image/iconsampah.png')}
                    style={{width: 50, height: 50}}
                  />
                  <Text>Input Sampah</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <View>
            {this.state.role == 'nasabah' ? (
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() =>
                  this.props.navigation.navigate('RequestNasabah')
                }>
                <Image
                  source={require('../Image/pngwing.com.png')}
                  style={{width: 50, height: 50}}
                />
                <Text> Detail Penjemputan</Text>
              </TouchableOpacity>
            ) : (
              <View>
                {this.state.role == "pengurus-satu" ? (

                  <TouchableOpacity
                  style={{paddingHorizontal: 20, alignItems: 'center'}}
                  onPress={() =>
                    this.props.navigation.navigate('RequestPengurus')
                  }>
                <Image
                  source={require('../Image/pngwing.com.png')}
                  style={{width: 50, height: 50}}
                  />
                <Text> Detail Penjemputan</Text>
              </TouchableOpacity>
                  ):(
                    <TouchableOpacity
                    style={{paddingHorizontal: 20, alignItems: 'center'}}
                    onPress={() =>
                      this.props.navigation.navigate('ListPengepul')
                    }>
                  <Image
                    source={require('../Image/pngwing.com.png')}
                    style={{width: 50, height: 50}}
                    />
                  <Text>List Pengepul</Text>
                  </TouchableOpacity>
                  )}
                  </View>
            )}
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {this.state.role == 'nasabah' ? (
            <TouchableOpacity
              style={Styles.icon}
              onPress={() => this.props.navigation.navigate('History')}>
              <Icon name="time-sharp" size={50} />
              <Text>Buku Tabungan</Text>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
          <View></View>
          {this.state.role == 'nasabah' ? (
            <TouchableOpacity style={{...Styles.icon,marginStart:10}} onPress={()=>this.props.navigation.navigate("PenarikanSaldo")}>
              <Image
                source={require('../Image/penarikan.jpeg')}
                style={{width: 50, height: 50}}
              />
              <Text>penarikan Saldo</Text>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default Home;

const Styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
