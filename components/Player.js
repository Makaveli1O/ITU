/**
 * @file Player.js
 * @author xliska20
 */
import React from 'react';
import {Text,StyleSheet,FlatList, Alert} from 'react-native';
import {ListItem, Icon, CheckBox} from 'react-native-elements'
import * as axios from 'axios';
import H3 from './H3'

export default class Player extends React.Component {
  constructor(props) {
    super(props);
 
    this.state={
      ids:[], //ids checked
    }
  }

  /*download checked players*/
  componentDidMount(){
    //OLD API var url = 'http://bkjuniorkn.sk/admin/api.php?attendance_player=true&attendance_id='+this.props.record_id
    //var url = 'http://bkjuniorkn.sk/admin/app/api.php?action=attendance_player&attendance_id='+this.props.record_id
    var url = 'https://bkjuniorkn.sk/ITU/app/attendance_player?attendance_id='+this.props.record_id
     axios.get(url)
      .then(response=> {
        console.log(response.data)
        this.setState({ids: response.data})
        //console.log(this.state.ids)
      })
  }
  /* upload player's attendance */
    uploadData(action, player_id){
      //OLD API var uri = "https://bkjuniorkn.sk/admin/api.php"
      //var uri = "https://bkjuniorkn.sk/admin/app/api.php"
      var uri = "https://bkjuniorkn.sk/ITU/app/"+action
      console.log(uri)
      axios.post(uri, JSON.stringify({
        action: action,
        player_id: player_id,
        attendance_id:this.props.record_id
      }))
        .then(function(response){
            console.log(response.data);
      }).catch(function (error) {
            console.log(error);
      }); 
    }


  isChecked(itemId){
    const isThere = this.state.ids.includes(itemId);
    return isThere;
  };

  toggleChecked(itemId){
    const ids = [...this.state.ids, itemId];

    if (this.isChecked(itemId)) {
      this.uploadData("player_attendance_remove", itemId)
      this.setState({
        ...this.state,
        ids: this.state.ids.filter((id) => id !== itemId),
      });
    } else {
      this.uploadData("player_attendance_add", itemId)
      this.setState({
        ...this.state,
        ids,
      });
    }
    console.log(this.state.ids)
  };



  renderPlayers(PlayerList){
      return (
            <FlatList
              /*LAZYLOAD*/
              initialNumToRender={3}
              maxToRenderPerBatch={3}

              vertical
              keyExtractor={(item) => item.id}
              data={PlayerList}
              renderItem={({item}) => ( 
                <ListItem bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{item.name} {item.subname} {item.team}</ListItem.Title>
                  </ListItem.Content>
                  <CheckBox
                    checkedColor={this.props.color}
                    checked={this.isChecked(item.id)}
                    onPress={() => this.toggleChecked(item.id)}
                  />
                </ListItem>
                )}
             />
      )
  }



  render() {
    if(this.props.u17 == 1 && (this.props.u15 == 0 && this.props.u12==0)){
      const PlayerList = this.props.playerList.filter(player => player.team =='u17') 
      return this.renderPlayers(PlayerList)
    }else if(this.props.u17 == 1 && (this.props.u15 == 1 && this.props.u12==0)){
      const PlayerList = this.props.playerList.filter(player => player.team =='u17' || player.team=='u15') 
      return this.renderPlayers(PlayerList)
    }else if(this.props.u17 == 1 && (this.props.u15 == 0 && this.props.u12==1)){
      const PlayerList = this.props.playerList.filter(player => player.team =='u17' || player.team=='u12') 
      return this.renderPlayers(PlayerList)

    }else if(this.props.u15 == 1 && (this.props.u17 == 0 && this.props.u12==0)){
      const PlayerList = this.props.playerList.filter(player => player.team=='u15') 
      return this.renderPlayers(PlayerList)
    }else if(this.props.u15 == 1 && (this.props.u17 == 0 && this.props.u12==1)){
      const PlayerList = this.props.playerList.filter(player => player.team=='u15' || player.team=='u12') 
      return this.renderPlayers(PlayerList)

    }else if(this.props.u12 == 1 && (this.props.u17 == 0 && this.props.u12==0)){
      const PlayerList = this.props.playerList.filter(player => player.team=='u12') 
      return this.renderPlayers(PlayerList)


    }else{
      const PlayerList = this.props.playerList
      return this.renderPlayers(PlayerList)
    }
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    padding: 2,
    fontSize: 23,
    paddingTop: 3,
    paddingLeft: 10,
    fontFamily: 'adventpro_extralight',
  },
});