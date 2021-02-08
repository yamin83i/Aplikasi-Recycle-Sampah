import React from 'react';
import {View, Text, ScrollView, TouchableOpacity,StyleSheet,Image} from 'react-native';
import Icon from "react-native-vector-icons/Feather"
import AsyncStorage from '@react-native-async-storage/async-storage';

class Contact extends React.Component {
state={
  data:[],
  token:""
}


  componentDidMount() {
    this.ambldata();
  }

  ambldata = () => {
    AsyncStorage.getItem('token').then(token => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token}, () => this.getData());
      } else {
        alert("anda belum login")
      }
    });
  };

  getData = () => {
    const url = 'https://toressu.herokuapp.com/api/message/show-contact';

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then(res => res.json())
      .then(resJson => {
        console.log('ini resjon');
        console.log(resJson);
        this.setState({data: resJson});
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.kata}>List Contact</Text>
        </View>
        {this.state.data != null ? (
        <ScrollView style={{flex: 1}}>
        {this.state.data.map((value, index) => {
              return (
                <TouchableOpacity
                  key={value.id}
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    elevation: 3,
                    borderRadius: 9,
                    flexDirection:"row",
                    marginHorizontal:5,
                    marginBottom:5
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('Chat',
                    {id: value.contact.id})
                  }>
                  <Image
                    style={{width: 50, height: 50,borderRadius:50,}}
                    source={{uri: value.contact.profile_picture}}
                  />
                  <View>
                    <Text style={{paddingStart:5}}>{value.contact.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
        ):(
          <View></View>
        )}
      </View>
    );
  }
}
export default Contact;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#047af1f2',
    paddingStart: 10,
    alignItems: 'center',
  },
  kata: {
    fontSize: 20,
    color: 'white',
    marginStart: 15,
  },
})