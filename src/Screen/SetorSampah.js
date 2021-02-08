import React, {  Component,useCallback } from 'react'
import { Text, TouchableOpacity,Linking, View,StyleSheet,Button } from 'react-native'
  
export class SetorSampah extends Component {
    
    render() {
        return (
            <View style={{flex:1, justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity style={Styles.jemput} onPress={()=>this.props.navigation.navigate("Pickup")}>
                    <Text style={{fontSize:20}}>Dijemput</Text>
                </TouchableOpacity>
                <Text >OR</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("TempatSampah")} style={Styles.jemput}>
            <Text style={{fontSize:20}} >Di Antar</Text>

        </TouchableOpacity>
                
            </View>
            
        )
    }
}

export default SetorSampah

const Styles = StyleSheet.create({
    jemput:{
        backgroundColor:"white",
        width:200,
        height: 50,
        justifyContent:"center",
        alignItems:"center",
        elevation:2,
        margin:10
    }
})