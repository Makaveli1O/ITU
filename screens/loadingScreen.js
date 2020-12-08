/**
 * @file loadingScreen.js
 * @author xliska20
 */
import React, {Component} from 'react'
import {View, ActivityIndicator, StyleSheet, Text,Alert} from 'react-native'
import * as Font from 'expo-font'
import * as axios from 'axios';



export default class LoadingScreen extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	    players:[],
	  };
	}
	/*Get player list and send it further*/
	async getData(){
	    //old api await axios.get('http://bkjuniorkn.sk/admin/api.php?players')
	    await axios.get('https://bkjuniorkn.sk/ITU/app/players')
	    .then(response=> {
	    	console.log("-----Downloading data from database(loading screen)-----")
		    console.log(response.data);
		    this.setState({players: response.data})
		    //console.log(this.state.players)
		    console.log("-----Data has been successfully donwloaded-----")
		   // console.log(this.state.players[0].name)
	    })
	}

	async componentDidMount(){
		await this.getData()
	    await Font.loadAsync({
	      adventpro_bold: require("../assets/fonts/adventpro-bold.ttf"),
	      adventpro_extralight: require("../assets/fonts/adventpro-extralight.ttf"),
	      adventpro_light: require("../assets/fonts/adventpro-light.ttf"),
	      adventpro_medium: require("../assets/fonts/adventpro-medium.ttf"),
	      adventpro_regular: require("../assets/fonts/adventpro-regular.ttf"),
	      adventpro_semibold: require("../assets/fonts/adventpro-semibold.ttf"),
	      adventpro_thin: require("../assets/fonts/adventpro-thin.ttf"),
	    });

	    this.props.navigation.navigate('Home', {list:this.state.players});
	 }
	 render(){
	 	return(
		 	<View style={styles.loading}>
		 		<ActivityIndicator size="large" />
		 	</View>
	 	)
	 }
}

const styles=StyleSheet.create({
	loading:{
		flex:1,
		alignSelf:'center',
		justifyContent:'center',
		alignContent:'center'
	}
});