/**
 * @file Search.js
 * @author xliska20
 */
import React, {Component} from 'react';
import { View,Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {SearchBar, ListItem, Icon} from 'react-native-elements'

 
 //<Header title="Player Statistics" />
export default class Search extends Component {
	constructor(props) {
	  super(props);
	}
	state = {
    	search: '',
  	};

  updateSearch = (search) => {
    this.setState({ search });
  };
	render(){
		let filteredPlayers = this.props.list.filter(
			(player)=>{ //if you cant find this search return -1 otherwise return player
				return (
				(player.subname.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1 || player.name.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1)
				)
			}
		)
		const { search } = this.state;
		/*hide players when empty searchbar*/
		
		if (this.state.search ==''){
			var display="none"
			var icon="flex";
		}else{
			var icon = "none"
		}
		return (
		  <View style={styles.container}>
		  	<SearchBar 
		  		placeholder="Zadaj meno/priezvisko... "
		  		onChangeText={this.updateSearch}
       			value={search}
       			
       			containerStyle={{backgroundColor: '#f50', margin: 0, padding:0}}
   				inputStyle={{backgroundColor: 'white', padding:0, margin:0}}
		  	/>
		  	<View style={{display:icon, alignItems:'center', alignContent:'center'}}>
		  	<Icon
		  		reverse
			  	name='users'
			  	type='font-awesome'
			  	color='#f50'
			  	size={80}
			  />
		  	</View>
		  	<View style={{display:display}}>
		  		<ScrollView>
				  {
				    filteredPlayers.map((player, i) => (
			    	 <TouchableOpacity key={i*Math.floor(Math.random() * 10000)} onPress={() => this.props.navigation.navigate('Profile', {player: player})}>
					      <ListItem bottomDivider>
					        <Icon name={player.icon} />
					        <ListItem.Content>
					          <ListItem.Title>{player.name} {player.subname} {player.team}</ListItem.Title>
					        </ListItem.Content>
					        <ListItem.Chevron/>
					      </ListItem>
				      </TouchableOpacity>
				    ))
				  }
				</ScrollView>
			</View>
		  </View>
		);
	}
};


const styles = StyleSheet.create({
	container:{
		height: '100%',
		width: '100%',
		backgroundColor: 'white'
	},
	results:{
		display: 'none'
	},
})
