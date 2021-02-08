import React, {Component} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pusher from 'pusher-js/react-native';
import { thru } from 'lodash';

export class Chat extends Component {
  state = {
    data: [],
    data2: '',
    token: '',
    message: '',
    id: "",
    user_id: this.props.route.params.id,
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((respon) => {
      if (respon != null) {
        console.log(respon);
        this.setState({token: respon});
        this.getpesan();
      } else {
        alert('anda belum login');
      }
    });
    Pusher.logToConsole = true;

    var pusher = new Pusher('8fc9c41683eef74d8a8a', {
      cluster: 'ap1',
    });
    console.log("kikikikiki" ,this.state.id);
    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', data => {
      //   alert(JSON.stringify(data));
      console.log(data);
      this.getpesan()
    });
  }


  getpesan = () => {
    console.log('Sedang mengambil pesan...');
    const url = `https://toressu.herokuapp.com/api/message/fetch-message`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log('ini id ku ');
        console.log(resJson);
        this.setState({data: resJson.messages});
        this.setState({id: resJson.room_id});
        console.log("lkokokiuuijhiuj   ", this.state.id);
      })
      .catch((err) => {
        console.log('selesai.');
        console.log(err);
      });
  };

  Send = () => {
    const url = `https://toressu.herokuapp.com/api/message/send-message`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        room_id: this.state.id,
        message: this.state.message,
      }),
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.status == 'succes') {
          console.log('berhasil terkirim');
          this.setState({message: ''});
          this.getpesan();
        } else {
          alert('try again');
        }
      })
      .catch((error) => {
        console.log('error is ' + error);
      });
  };

  render() {
    console.log(this.props.route.params.id);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            color="white"
            size={25}
            onPress={() => this.props.navigation.goBack()}
          />
          {/* <Text style={styles.kata}>{this.props.route.params.item.name}</Text> */}
        </View>

        <ScrollView
          style={{flex: 1}}
          ref={(ref) => (this.scrollView = ref)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({animated: true});
          }}>
          {this.state.data == null ? (
            <View></View>
          ) : (
            <View>
              {this.state.data.map((value, index) => {
                return (
                  <View
                    key={value.id}
                    style={{
                      marginHorizontal: 15,
                      marginBottom: 10,
                    }}>
                    {value.is_auth_user == false ? (
                      <View
                        style={{
                          alignSelf: 'flex-start',
                          backgroundColor: 'white',
                          maxWidth: '60%',
                        }}>
                        <View style={{alignSelf: 'flex-start'}}>
                          <Text style={{fontSize: 17, paddingHorizontal: 3}}>
                            {value.message}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', paddingHorizontal: 3}}>
                          <Text style={{color: 'gray'}}>
                            {value.created_at_date},{' '}
                          </Text>
                          <Text style={{color: 'gray'}}>
                            {value.created_at_time}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          alignSelf: 'flex-end',
                          backgroundColor: '#12b3eddb',
                          maxWidth: '60%',
                        }}>
                        <View style={{alignSelf: 'flex-end'}}>
                          <Text style={{fontSize: 17, paddingHorizontal: 3}}>
                            {value.message}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', paddingHorizontal: 3}}>
                          <Text style={{color: 'gray'}}>
                            {value.created_at_date},{' '}
                          </Text>
                          <Text style={{color: 'gray'}}>
                            {value.created_at_time}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
        <View style={styles.indata}>
          <View style={styles.end}>
            <TextInput
              style={styles.inputtext}
              value={this.state.message}
              onChangeText={(teks) => this.setState({message: teks})}
              placeholder="Tulis Kegiatan"
            />
            <View>
              <Icon
                color="#0A9EBE"
                name="send"
                size={34}
                onPress={() => this.Send()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#047af1f2',
    paddingStart: 10,
    alignItems: 'center',
  },
  indata: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 30,
  },
  inputbox: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    elevation: 5,
  },
  inputtext: {
    height: 39,
    borderColor: 'gray',
    borderWidth: 1,
    width: '85%',
    marginRight: 10,
    borderRadius: 13,
    padding: 7,
  },
  end: {
    width: '95%',
    alignItems: 'center',
    flexDirection: 'row',
    height: '8%',
    justifyContent: 'center',
  },
  delete: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A90101',
  },
  kata: {
    fontSize: 20,
    color: 'white',
    marginStart: 15,
  },
});
