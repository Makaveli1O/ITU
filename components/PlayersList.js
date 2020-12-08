/**
 * @file PlayersList.js
 * @author xliska20
 */
import React, {Component} from 'react'
import {Text,Image,View, StyleSheet, FlatList} from 'react-native'

import PlayersBox from '../components/PlayersBox'
import H3 from './H3'

export default class PlayersList extends Component{
	constructor(props) {
	  super(props);
	}
	render(props){
		return(
	        <View style={styles.scrollWindow}>
	        	<H3 size="30" style={{marginBottom: 0, paddingBottom:0, marginTop:0, paddingTop:0}}>{this.props.team}</H3>
		        <FlatList
		          style={{height: 200,paddingTop:0,marginTop:0}}
		          /*LAZYLOAD*/
		          initialNumToRender={3}
		          maxToRenderPerBatch={3}
		          horizontal
		          keyExtractor={(item) => String(item.id)}
		          data={this.props.playerlist}
		          renderItem={({item}) => (
		              <PlayersBox color={this.props.color} navigation={this.props.navigation} data={item}/>
		            )}
		         />
	        </View>
		)
	}

}

const styles = StyleSheet.create({
	scrollWindow:{
		height: 200,
		flex:1,

	},
})