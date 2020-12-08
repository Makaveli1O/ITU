/**
 * @file App.js
 * @author xliska20
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';


import AttendanceScreen from './screens/attendanceScreen'
import HomeScreen from './screens/homeScreen'
import PlayersScreen from './screens/playersScreen'
//import SearchModal from './modals/SearchModal'
import LoadingScreen from './screens/loadingScreen'
import PlayerProfile from './screens/playerProfile'
import AttendanceProfile from './screens/attendanceProfile'
 
const Stack = createStackNavigator();
//const ModalStack = createStackNavigator();
const RootStack = createStackNavigator();


function StackNavigator(){
  return(
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={LoadingScreen}/>
          <Stack.Screen name="Home" component={HomeScreen} 
          options={{title: "Player Statistics", headerLeft:null,
          headerStyle: {
            backgroundColor: '#f50',
          },
          headerTintColor: "white",
          headerTitleStyle:{
            fontFamily: 'adventpro_light',
          }

          }}  
          />
          <Stack.Screen name="Attendance" component={AttendanceScreen}
           options={{title: "Dochádzky",
            headerTitleStyle:{
            fontFamily: 'adventpro_light',
          }
         }}  
           />
          <Stack.Screen name="Players" component={PlayersScreen}
           options={{title: "Hráči",
            headerTitleStyle:{
            fontFamily: 'adventpro_light',
            }
          }}  
           />
          <Stack.Screen name="Profile" component={PlayerProfile}
          options={{title:"asd",
          headerTitleStyle:{
            fontFamily: 'adventpro_light',
          }
            }}
          />
          <Stack.Screen name="AttendanceProfile" component={AttendanceProfile} 
          options={{title:"Dochádzky",
          headerTitleStyle:{
            fontFamily: 'adventpro_light',
          }
          }} 
        />
        </Stack.Navigator>
    );
}
/*
function ModalNavigator(){
  return(
      <ModalStack.Navigator headerMode="none" initialRoute="SearchModal">
        <ModalStack.Screen name="SearchModal" component ={SearchModal}/>
      </ModalStack.Navigator>
    )
}*/


function RootNavigator(){
  return(
      <RootStack.Navigator headerMode="none" initialRoute="SearchModal" mode="modal">
        <RootStack.Screen name="StackNavigator" component={StackNavigator}/>
        {/*<RootStack.Screen name="ModalNavigator" component ={ModalNavigator}/>*/}
      </RootStack.Navigator>
  )
}



export default class App extends React.Component {
  render(){
    /*custom fonts*/
    return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );
  }
}


