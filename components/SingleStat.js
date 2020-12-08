/**
 * @file SingleStat.js
 * @author xliska20
 */
import React,{Component} from 'react'
import {View, StyleSheet, Text, TouchableWithoutFeedback, Alert} from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import * as axios from 'axios';

import { Icon } from 'react-native-elements'

import H3 from './H3'

export default class SingleStat extends Component{

	 /* send data to server */

	render(){
		return(
			<GestureRecognizer 
			style={[styles.platform,{backgroundColor: this.props.color}]}
			onSwipeUp={()=>this.props.data.addStats(this.props.statlist_id,this.props.player_id,this.props.newstat_val,this.props.record_id)}
			onSwipeDown={()=>this.props.data.subStats(this.props.statlist_id,this.props.player_id,this.props.newstat_val,this.props.record_id)}>
				<TouchableWithoutFeedback onPress={()=>this.props.data.addStats(this.props.statlist_id,this.props.player_id,this.props.newstat_val,this.props.record_id)}>
				<Icon name='chevron-up' type='font-awesome'color="#90ee90"/>
				</TouchableWithoutFeedback>
				<H3 size="25" color="white">{this.props.stat_name}</H3>
				<H3 size="20" color="white">zaznamenaných: {this.props.stat_val}</H3>
				<H3 size="25" color="#90ee90" style={{alignSelf:'center'}}>{"+"+this.props.newstat_val}</H3>
				<TouchableWithoutFeedback onPress={()=>this.props.data.subStats(this.props.statlist_id,this.props.player_id,this.props.newstat_val,this.props.record_id)}>
				<Icon name='chevron-down' type='font-awesome'color="red"/>
				</TouchableWithoutFeedback>
			</GestureRecognizer>
		)
	}
}

const styles=StyleSheet.create({
	platform:{
		width: 180,
		height: 180,
		margin: 5,
		borderRadius:20,
		alignContent:"center",
		justifyContent:"center"
	}
})