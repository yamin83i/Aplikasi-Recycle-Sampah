import React, { Component } from 'react'
import { Text, View } from 'react-native'
import LottieView from "lottie-react-native"

export class Splash extends Component {
    render() {
        setTimeout(() => {
            this.props.navigation.replace("Login")
        },3000);
        return (
            <View style={{flex:1}}>
               <View style={{flex:1,justifyContent:"center",alignItems:"center",bottom:50}}>
                   <LottieView source={require("../Assets/37950-happy-earth.json")} autoPlay loop />
                   <View style={{top:200}}>
                       <Text>Jagalah Bumi Mu, Cintailah Masa Depanmu.</Text>
                   </View>
                   </View>
                   
            </View>
        )
    }
}

export default Splash
