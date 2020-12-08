/**
 * @file PlayersBox.js
 * @author xliska20
 */
import React  from 'react'
import {Text,View} from 'react-native'
import {Card, Icon, Button, Avatar} from 'react-native-elements'


import H3 from './H3'
export default class PlayerBox extends React.PureComponent{
	constructor(props) {
	  super(props);
	}

	navigate(){
		
	}


	render(props){
		return(
			<View style={{flex:1,width:180, height: 120, margin:10, borderRadius:20, backgroundColor:this.props.color}}>
			  <View style={{alignItems:'center'}}>
			  	<H3 size="20" color="white">{this.props.data.name} {this.props.data.subname}</H3>
			  	<H3 size="20" color="white">#{this.props.data.number}</H3>
			  </View>
			  <View style={{flexDirection:'row',alignContent:'flex-start', alignItems:'center', justifyContent:'center'}}>
					<Icon
					  name='corner-down-right'
					  type='feather'
					  color='#90ee90'
					  size={35}
					  onPress={() => this.props.navigation.navigate("Profile", {color:this.props.color, player:this.props.data})}
					/>
				</View>
			</View>






			)
	}

}
