import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, ListView, StyleSheet, TouchableHighlight, Modal } from 'react-native';
import { db } from '../service/db.js';

export default class UpcomingComponent extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.state = {
            name: '',
            todoDataSource: ds,
            currentDate: this.getDate(),
            favTeamTags: []
        }

        this.pressRow = this.pressRow.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.getFavTeams = this.getFavTeams.bind(this);
    }

    getFavTeams() {
        return new Promise((resolve, reject) => {
            try {
                var username = this.props.navigation.getParam('login', '')
                db.ref('/login').orderByChild("username").equalTo(username).once('value').then((response) => {
                    loginfo = response.toJSON();
                    if (loginfo !== null) {
                        userID = Object.keys(loginfo);
                        favteam = loginfo[userID[0]].favteam;
                        favteamTags = [];
                        for (team in favteam) {
                            favteamTags.push(favteam[team].teamtag);
                        }
                        resolve(favteamTags)
                    }
                })
            } catch (err) {
                reject("Error in database")
            }
        })
        //return(['VAN', 'FLA', 'VGK']);
    }

    getDate() {
        var dateParts = new Date().toDateString().split(' ');
        switch (dateParts[1]) {
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
        return (dateParts);
    }

    convertDate(date) {
        date = date.split(' ');
        date = date[0];
        var day = date[6] + date[7];
        var year = date[0] + date[1] + date[2] + date[3];
        var month = (parseInt(date[4]) * 10) + parseInt(date[5]);
        switch (month) {
            case 1:
                month = 'January';
                break;
            case 2:
                month = 'Feb';
                break;
            case 3:
                month = 'Mar';
                break;
            case 4:
                month = 'Apr';
                break;
            case 5:
                month = 'May';
                break;
            case 9:
                month = 'Sep';
                break;
            case 10:
                month = 'Oct';
                break;
            case 11:
                month = 'Nov';
                break;
            case 12:
                month = 'Dec';
                break;
            default:
                month = 'June';
                Alert.alert("Invalid Month");
        }
        return (month + ' ' + day + ', ' + year);
    }

    convertTime(time) {
        time = time.split(' ');
        time = time[1];
        time = time.split(':');
        var minute = time[1];
        var hour = parseInt(time[0]) - 3;
        if (hour > 12) {
            hour -= 12;
            hour += " PM";
        } else {
            hour += " AM";
        }
        hour.split(' ');
        return ((parseInt(hour[0]) + 3) + ':' + minute + hour[1] + ' EST / ' + hour[0] + ':' + minute + hour[1] + ' PST');
    }

    fetchTodos() {
        fetch('http://live.nhl.com/GameData/SeasonSchedule-20182019.json')
            .then((response) => response.json())
            .then((response) => {
                var gamesSortedByDate = [];
                var teamCount = {}
                for (f in this.state.favTeamTags) {
                    teamCount[this.state.favTeamTags[f]] = 0;
                }
                for (i in response) {
                    var gameDate = response[i].est.split(' ');
                    if (parseInt(gameDate[0]) >= parseInt(this.getDate())) {
                    	for (t in this.state.favTeamTags) {
	                        if (((this.state.favTeamTags.includes(response[i].a)) || (this.state.favTeamTags.includes(response[i].h))) && (teamCount[this.state.favTeamTags[t]] < 3)) {
                                if (!gamesSortedByDate.includes(response[i])) {
                                    gamesSortedByDate.push(response[i]);
                                    teamCount[this.state.favTeamTags[t]]++;
                                }  
	                        }
	                    }
	                }
                }
                //console.log(teamCount);
                console.log(this.state.favTeamTags);
                //console.log(gamesSortedByDate);
                this.setState({
                    todoDataSource: this.state.todoDataSource.cloneWithRows(gamesSortedByDate)
                });
            })
    }

    componentWillMount() {
        var username = this.props.navigation.getParam('login', '')
        this.setState({
            name: username
        })
        this.getFavTeams().then((response) => {
            this.setState({
                favTeamTags: response
            })
        })
    }

    componentDidMount() {
        this.fetchTodos();
    }

    pressRow(rowID) {
        console.log('Row number: ' + rowID);
    }

    renderRow(response, sectionID, rowID, highlightRow) {
        return (
            <View>
				<View style={styles.row}>
					<Text style={{color: 'white', fontSize: 16,}}>{this.convertDate(response.est)}{"\n"}
					{this.convertTime(response.est)}{"\n"}
					{(response.a)} at {(response.h)}</Text>
				</View>
			</View>
        )
    }

    render() {
        return (
            <View style={{height: '100%'}}>
				<View style={styles.header}>
					<Text style={styles.heading}>Upcoming Games</Text>
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