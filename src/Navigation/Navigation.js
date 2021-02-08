import * as React from "react"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from "react-native-vector-icons/Feather"

import Splash from "../Screen/Splash"
import Beranda from "../Screen/Beranda"
import Login from "../Screen/Login"
import Register from "../Screen/Register"
import Profile from "../Screen/Profile"
import EditProfile from "../Screen/EditProfile"
import SetorSampah from "../Screen/SetorSampah"
import TempatSampah from "../Screen/TempatSampah"
import Pickup from "../Screen/pickup"
import RequestNasabah from "../Screen/RequestNasabah"
import RequestPengurus from "../Screen/RequestPengurus"
import SearchNasabah from "../Screen/SearchNasabah"
import InputSampah from "../Screen/InputSampah"
import Chat from "../Screen/Chat"
import Contact from "../Screen/Contact"
import History from "../Screen/History"
import SearchPengepul from "../Screen/SearchPengepul"
import SellSampah from "../Screen/SellSampah"
import ListPengepul from "../Screen/ListPengepul"
import PenarikanSaldo from "../Screen/PenarikanSaldo"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Home() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;
  
            if (route.name === 'Beranda') {
              iconName = focused ? 'home' : 'home';
            } 
            else if (route.name === 'Profile') {
              iconName = focused ? 'user' : 'user';
            }
            return <Icon name={iconName} size={15} color={color} />;
          },
        })}
        tabBarOptions={{
          // inactiveBackgroundColor:"#6d0303",
          // activeBackgroundColor:"#6d0303",
          keyboardHidesTabBar:true,
          activeTintColor: '#086dba',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Beranda" component={Beranda} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }

function App (){
    return(
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}} >
            <Stack.Screen name="Beranda" component={Beranda} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="SetorSampah" component={SetorSampah} />
            <Stack.Screen name="TempatSampah" component={TempatSampah} />
            <Stack.Screen name="Pickup" component={Pickup} />
            <Stack.Screen name="RequestNasabah" component={RequestNasabah} />
            <Stack.Screen name="RequestPengurus" component={RequestPengurus} />
            <Stack.Screen name="SearchNasabah" component={SearchNasabah} />
            <Stack.Screen name="InputSampah" component={InputSampah} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="SearchPengepul" component={SearchPengepul} />
            <Stack.Screen name="SellSampah" component={SellSampah} />
            <Stack.Screen name="ListPengepul" component={ListPengepul} />
            <Stack.Screen name="PenarikanSaldo" component={PenarikanSaldo} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App