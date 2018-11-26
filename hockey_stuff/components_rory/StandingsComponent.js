import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, ListView, StyleSheet, TouchableHighlight, Modal } from 'react-native';

export default class StandingsComponent extends Component {

	constructor() {
		super();
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})
		this.state = {
			todoDataSource: ds,
			currentDate: this.getDate(),
			favTeams: this.getFavTeams(),
		}

		this.pressRow = this.pressRow.bind(this);
		this.renderRow = this.renderRow.bind(this);
	}

	getFavTeams() {
		return(['VAN', 'FLA', 'VGK']);
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
			<View>
				<View>
					<Text>Upcoming Games</Text>
				</View>
				<ListView
				dataSource = {this.state.todoDataSource}
				renderRow={this.renderRow}
				style={{width: '100%'}}
				/>
			</View>
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