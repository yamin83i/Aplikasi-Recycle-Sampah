import React from 'react';
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

class SearchPengepul extends React.Component {
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
        this.searc()
      } else {
        alert('anda belum login');
      }
    });
  }

  searc = () => {
    console.log('cari nasabah ....');
    console.log(this.state.token);
    const url = "https://toressu.herokuapp.com/api/pengurus_dua/penjualan/show-pengepul"

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
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#047af1f2',
            padding: 10,
            marginBottom: 10,
            elevation: 1,
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Cari Pengepul</Text>
        </View>
        <ScrollView style={{flex: 1}}>
          <View style={{width:"99%"}}>
            {this.state.data.map((value, index) => {
              return (
                <TouchableOpacity
                  key={value.id}
                  style={{
                    marginStart: '2%',
                    backgroundColor: 'white',
                    elevation: 3,
                    borderRadius: 9,
                    Width: '43%',
                    marginBottom: 10,
                  }}
                  onPress={()=> this.props.navigation.navigate("SellSampah",{item:value})}
                  >
               
                  <View style={{maxWidth: "90%"}}>
                    <Text style={styles.text}>Nama:</Text>
                    <Text style={styles.text}>{value.pengepul}</Text>
                   
                  </View>
                  
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default SearchPengepul;

const styles = StyleSheet.create({
  cari: {
    height: 50,
  },
  text:{
    fontSize:20,
    paddingStart:4,

  }
});
