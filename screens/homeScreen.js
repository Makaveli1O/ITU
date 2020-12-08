/**
 * @file homeScreen.js
 * @author xliska20
 */
import React, {Component} from 'react';
import { View,Text,StyleSheet, StatusBar} from 'react-native';
import Menu from '../components/Menu'
import Search from '../components/Search'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

//turn off warning
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


import * as axios from 'axios';
 
 //<Header title="Player Statistics" />
export default class HomeScreen extends Component {

	render(){
		const playerList = this.props.route.params.list
		//console.log(playerList)
		return (
			<SafeAreaView style={[styles.container, { backgroundColor: '#6a51ae' }]}>
	      		<StatusBar barStyle="light-content" backgroundColor="#f50" />
			  <View style={styles.container}>
			  	<View style={styles.menu}>
			    	<Menu navigation={this.props.navigation}/>
			    </View>
			    <Search navigation={this.props.navigation} list={playerList} />
			  </View>
			</SafeAreaView>
		);
	}
};

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	menu:{
		height: '60%'
	},
	search:{
		height: '50%'
	}	
})
