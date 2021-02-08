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
import {Picker} from '@react-native-picker/picker';
import _ from 'lodash';

export default class InputSampah extends Component {
  state = {
    nasabah_id: this.props.route.params.item.id,
    keterangan_penyetoran: 'dijemput',
    lokasi: '',
    token: '',
    lokasi2: this.props.route.params.item.penjemputan[0],
    sampah: [],
    sampah2: '',
    berat: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token}, () => this.getSampah());
      } else {
        console.log('tidak ada token');
      }
    });
  }

  getSampah = () => {
    const url = 'https://toressu.herokuapp.com/api/sampah';

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
          this.setState({sampah: resJson.data});
          console.log('ini ', this.state.sampah);
        } else {
          alert('try again');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  harga() {
    const total = this.state.berat * this.state.sampah2.harga_perkilogram;

    return <Text>{this.toPrice(total)}</Text>;
  }

  Input = () => {
    const {keterangan_penyetoran, nasabah_id, lokasi} = this.state;

    var sampah = [
      {
        sampah_id: this.state.sampah2.id,
        berat: this.state.berat,
      },
    ];

    let form = new FormData();

    sampah.forEach((v, i) => {
      form.append(`sampah[${i}][sampah_id]`, v.sampah_id);
      form.append(`sampah[${i}][berat]`, v.berat);
    });

    form.append('keterangan_penyetoran', keterangan_penyetoran);
    form.append('lokasi', lokasi);
    form.append('nasabah_id', nasabah_id);
    form.append('auto_confirm', true);

    console.log('ini', form);

    const url =
      'https://toressu.herokuapp.com/api/pengurus_satu/penyetoran/store';

    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
      body: form,
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.status == 'succes') {
          ToastAndroid.show(
            'Data Berhasil TerInput',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
         this.props.navigation.navigate("SearchNasabah")
        } else {
          alert('try again');
        }
      })
      .catch((error) => {
        console.log('error is ' + error);
      });
  };

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  render() {
    console.log(this.state.sampah2.id);
    return (
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#047af1f2',
            padding: 10,
            elevation: 1,
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>InputSampah</Text>
        </View>

        <ImageBackground
          style={{flex: 1,justifyContent:"center"}}
          imageStyle={{width: '100%', resizeMode:"stretch"}}
          source={{
            uri:
              'https://d2bx8750e9pm7x.cloudfront.net/22405/cc3662bca72a16de276643926cc36c44_large.jpg',
          }}>
          <View
            style={{
              width: '94%',
              backgroundColor: '#f4f1f1e6',
              elevation: 2,
              margin: 10,
            }}>
            {this.state.lokasi2 == null ? (
              <View style={{paddingHorizontal: 5}}>
                <Text
                  style={{...styles.sizeteks, paddingBottom: 4, paddingTop: 5}}>
                  Lokasi Saat ini
                </Text>
                <TextInput
                  style={{borderWidth: 0.5}}
                  placeholder="Location"
                  value={this.state.lokasi}
                  onChangeText={(teks) => this.setState({lokasi: teks})}
                />
              </View>
            ) : (
              <View style={{paddingHorizontal: 5}}>
                <Text style={{...styles.sizeteks, paddingBottom: 4}}>
                  Lokasi Saat ini
                </Text>
                <TextInput
                  style={{borderWidth: 0.5}}
                  placeholder="Location"
                  value={this.props.route.params.item.penjemputan[0].lokasi}
                  onChangeText={() =>
                    this.setState({
                      lokasi: this.props.route.params.item.penjemputan[0]
                        .lokasi,
                    })
                  }
                />
              </View>
            )}
            <View style={{paddingHorizontal: 5, marginTop: 10}}>
              <Text style={{...styles.sizeteks, paddingBottom: 4}}>
                keterangan penyetoran
              </Text>
              <Picker
                selectedValue={this.state.keterangan_penyetoran}
                style={{height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({keterangan_penyetoran: itemValue})
                }>
                <Picker.Item label="Dijemput" value={'dijemput'} />
                <Picker.Item label="Diantar" value={'diantar'} />
              </Picker>
            </View>
            <View style={{paddingHorizontal: 5, marginTop: 10}}>
              <View>
                <Text style={{...styles.sizeteks}}>Jenis Sampah</Text>

                <Picker
                  selectedValue={this.state.sampah_id}
                  style={{height: 50, width: 270}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({sampah2: itemValue})
                  }>
                  {this.state.sampah.map((value, key) => {
                    return (
                      <Picker.Item label={value.jenis_sampah} value={value} />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={{margin: 5}}>
              <Text style={{...styles.sizeteks}}>Berat Sampah</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  value={this.state.berat}
                  style={{borderWidth: 0.5, width: '20%'}}
                  placeholder="total berat"
                  onChangeText={(teks) => this.setState({berat: teks})}
                />
                <Text style={{fontSize: 20, marginStart: 5}}>KG</Text>
              </View>
            </View>
            <View style={{margin: 5}}>
              <Text style={{...styles.sizeteks}}>Harga perKG</Text>
              <View style={{borderWidth: 0.5, padding: 10, width: 105}}>
                <Text>Rp. {this.state.sampah2.harga_perkilogram}</Text>
              </View>
            </View>
            <View style={{margin: 5}}>
              <Text style={{...styles.sizeteks}}>Total Harga</Text>
              <View style={{borderWidth: 0.5, padding: 10, width: 105}}>
                <Text>Rp. {this.harga()}</Text>
              </View>
            </View>
            <Button title="Input" onPress={() => this.Input()} />
          </View>
        </ImageBackground>
      </ScrollView>
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
  sizeteks: {
    fontSize: 18,
  },
});
