/**
 * @file playerScreen.js
 * @author xliska20
 */
import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import * as axios from 'axios';
import { Divider } from "react-native-elements";

import PlayersList from '../components/PlayersList'
import H3 from '../components/H3'

export default class PlayersScreen extends Component {
  constructor(props){
    super();
    this.state = {
      players:[],
    };
  }

  getData(){
    //axios.get('http://bkjuniorkn.sk/admin/app/api.php?action=players')
    axios.get('https://bkjuniorkn.sk/ITU/app/players')
    .then(response=> {
      console.log("-----Downloading players(playersScreen) -----")
      //console.log(respons);
      this.setState({players: response.data})
    })
  }

  componentDidMount(){
    this.getData()
  }


  render(){
    
    const PlayerListU17 = this.state.players.filter(player => player.team =='u17') 
    const PlayerListU15 = this.state.players.filter(player => player.team =='u15')
    const PlayerListU12 = this.state.players.filter(player => player.team =='u12')
    //const PlayerListU11 = this.state.players.filter(player => player.team =='u11')

    return (
      <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
        <H3 size="35" color="#8E3B46">U17</H3>
        <PlayersList color="#8E3B46" navigation={this.props.navigation} playerlist={PlayerListU17}/>
        <Divider style={{ width: "100%", marginTop:10, backgroundColor:"#8E3B46"}} />
        <H3 size="35" color="#E0777D">U15</H3>
        <PlayersList color="#E0777D" navigation={this.props.navigation} playerlist={PlayerListU15}/>
        <Divider style={{ width: "100%", marginTop:10, backgroundColor: "#E0777D"}} />
        <H3 size="35" color='#4C86A8'>U12</H3>
        <PlayersList color="#4C86A8" navigation={this.props.navigation} playerlist={PlayerListU12}/>
        <Divider style={{ width: "100%", marginTop:10, backgroundColor:"#4C86A8"}} />
        {/*<PlayersList navigation={this.props.navigation} playerlist={PlayerListU11}/>*/}
      </View>

    );
  }
};
 
const styles = StyleSheet.create({
  img:{
    width: 100,
    height: 100
  },

  container:{
    flex: 1,
    backgroundColor: 'white',
  },
});