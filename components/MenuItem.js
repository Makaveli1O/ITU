/**
 * @file MenuItem.js
 * @author xliska20
 */
import React, {Component} from 'react';
import {ImageBackground, View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import H3 from './H3.js'
import SmallText from './SmallText.js'

class MenuItem extends Component{

	render(props){
		switch(this.props.title){
			case 'Štatistiky':
				var color = {backgroundColor: '#d24647'}
				var descColor = {backgroundColor: '#ab3938'}
				var image = require("../assets/bgs/statistics.jpg");
			break;

			case 'Dochádzky':
				var color = {backgroundColor: '#619847'}
				var descColor = {backgroundColor: '#52803c'}
				var image = require("../assets/bgs/attendance.jpg");

			break;


		}
		return(
			<TouchableWithoutFeedback onPress={this.props.onPress}>
				<View style={[styles.menuItem]}>
				<ImageBackground style={[styles.bgstyle]} source={image}>
					<View style={[styles.menuDescription]}>
						<View style={styles.menuTitle}>
							<H3 size="40" style={styles.menuTitleText}>{this.props.title}</H3>
						</View>
					</View>

				</ImageBackground>
				</View>
			</TouchableWithoutFeedback>
			);
	};
};

export default (MenuItem);

const styles = StyleSheet.create({
	bgstyle:{
		width: '100%',
		height: '100%',
		flex:1,
		justifyContent: 'flex-end'
	},
	menuTitle:{
		height: '50%',
	},

	menuTitleText:{
	},

	menuDescription:{
		height: '35%',
		backgroundColor: 'white',
		borderTopRightRadius: 150,
		width: '80%',
	},
	menuDescriptionText:{
		color: 'black',
		padding: 5,
	},

	menuItem:{
		height: 300,
		width: 300,
		margin: 20,
		borderRadius:20,
		overflow: 'hidden' 

	}
});

