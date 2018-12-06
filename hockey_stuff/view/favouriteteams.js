import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableHighlight, ListView, Text, View, Alert } from 'react-native';
import { db } from '../service/db.js';

export default class FavouriteTeams extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "My Favourite Teams",
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
            favTeams: [],
            error: false,
            todoDataSource: ds
        }

    }
    renderRow(task, sectionID, rowID, hightlightRow) {
        return (
            <Text style={styles.title}>{task.teamtag} || {task.teamname}</Text>
        )
    }
    componentWillMount() {
        var username = this.props.navigation.getParam('login', '')
        this.setState({
            name: username
        })
        db.ref('/login').orderByChild("username").equalTo(username).once('value').then((response) => {
            loginfo = response.toJSON()
            if (loginfo !== null) {
                userID = Object.keys(loginfo)
                favteam = loginfo[userID[0]].favteam
                //change to teamname or teamtag whichever
                teams = []
                for(team in favteam){
                    //change to favteam[team] to favteam[team].whatever (teamtag, teamname)
                    teams.push(favteam[team])
                }
                //erase this part
                if (favteam !== null) {
                    this.setState({
                        todoDataSource: this.state.todoDataSource.cloneWithRows(teams)
                    })
                }
            }

        })
        
    }

    render() {
        return (
            <View style={styles.main}>
        <TouchableHighlight style={styles.button} onPress={()=>this.props.navigation.navigate('AddTeam',{login: this.props.navigation.getParam('login', '')})}>
        <Text style={styles.title}>Add New Favourite Teams</Text>
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