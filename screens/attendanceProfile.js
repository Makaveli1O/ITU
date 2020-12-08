/**
 * @file attendanceProfile.js
 * @author xliska20
 */
import React, {Component} from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions, StatusBar } from 'react-native';
import H3 from '../components/H3'
import CalendarPicker from 'react-native-calendar-picker';
import {Divider, Button, CheckBox, Icon} from 'react-native-elements'
import * as axios from 'axios';
import Player from '../components/Player'
 
export default class attendanceProfile extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	      selectedStartDate: null,
	      U17_checked:true,
	      U15_checked:true,
	      U12_checked:true,
	      display_done:"none", //display success
	      display_failed:"none", //display failure
	      attendance_list:[], //downloaded stats
	      players:[]
	    };
	    this.onDateChange = this.onDateChange.bind(this);
  	}

  	/*	Download attendance list */
  	downloadData(){
		// OLD API var url = 'http://bkjuniorkn.sk/admin/api.php?attendance=true&type='+this.props.route.params.type
	   //var url = 'http://bkjuniorkn.sk/admin/app/api.php?action=attendance&type='+this.props.route.params.type
	   var url = 'https://bkjuniorkn.sk/ITU/app/attendance?type='+this.props.route.params.type

	   axios.get(url)
	    .then(response=> {
	      this.setState({attendance_list:response.data})
	      //console.log(response.data)
	    })
	}

	downloadPlayers(){
		//OLD API var url = 'http://bkjuniorkn.sk/admin/api.php?players'
		var url = 'https://bkjuniorkn.sk/ITU/app/players'
	    axios.get(url)
	    .then(response=> {
	      console.log("-----Downloading players(attendanceScreen) -----")
	      //console.log(response.data);
	      this.setState({players: response.data})
	    })
	}

  	/* Upload attendance */
  	uploadData(date, action, type){
  		if(date){
  			const U17 = this.state.U17_checked ? 1 : 0 
  			const U15 = this.state.U15_checked ? 1 : 0 
  			const U12 = this.state.U12_checked ? 1 : 0 
  			var self = this //store 'this' statemenet
  			//OLD APIvar uri = "https://bkjuniorkn.sk/admin/api.php"
  			var uri = "https://bkjuniorkn.sk/ITU/app/"+action
	  		axios.post(uri, JSON.stringify({
				action: action,
				date: date,
				type: type,
				u17: U17,
				u15: U15,
				u12: U12
			}))
			  .then(function(response){
			      //console.log(response.data);
			      self.setState({
			      	display_done:"flex"
			      })
			}).catch(function (error) {
			      console.log(error);
			      self.setState({
			      	display_failed:"flex"
			      })
			}); 
		}else(
			Alert.alert("Najskôr vyber dátum.")
		)
  	}

	 onDateChange(date) {
	    this.setState({
	      selectedStartDate: date,
	    });
	 }

	componentDidMount() {
		if(this.props.route.params.action)
  		 this.downloadData()
  		if(this.props.route.params.action == 'view')
  			this.downloadPlayers()
  		//set colors
		const type = this.props.route.params.type
  		var color = (type == 'tréning') ? "#F4D03F" : "#A569BD"
	  	this.props.navigation.setOptions({
	      headerStyle: 
	        {backgroundColor: color},
	        headerTintColor: 'white',
	      })
  	}

  	renderPlayers(){

  	}
  render(){
	const type = this.props.route.params.type
	const action = this.props.route.params.action
	/*
		Variables for 'Add' action
		calendar variables
	*/
	const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    var words = startDate.split(" ");
    var date = selectedStartDate ? words[2]+" "+words[1]+" "+words[3] : ''
    var color = (type == 'tréning') ? "#F4D03F" : "#A569BD"
    /*Variables for 'View' action
     filtering attendance */
    const attendanceList = this.state.attendance_list.filter(
    	attendance => ((attendance.u17 == 1 || !this.state.U17_checked) && (attendance.u15 == 1 || !this.state.U15_checked) && (attendance.u12 == 1 || !this.state.U12_checked))
    	)

	if (action == 'view'){
		return(
			<View style={styles.container}>
				<StatusBar barStyle="light-content" backgroundColor={color} />
				<View style={{height: '10%'}}>
					<H3 size="30" style={{alignSelf:'center'}}>Prehľad dochádzok {type}ov</H3>
					<Divider style={{ width: "80%", margin: 20, alignSelf:"center", backgroundColor: color, height: 2 }} />
				</View>
				    <View style={styles.checkboxes}>
	          			<CheckBox
	          				checkedColor={color}
	          				containerStyle={{height: 45}}
				        	title="U17"
				        	checked={this.state.U17_checked}
				        	onPress={() => this.setState({ U17_checked: !this.state.U17_checked })}
				        />
				        <CheckBox
				        	checkedColor={color}
				        	containerStyle={{height: 45}}
				        	title="U15"
				        	checked={this.state.U15_checked}
				        	onPress={() => this.setState({ U15_checked: !this.state.U15_checked })}
				        />
				        <CheckBox
				        	checkedColor={color}
				        	containerStyle={{height: 45}}
				        	title="U12"
				        	checked={this.state.U12_checked}
				        	onPress={() => this.setState({ U12_checked: !this.state.U12_checked })}
				        />
				    </View>
				    <View style={{height: "80%"}}>
				        <FlatList
				          initialNumToRender={3}
				          maxToRenderPerBatch={3}

				          horizontal
				          keyExtractor={(item) => String(item.id)}
				          data={attendanceList}
				          renderItem={({item}) => (
				              <View style={[styles.oneItem, {backgroundColor: color}]}>
				              	<H3 size="30" style={{alignSelf:'center'}}>{item.date}</H3>
				              	<Player color={color} playerList={this.state.players} record_id={item.id} />
				              </View>
				            )}
				         />
				    </View>
			</View>
		)
	}else if (action == 'add'){
		return(
			<View style={styles.container}>
				<CalendarPicker
					startFromMonday
					weekdays={['Pon', 'Ut', 'Str', 'Št', 'Pia', 'Sob', 'Ned']}
					months={['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December']}
          			previousTitle="Minulý"
    	    	  	nextTitle="Následujúci"
          			onDateChange={this.onDateChange}
          			selectedDayColor={color}
        		/>
        		<Divider style={{ width: "80%", margin: 20, alignSelf:"center" }} />
        		<View style={{justifyContent:'center', alignItems:'center'}}>
          			<H3 size = "20" style={{alignSelf:'center'}}>{ date }</H3>
          			<ScrollView horizontal style={{marginBottom:10}}>
	          			<CheckBox
	          				checkedColor={color}
				        	title="U17"
				        	checked={this.state.U17_checked}
				        	onPress={() => this.setState({ U17_checked: !this.state.U17_checked })}
				        />
				        <CheckBox
				        	checkedColor={color}
				        	title="U15"
				        	checked={this.state.U15_checked}
				        	onPress={() => this.setState({ U15_checked: !this.state.U15_checked })}
				        />
				        <CheckBox
				        	checkedColor={color}
				        	title="U12"
				        	checked={this.state.U12_checked}
				        	onPress={() => this.setState({ U12_checked: !this.state.U12_checked })}
				        />
				    </ScrollView>
						<Button
						  icon={
						    <Icon
						      name="paper-plane"
						      size={30}
						      color="white"
						      type="font-awesome"
						      containerStyle={{marginRight: 20}}
						    />
						  }
							buttonStyle={{height: 100, borderRadius:20, backgroundColor: color}}
						  	title={"Vytvoriť "+type}
						  	onPress={()=>this.uploadData(date, "add_attendance", type)}
						  	raised
						/>
						<Icon
							containerStyle={{display: this.state.display_done}}
							raised
							name='done'
							type='font-awesome 5'
							color='#32CD32'
							size={70}
						  />
						<Icon
							containerStyle={{display: this.state.display_failed}}
							name='window-close'
							type='font-awesome'
							color='#DC143C'
							size={70}
						  />

        		</View>
			</View>
		)
	}
  }
};

const styles = StyleSheet.create({
	oneItem:{
		width: Dimensions.get('window').width - 100,
		margin: 20,
		backgroundColor: 'red',
		padding:20
	},
	checkboxes:{
		height: '10%',
		flex:1,
		flexDirection:'row',
		justifyContent:'center'
	},
	heading:{
		width: '100%',
		backgroundColor:"#F4D03F"
	},
  	container: {
	    flex: 1,
	    backgroundColor: 'white'
  },
  	date:{
  		width: '100%',
  },
});