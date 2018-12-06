import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableHighlight, ListView, Text, View, Alert } from 'react-native';
import { db } from '../service/db.js';

export default class AddTeams extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Add Favourite Teams",
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
            search: '',
            error: false,
            todoDataSource: ds,
            favTeams: []
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        // this.addTeam = this.addTeam.bind(this);
        this.getFavTeams = this.getFavTeams.bind(this);
    }
    renderRow(task, sectionID, rowID, hightlightRow) {
        return (
            <TouchableHighlight style={styles.button} onPress={()=>{
                db.ref('/login').orderByChild("username").equalTo(task.user).once('value').then((response)=>{
                    resp = response.toJSON();
                    userID = Object.keys(resp)

                    db.ref('/login/' + userID[0] + '/favteam').push({
                        teamname: task.teamname,
                        teamtag: task.teamtag
                    }).then(()=>{
                        task.nav.navigate('Dashboard', { login: task.user })
                    })
                })
            }}>
            <Text style={styles.title}>{task.teamtag} || {task.teamname}</Text>
            </TouchableHighlight>
        )
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
                        favteams = [];
                        for (team in favteam) {
                            favteams.push(favteam[team].teamname);
                        }
                        resolve(favteams)
                    }
                })
            } catch (err) {
                reject("Error in database")
            }
        })
    }

    handleSearch() {
        db.ref('/teams').orderByChild("teamname").once('value').then((response) => {
            resp = response.toJSON()
            searchHit = []
            for (res in resp) {
                if (resp[res].teamname.includes(this.state.search) && !this.state.favTeams.includes(resp[res].teamname)) {
                    resp[res].user = this.state.name
                    resp[res].nav = this.props.navigation
                    searchHit.push(resp[res])
                }
            }
            this.setState({
                todoDataSource: this.state.todoDataSource.cloneWithRows(searchHit)
            })

        })
    }

    handleSearchChange(e) {
        this.setState({
            search: e.nativeEvent.text
        })
    }

    componentWillMount() {
        var username = this.props.navigation.getParam('login', '')
        this.setState({
            name: username
        })
        this.getFavTeams().then((response) => {
            this.setState({
                favTeams: response
            })
        })
    }

    render() {
        return (
            <View style={styles.main}>
        <TextInput style={styles.itemInput} onChange={this.handleSearchChange}/> 
        <TouchableHighlight style={styles.button} onPress={this.handleSearch}>
        <Text style={styles.title}>Search</Text>
        </TouchableHighlight>
        <ListView 
            dataSource = {this.state.todoDataSource}
            renderRow = {this.renderRow}
        />
      </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        color: 'white'
    },
    itemInput: {
        height: 50,
        padding: 4,
        marginTop: 10,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 3,
        borderColor: 'gray',
        borderRadius: 8,
        color: '#ff0'
    },
    button: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'gray',
        borderColor: '#000',
        borderWidth: 3,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
})