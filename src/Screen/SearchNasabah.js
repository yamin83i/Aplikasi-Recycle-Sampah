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

class SearchNasabah extends React.Component {
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
    const url = "https://toressu.herokuapp.com/api/pengurus_satu/penyetoran/search-nasabah"

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

  search = () => {
    console.log('cari nasabah ....');
    console.log(this.state.token);
    const url = `https://toressu.herokuapp.com/api/pengurus_satu/penyetoran/search-nasabah/${this.state.cari}`

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
          alert('try again');
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
            width: '100%',
            height: 50,
            flexDirection: 'row',
            marginBottom: 10,
            backgroundColor: '#047af1f2',
          }}>
          <View
            style={{
              margin: 8,
              width: '95%',
              flexDirection: 'row',
              backgroundColor: '#fffffff5',
              borderRadius: 10,
              paddingStart: 10,
            }}>
            <View style={{justifyContent: 'center'}}>
              <Icon name="search" size={18} />
            </View>
            <View style={{justifyContent: 'center', width: '85%'}}>
              <TextInput
                style={styles.cari}
                placeholder="search"
                value={this.state.cari}
                onChangeText={(teks) => this.setState({cari: teks})}
                onEndEditing={() => this.search()}
              />
            </View>
          </View>
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
                    flexDirection:"row"
                  }}
                  onPress={()=> this.props.navigation.navigate("InputSampah",{item:value})}
                  >
                  <Image
                    style={{width: 70, height: 80,borderRadius:100,marginVertical:4,marginStart:3}}
                    source={{uri: value.profile_picture}}
                  />
                  <View style={{maxWidth: "90%"}}>
                    <Text style={styles.text}>{value.name}</Text>
                    <Text style={styles.text}>No Hp: {value.no_telephone}</Text>
                    <Text style={styles.text}>Email: {value.email}</Text>
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
export default SearchNasabah;

const styles = StyleSheet.create({
  cari: {
    height: 50,
  },
  text:{
    fontSize:20,
    paddingStart:4
  }
});
