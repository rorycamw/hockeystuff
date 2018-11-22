import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableHighlight, Text, View, Alert } from 'react-native';
import { db } from '../service/db.js'

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
            error: false
        }
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleLoginChange(e) {
        this.setState({
            login: e.nativeEvent.text
        });
    }

    handlePassChange(e) {
        this.setState({
            password: e.nativeEvent.text
        });
    }

    handleSubmit() {
        db.ref('/login').orderByChild("username").equalTo(this.state.login).once('value').then((response) => {
            loginfo = response.toJSON()
            if (loginfo !== null) {
                userID = Object.keys(loginfo)
                if (loginfo[userID[0]].password === this.state.password) {
                    this.props.navigation.navigate('Dashboard', { login: this.state.login });
                } else {
                    Alert.alert("Username or Password is Wrong")
                }
            } else {
                Alert.alert("Username or Password is Wrong")
            }

        })
    }

    render() {
        return (
            <View style={styles.main}>
        <Text style={styles.title}>Some Title</Text>
        <Text style={styles.title}>Username</Text>
        <TextInput style={styles.itemInput} onChange={this.handleLoginChange}/>
        <Text style={styles.title}>Password</Text>
        <TextInput secureTextEntry={true} style={styles.itemInput} onChange={this.handlePassChange}/>
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
        <Text style={styles.title}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}  onPress={()=>{this.props.navigation.navigate('Signup')}}>
        <Text style={styles.title}>Sign Up</Text>
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