import React,{Component} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class History extends Component {
    state = {
        data: [],
        token: '',
        cari: '',
      };

    componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {
          if (token != null) {
            this.setState({token: token});
            console.log(this.state.token);
            this.search()
          } else {
            alert('anda belum login');
          }
        });
      }

      search = () => {
        console.log(this.state.token);
        const url = "https://toressu.herokuapp.com/api/nasabah/tabungan"
    
        fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
           Authorization: `Bearer ${this.state.token}`
          },
        })
          .then((respon) => respon.json())
          .then((resJson) => {
            console.log(resJson);
            if (resJson.status == 'succes') {
              this.setState({data: resJson.data});
              ToastAndroid.show(
                'Tertampil',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
              console.log(this.state.data);
            } else {
              alert('error');
            }
          })
          .catch((error) => {
            console.log('error is ' + error);
          })
      };

  render() {
    return (
      <ScrollView style={{flex: 1}}>
         <View
          style={{
            backgroundColor: '#047af1f2',
            padding: 10,
            marginBottom: 10,
            elevation: 1,
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Buku Tabungan</Text>
        </View>
          {this.state.data.map((value,index)=>{
              return(
                <View
                style={{
                  marginHorizontal: '5%',
                  width: '90%',
                  backgroundColor: 'white',
                  elevation: 2,
                  paddingStart:5,
                  paddingVertical:5
                }}>
                    <Text>Tanggal: {value.tanggal}</Text>
                    <Text>Pukul: {value.waktu}</Text>
                    <Text>keterangan: {value.keterangan}</Text>
                    <Text>jenis sampah: {value.jenis_sampah}</Text>
                    <Text>berat: {value.berat} KG</Text>
                    <Text>Total Harga: Rp. {value.debet}</Text>
                    <Text>saldo bertambah: Rp. {value.saldo}</Text>
                </View>
              )
          })}
      
      </ScrollView>
    );
  }
}

export default History;
