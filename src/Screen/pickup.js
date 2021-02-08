import React, {Component,useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Button,
  ToastAndroid,
  Linking,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

const maps = "https://www.google.com/maps"

const OpenURLButton = ({ url, children }) => {
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
  }, [url])
  return( 
       <TouchableOpacity style={{backgroundColor:"#5d8bd0f0",alignItems:"center",margin:10,marginHorizontal:20,borderRadius:5,padding:5}} onPress={handlePress}>
            <Text>{children}</Text>
          </TouchableOpacity>
  )
}

export class pickup extends Component {
  state = {
    lokasi: '',
    token: '',
    image: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token});
      } else {
        console.log('tidak ada token');
      }
    });
  }

  Setor = () => {
    const {lokasi, image} = this.state;
    const url = 'https://toressu.herokuapp.com/api/nasabah/penjemputan/request';
    const data = {
      lokasi: lokasi,
    };

    fetch(url, {
      method: 'POST',
      body: this.createFromData(image, data),
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.state.token,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.status == 'succes') {
          this.setState({data: resJson.data});
          this.props.navigation.replace('RequestNasabah');
          ToastAndroid.show(
            'Barang Bertambah',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          console.log(resJson.error);
          alert('try again');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  createFromData = (photo, body) => {
    const data = new FormData();
    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    return data;
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.uri) {
        this.setState({image: response});
      }
    });
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
          <Text style={{fontSize: 20, color: 'white'}}>
            Request Penjemputan
          </Text>
        </View>
        <Text style={{...Styles.sizeteks, marginStart: 5}}>
          Foto Sampah yang akan dijemput
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <TouchableOpacity
            style={Styles.gambar}
            onPress={() => this.handleChoosePhoto()}>
              {this.state.image !== '' ? (
            <Image
              style={{
                width: 160,
                height: 190,
                position: 'absolute',
                resizeMode: 'stretch',
              }}
              source={this.state.image}
            />
              ):(
                
                <Icon name="image" size={30} color="white" />
              )}
          </TouchableOpacity>
        </View>
        <View style={{margin: 5}}>
          <Text style={Styles.sizeteks}>Lokasi Anda Sat ini</Text>
          <OpenURLButton url={maps}>Click to open map and copy link your location</OpenURLButton>
          <TextInput
            style={{borderWidth: 0.4}}
            placeholder="Location"
            value={this.state.lokasi}
            onChangeText={(text) => this.setState({lokasi: text})}
          />
        </View>
        <Button title="Request" onPress={() => this.Setor()} />
      </ScrollView>
    );
  }
}

export default pickup;

const Styles = StyleSheet.create({
  gambar: {
    marginHorizontal: 20,
    marginBottom: 14,
    width: 160,
    height: 190,
    backgroundColor: '#6d0303',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeteks: {
    fontSize: 18,
  },
});
