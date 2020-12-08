/**
 * @file Menu.js
 * @author xliska20
 */
import React, {Component} from 'react';
import {Dimensions, Modal, View, ScrollView, Button,Text,TextInput, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import H2 from './H2'
import MenuItem from './MenuItem';



class Menu extends Component{

	/* end of swipe gestures*/
	render(props){
		return(
			<View style={styles.menubg}>
				<H2 color="white">Záznamy</H2>
				<ScrollView scrollEventThrottle={16} horizontal showsHorizontalScrollIndicator={false}>
					<MenuItem title="Štatistiky" description="zoznam hráčov" onPress={() => this.props.navigation.navigate("Players")} />
					<MenuItem title="Dochádzky" description="tréningová/zápasová" onPress={() => this.props.navigation.navigate("Attendance")} />
				</ScrollView>
			</View>
			);
	};
};

const styles = StyleSheet.create({
	menubg:{
		height: '100%',
		backgroundColor: '#f50',
	},
	overlay:{
		alignItems:'center',
		alignSelf:'center',
		flexDirection:'row',
	},
	h1:{
		color: 'white',
		fontSize: 40,
		paddingTop: 10,
		paddingLeft:25
	}
});

export default Menu;