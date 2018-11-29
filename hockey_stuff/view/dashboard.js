import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableHighlight, Text, View, Alert } from 'react-native';

export default class Dashboard extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "My Dashboard",
            headerLeft: null,
            headerStyle: {backgroundColor: 'gray'},
            headerTitleStyle: {textAlign: 'center'}
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            error: false
        }
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(e) {
        console.log("this happened");
    }

    componentDidMount() {
        console.log(this.props.navigation.getParam('login', ''));
        var username = this.props.navigation.getParam('login', '')
        this.setState({
            name: username
        })
    }
    render() {
        return (
            <View style={styles.main}>
        <TouchableHighlight style={styles.button} onPress={()=>{this.props.navigation.navigate('Standings', {login: this.props.navigation.getParam('login', '')})}}>
        <Text style={styles.title}>Current Standings</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={()=>{this.props.navigation.navigate('UpcomingGames', {login: this.props.navigation.getParam('login', '')})}}>
        <Text style={styles.title}>Upcoming Games</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={()=>{this.props.navigation.navigate('FavTeams', {login: this.props.navigation.getParam('login', '')})}}>
        <Text style={styles.title} >My Favourite Teams</Text>
        </TouchableHighlight>
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