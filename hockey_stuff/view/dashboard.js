import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableHighlight ,Text, View, Alert } from 'react-native';

export default class Dashboard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			error: false
		}
		this.handleChange = this.handleChange.bind(this);

	}
	handleChange(e){
		console.log('That happened')
	}

  componentDidMount(){
    console.log(this.props.navigation.getParam('login', ''));
    var username = this.props.navigation.getParam('login', '')
    this.setState({
      name: username
    })
  }
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>{this.state.name}'s Dashboard</Text>
        <TouchableHighlight style={styles.button}>
        <Text style={styles.title}>Scores & Standings</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
        <Text style={styles.title}>Upcoming Games</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
        <Text style={styles.title}>Edit my Favourite Teams</Text>
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