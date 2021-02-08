import React,{useCallback} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  StyleSheet,
  ImageBackground,
  Linking
} from 'react-native';
import AsynStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';

const supportedURL = "http://toressu.herokuapp.com/password/reset"

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
    return <Text onPress={handlePress}>{children}</Text>;
}

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    token: '',
    role:""
  };
  login = () => {
    const {email, password} = this.state;
    const url = 'https://toressu.herokuapp.com/api/auth/login';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        AsynStorage.setItem('token', resJson.token).catch((err) =>
            console.log(err),
          )
          AsynStorage.setItem('role', resJson.user.role).catch((err) =>
          console.log(err),
        );
        if (resJson.user.role == "nasabah") {
          
          this.props.navigation.replace('Home'),
            ToastAndroid.show(
              'Anda Berhasil Login',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
        } else if (resJson.user.role == "pengurus-satu") {
          
          this.props.navigation.replace('Home'),
            ToastAndroid.show(
              'Anda Berhasil Login',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
        }else if (resJson.user.role == "pengurus-dua") {
          
          this.props.navigation.replace("Home"),
            ToastAndroid.show(
              'Anda Berhasil Login',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
        }
         else {
          alert("try again");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("try again")
      });
  };
  register = () => {
    this.props.navigation.navigate('Register');
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../Image/d0fe3a2cc79628c6a017f0066d4dee63.jpeg')}
          style={styles.image}
          imageStyle={{width: '100%', resizeMode: 'cover'}}>
          <View
            style={{
              backgroundColor: '#ffffffde',
              margin: 20,
              elevation: 1,
              borderRadius: 5,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 30, color:"#1b95c5e8"}}>Torasshu</Text>
            </View>
            <View style={styles.mail}>
              <Icon name="mail" size={20} />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '90%',
                }}
                placeholder="Email"
                value={this.state.email}
                onChangeText={(teks) => this.setState({email: teks})}
              />
            </View>
            <View style={styles.lock}>
              <Icon name="lock" size={20} />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '90%',
                }}
                placeholder="Password"
                value={this.state.password}
                onChangeText={(teks) => this.setState({password: teks})}
                secureTextEntry={true}
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <OpenURLButton url={supportedURL}>Forgot Password???</OpenURLButton>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1b95c5e8',
                marginHorizontal: '5%',
                height: 30,
                marginVertical: 5,
              }}
              onPress={()=> this.login()}>
              <Text style={{color: 'white',fontSize:17}}>Login</Text>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 10,
                paddingBottom:5
              }}>
              <Text>Don't Have an Account??? </Text>
              <Text
                style={{color: '#1b95c5e8', textDecorationLine: 'underline'}}onPress={()=> this.props.navigation.navigate("Register") }>
                Sign Up!
              </Text>
            </View>
          </View>
         
        </ImageBackground>
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  mail: {
    width: '90%',
    marginBottom: 10,
    marginHorizontal: '5%',
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 7,
  },
  lock: {
    width: '90%',
    marginBottom: 20,
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 7,
  },
});
