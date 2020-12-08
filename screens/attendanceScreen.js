/**
 * @file attendanceScreen.js
 * @author xliska20
 */
import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, StatusBar } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures'
import {Icon} from 'react-native-elements'



import H3 from '../components/H3'

 
export default class AttendanceScreen extends Component{
  render(){
    
    return (
      <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
        <GestureRecognizer style={styles.training}
         onSwipeUp={() => this.props.navigation.navigate("AttendanceProfile", {type:"tréning", action:"view"})}
         onSwipeDown={() => this.props.navigation.navigate("AttendanceProfile", {type:"tréning", action:"add"})}
         >
         <TouchableNativeFeedback onPress={()=>this.props.navigation.navigate("AttendanceProfile", {type:"tréning", action:"view"})}>
           <Icon
              containerStyle={{}}
              name='chevron-up'
              type='font-awesome'
              color='black'
              size={50}
            />
          </TouchableNativeFeedback>
          <H3 size="20" color="black">prehľad</H3>
          <H3 size="60" color="black">Tréningy</H3>
          <H3 size="20" color="black">nový</H3>
          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate("AttendanceProfile", {type:"tréning", action:"add"})}>
            <Icon
              containerStyle={{}}
              name='chevron-down'
              type='font-awesome'
              color='black'
              size={50}
            />
          </TouchableNativeFeedback>
        </GestureRecognizer>
        <GestureRecognizer style={styles.match} 
        onSwipeUp={() => this.props.navigation.navigate("AttendanceProfile", {type:"zápas", action:"view"})}
        onSwipeDown={() => this.props.navigation.navigate("AttendanceProfile", {type:"zápas", action:"add"})}
        >
          <TouchableNativeFeedback onPress={()=>this.props.navigation.navigate("AttendanceProfile", {type:"zápas", action:"view"})}>
           <Icon
              containerStyle={{}}
              name='chevron-up'
              type='font-awesome'
              color='white'
              size={50}
            />
          </TouchableNativeFeedback>
          <H3 size="20" color="white">prehľad</H3>
          <H3 size="60" color="white">Zápasy</H3>
          <H3 size="20" color="white">nový</H3>
          <TouchableNativeFeedback onPress={() => this.props.navigation.navigate("AttendanceProfile", {type:"zápas", action:"add"})}>
            <Icon
              containerStyle={{}}
              name='chevron-down'
              type='font-awesome'
              color='white'
              size={50}
            />
          </TouchableNativeFeedback>
        </GestureRecognizer>
      </View>

    );
  }
};


const styles = StyleSheet.create({
  training:{
    height: '50%',
    width: '100%',
    backgroundColor: '#F4D03F',
    alignItems: 'center',
    justifyContent: 'center'
  },
  match:{
    height: '50%',
    width: '100%',
    backgroundColor: '#A569BD',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
  },
});