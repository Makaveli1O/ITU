/**
 * @file Stats.js
 * @author xliska20
 */
import React, {Component} from 'react'
import {Text,View, StyleSheet, FlatList, ScrollView, Alert} from 'react-native'
import * as axios from 'axios';

import H3 from './H3'
import SmallText from './SmallText'
import SingleStat from './SingleStat'

export default class Stats extends Component{

	constructor(props) {
		super(props);
		this.state = {
		  stats: [0, 0, 0, 0], //indexes must refer to statslist object
		  player_stats:[] //downloaded stats
		};
	}
	/* Send stats */
	uploadData(stat_id, player_id,value,record_id, action){
		console.log("- - -	Performing POST request  - - -")
		//OLD API var uri = "https://bkjuniorkn.sk/admin/api.php"
		//var uri = "https://bkjuniorkn.sk/admin/app/api.php"
		var uri = "https://bkjuniorkn.sk/ITU/app/"+action
console.log(JSON.stringify({
			action: action,
			stat_id: stat_id,
			player_id: player_id,
			value: value,
			record_id:record_id

		}))
		console.log()
		axios.post(uri, JSON.stringify({
			action: action,
			stat_id: stat_id,
			player_id: player_id,
			value: value,
			record_id:record_id

		}))
		  .then(function(response){
		      console.log(response.data);
		}).catch(function (error) {
		      console.log(error);
		});  
	}

	/*callback functions passed into child*/
	/*data id -> Id of statistic,that
	 is passed from child InteractionStatsPlatform*/
	 addStats(data_id, player_id, value, record_id){
		const new_stats = this.state.stats.slice() //copy array
		new_stats[data_id]++ //increment
		this.setState({stats:new_stats}) //save new array
		this.props.statslist[data_id].value++ //increment statslist
		this.uploadData(data_id, player_id, value, record_id, "addStat")
	}

	subStats(data_id, player_id, value, record_id){
		const new_stats = this.state.stats.slice() //copy array
		if (new_stats[data_id] == 0) {//negative value is not permitted
			return;
		}else{
			new_stats[data_id]-- //decrement
			this.setState({stats:new_stats}) //save new array
			this.props.statslist[data_id].value-- //increment statslist
			this.uploadData(data_id, player_id, value, record_id, "subStat")
		}
	}

	/* get data from server */
	async downloadData(){
		console.log("Downloading stats data...")
		const stats_num = this.state.stats.length
		//OLD API var url = 'https://bkjuniorkn.sk/admin/api.php?playerstats&player_id='+this.props.player_id+'&stats_num='+stats_num
	   	var url = 'https://bkjuniorkn.sk/ITU/app/playerstats?player_id='+this.props.player_id+'&stats_num='+stats_num
	    await axios.get(url)
	    .then(response=> {
	      this.setState({player_stats:response.data})
	      console.log(response.data)
	    })
	 }

	 componentDidMount(){
	 	this.downloadData()
	 }

	render(props){
		if (this.props.refresh==1) {
			this.downloadData();
			this.props.refreshed();
		}

		/*map corresponding statval to statslist*/
		const downloadedStats = this.state.player_stats.map((sql,index) => {
			const statslist = this.props.statslist[index];
			return(
      			<SingleStat
      			 color={this.props.color}
      			 downloadCallback={this.downloadData.bind(this)}
      			 data={{
				    addStats:this.addStats.bind(this),
				    subStats:this.subStats.bind(this)
				}}
      			 key={sql.id}
      			 record_id={sql.id}
      			 statlist_id={statslist.id}
      			 stat_id={sql.stat_id} 
      			 stat_name={statslist.stat} 
      			 stat_val={sql.value} 
      			 newstat_val={this.props.statslist[statslist.id].value}
      			 player_id={this.props.player_id}
      			 />
      		)	
		});
		return(
			<View style={styles.container}>
		        <View style={styles.recordedStats}>
		        	<ScrollView horizontal style={{height: 400}}>
		        	{downloadedStats}
		        	</ScrollView>

		        </View>
	        </View>
		)
	}

}

const styles = StyleSheet.create({
	recordedStats:{
		height: '40%',
		alignContent:'center',
	},
	container:{
		width: '100%',
		flex:1,
		flexDirection: 'column',
		alignContent:"space-between",
		marginTop:20

	},
	scrollWindow:{
		height: "35%",
		alignContent: 'flex-start' 
	},
	button:{
		width: '100%',
		height: 45,
		backgroundColor: 'green',
		alignContent:'flex-end'
	}

})