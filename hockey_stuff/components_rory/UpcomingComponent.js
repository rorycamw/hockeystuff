import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, ListView, StyleSheet, TouchableHighlight, Modal } from 'react-native';

export default class GalleryComponent extends Component {

	constructor() {
		super();
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})
		this.state = {
			todoDataSource: ds,
			currentDate: this.getDate(),
			favTeams: ['VAN', 'FLA', 'VGK'],
		}

		this.pressRow = this.pressRow.bind(this);
		this.renderRow = this.renderRow.bind(this);
	}

	getDate() {
		var dateParts = new Date().toDateString().split(' ');
		switch(dateParts[1]) {
			case 'Jan':
				dateParts[1] = '01';
	        	break;
	        case 'Feb':
				dateParts[1] = '02';
	        	break;
	        case 'Mar':
				dateParts[1] = '03';
	        	break;
	        case 'Apr':
				dateParts[1] = '04';
	        	break;
	        case 'May':
				dateParts[1] = '05';
	        	break;
	        case 'Sep':
				dateParts[1] = '09';
	        	break;
			case 'Oct':
				dateParts[1] = '10';
	        	break;
	        case 'Nov':
				dateParts[1] = '11';
	        	break;
	        case 'Dec':
				dateParts[1] = '12';
	        	break;
	        default:
	        	dateParts[1] = '06';
	        	Alert.alert("Invalid Month");
	    }
		dateParts = dateParts[3] + dateParts[1] + dateParts[2];
		return(dateParts);
	}

	fetchTodos() {
		fetch('http://live.nhl.com/GameData/SeasonSchedule-20182019.json')
			.then((response) => response.json())
			.then((response) => {
				this.setState({
					todoDataSource: this.state.todoDataSource.cloneWithRows(response)
				});
			})
	}

	componentDidMount() {
		this.fetchTodos();
	}

	pressRow(rowID) {
		console.log('Row number: ' + rowID);
	}

	renderRow(response, sectionID, rowID, highlightRow) {
		console.log(response);
		return(
			<View>
				<View style={styles.row}>
					<Text>{JSON.stringify(response)}</Text>
				</View>
			</View>
		)
	}

	render() {
		return(
			<ListView
			dataSource = {this.state.todoDataSource}
			renderRow={this.renderRow}
			style={{width: '100%'}}
			/>
		)
	}
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 5,
  },
});