import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, ListView, ScrollView, StyleSheet, TouchableHighlight, Modal } from 'react-native';
import { db } from '../service/db.js';

export default class StandingsComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Standings",
            headerStyle: { backgroundColor: 'gray' },
            headerTitleStyle: { textAlign: 'center' }
        };
    }

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.state = {
            name: '',
            todoDataSource: ds,
            favTeams: []
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
                        favteamNames = [];
                        for (team in favteam) {
                            favteamNames.push(favteam[team].teamname);
                        }
                        resolve(favteamNames)
                    }
                })
            } catch (err) {
                reject("Error in database")
            }
        })
        //return(['Vancouver Canucks', 'Florida Panthers', 'Vegas Golden Knights']);
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

    componentWillMount() {
        var username = this.props.navigation.getParam('login', '')
        this.setState({
            name: username
        })
        this.getFavTeams().then((response)=>{
            this.setState({
                favTeams: response
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
        console.log(response.team.name, this.state.favTeams);
        tepid = this.state.favTeams.includes(response.team.name)
        console.log(tepid);
        return (
            <View>
                <View style={[tepid ? styles.rowSpecial : styles.row]}>
                    <View style={styles.nameColumn}>
                        <Text style={{color: 'white', fontSize: 16,}}>{(response.team.name)}</Text>
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
        return (
            <ScrollView style={{backgroundColor: 'gray'}}>
                <View style={styles.row}>
                    <View style={styles.nameColumn}>
                        <Text style={{color: 'white', fontSize: 16,}}>TEAM</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={{color: 'white', fontSize: 16,}}>W</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={{color: 'white', fontSize: 16,}}>L</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={{color: 'white', fontSize: 16,}}>OTL</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={{color: 'white', fontSize: 16,}}>P</Text>
                    </View>
                </View>
                <ListView
                dataSource = {this.state.todoDataSource}
                renderRow={this.renderRow}
                />
            </ScrollView>
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 7,
        marginBottom: 5,
        marginLeft: 2.5,
        marginRight: 2.5,
        backgroundColor: 'black',
    },

    nameColumn: {
        flex: 2.5,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 7,
        marginBottom: 5,
        marginLeft: 2.5,
        marginRight: 2.5,
        backgroundColor: 'black',
    },
});