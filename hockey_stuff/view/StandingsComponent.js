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
			favTeams: this.getFavTeams(),
		}

		this.pressRow = this.pressRow.bind(this);
		this.renderRow = this.renderRow.bind(this);
	}

	getFavTeams() {
		//Change to database
		return(['Vancouver Canucks', 'Florida Panthers', 'Vegas Golden Knights']);
	}

	highlight(currentTeam) {
		var fav = false;
		for (t in this.getFavTeams()) {
			if (this.getFavTeams()[t] == currentTeam) {
				fav = true;
				break;
			}
		}
		return(fav);
	}

	fetchTodos() {
		fetch('https://statsapi.web.nhl.com/api/v1/standings?season=20182019')
			.then((response) => response.json())
			.then((response) => {
				var teamStats = [];
				for (i in response.records) {
					for (j in response.records[i].teamRecords) {
						teamStats.push(response.records[i].teamRecords[j]);
					}
					//teamStats.push(response.records[i].teamRecords);
				}
				this.setState({
					todoDataSource: this.state.todoDataSource.cloneWithRows(teamStats)
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
				<View style={[(this.highlight(response.team.name)) ? styles.rowSpecial : styles.row]}>
					<View style={styles.column}>
						<Text style={{color: 'white', fontSize: 16,}}>{(response.team.name)}</Text>
					</View>
					<View style={styles.column}>
						<Text style={{color: 'white', fontSize: 16,}}>{(response.leagueRank)}</Text>
					</View>
					<View style={styles.column}>
						<Text style={{color: 'white', fontSize: 16,}}>{(response.leagueRecord.wins)}</Text>
					</View>
					<View style={styles.column}>
						<Text style={{color: 'white', fontSize: 16,}}>{(response.leagueRecord.losses)}</Text>
					</View>
					<View style={styles.column}>
						<Text style={{color: 'white', fontSize: 16,}}>{(response.leagueRecord.ot)}</Text>
					</View>
					<View style={styles.column}>
						<Text style={{color: 'white', fontSize: 16,}}>{(response.points)}</Text>
					</View>
				</View>
			</View>
		)
	}

	render() {
		return(
			<View style={{height: '100%'}}>
				<View style={styles.header}>
					<Text style={styles.heading}>Standings</Text>
				</View>
				<View style={styles.row}>
					<View style={styles.column}>
						<Text style={{color: 'white', fontSize: 16,}}>TEAM</Text>
					</View>
					<View style={styles.column}>
						<Text style={{color: 'white', fontSize: 16,}}>RANK</Text>
					</View>
					<View style={styles.column}>
						<Text style={{color: 'white', fontSize: 16,}}>WINS</Text>
					</View>
					<View style={styles.column}>
						<Text style={{color: 'white', fontSize: 16,}}>LOSSES</Text>
					</View>
					<View style={styles.column}>
						<Text style={{color: 'white', fontSize: 16,}}>OT LOSSES</Text>
					</View>
					<View style={styles.column}>
						<Text style={{color: 'white', fontSize: 16,}}>POINTS</Text>
					</View>
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
    marginLeft: 2.5,
    marginRight: 2.5,
    backgroundColor: 'black',
  },

  rowSpecial: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 5,
    marginLeft: 2.5,
    marginRight: 2.5,
    backgroundColor: 'yellow',
  },

  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 5,
    marginLeft: 2.5,
    marginRight: 2.5,
    backgroundColor: 'black',
  },

  header: {
  	width: '100%',
  	backgroundColor: 'black',
  	alignItems: 'center',
  	paddingTop: 20,
  	paddingBottom: 20,
  	marginBottom: 5,
  },

  heading: {
  	color: 'white',
  	fontSize: 64,
  },
});
