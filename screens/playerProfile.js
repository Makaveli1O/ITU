/**
 * @file playerProfile.js
 * @author xliska20
 */
import React, {Component} from 'react';
import { Alert, View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableNativeFeedback, StatusBar } from 'react-native';
import * as axios from 'axios';

import Stats from '../components/Stats'
import H3 from '../components/H3'
import{ Divider, Icon, Image } from 'react-native-elements'

 
export default class playerProfile extends Component{

  constructor(props) {
    super(props);
  
    this.state = {refresh:[0]};
  }

  confirmation(player_id,name,subname){
    Alert.alert(
      'Potvrdenie',
      'Určite chceš reštartnúť zaznamenané štatistiky hráča '+name+" "+subname+"?",
      [
        {text: 'Nie', onPress: () => console.log("No pressed.")},
        {text: 'Áno', onPress: () => this.restartStats(player_id)},
      ]
    );
  }

 restartStats(player_id){
    console.log("Restarting stats of player with id: "+player_id)
    var uri = "https://bkjuniorkn.sk/ITU/app/restartStats"
    console.log(uri)
    axios.post(uri, JSON.stringify({
      action: "restartStats",
      player_id: player_id

    }))
      .then(function(response){
          console.log(response.data);
          
    }).catch(function (error) {
          console.log(error);
    }); 
    this.setState({refresh:1})

  }

  refreshed(){
    this.setState({refresh:0})
  }

  componentDidMount(){
    var color = this.props.route.params.color
    if(!color){
      switch(this.props.route.params.player.team){
        case 'u17':
          var color = "#8E3B46" 
        break;
        case 'u15':
          var color = "#E0777D"
          break;
        case 'u12':
          var color = "#4C86A8"
          break;
      }
    }

    this.props.navigation.setOptions({
      headerStyle: 
        {backgroundColor: color},
        headerTintColor: 'white',
        title: this.props.route.params.player.name+" "+this.props.route.params.player.subname
      })

  }

  render(){
    /*  Zaznamenávané štatistiky  */
    let statslist = [
      {
        "id":0,
        "stat": "2-bodový hod",
        "value":0
      },
      {
        "id":1,
        "stat": "3-bodový hod",
        "value":0
      },
      {
        "id":2,
        "stat": "Trestné hody",
        "value":0
      },
      {
        "id":3,
        "stat": "Získané fauly",
        "value":0
      },
    ] 
    const {id,name,subname,number,img,team} = this.props.route.params.player
    var color = this.props.route.params.color
    if(!color){
      switch(team){
        case 'u17':
          var color = "#8E3B46" 
        break;
        case 'u15':
          var color = "#E0777D"
          break;
        case 'u12':
          var color = "#4C86A8"
          break;
      }
    }
    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={color} />
      <View style={styles.header}>
        <Image
          source={{ uri: "https://bkjuniorkn.sk/"+img }}
          style={{ width: Dimensions.get('window').width, height: "100%"}}
          PlaceholderContent={<ActivityIndicator color="black" />}
        />
        <View style={[styles.info,{backgroundColor: color,width: '50%', padding: 20, position:'absolute', bottom:0, alignSelf:'center', borderTopRightRadius: 20, borderTopLeftRadius: 20}]}>
          <H3 size="20" color="white">Číslo dresu: {number}</H3>
          <H3 size="20" color="white">{team}</H3>
          <H3 size="15" color="white">ID: {id}</H3>
        </View>
      </View>
        <View style={styles.stats}>
          <View style={styles.statsHeader}>
            <H3 size="30" color={color}>Pridať štatistiky</H3>
            <TouchableNativeFeedback onPress={()=>this.confirmation(id, name, subname)}>
                <Icon
                  name="undo"
                  type='font-awesome'
                  size={30}
                  color="red"
                />
            </TouchableNativeFeedback>
            </View>

          <Stats refreshed={this.refreshed.bind(this)} refresh={this.state.refresh} color={color} statslist={statslist} player_id={id}/>
        </View>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  statsHeader:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginLeft: 10,
    marginRight: 10

  },
  header:{
    height: "60%"
  },
  info:{
    height: '20%',
    alignItems:'center',
    justifyContent:'center'
  },
  stats:{
    marginTop:10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
});