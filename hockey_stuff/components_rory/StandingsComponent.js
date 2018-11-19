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
			modalVisible: false,
			imgUrl: '',
		}

		this.pressRow = this.pressRow.bind(this);
		this.renderRow = this.renderRow.bind(this);
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	setImgUrl(newUrl) {
		this.setState({imgUrl: newUrl});
	}

	fetchTodos() {
		fetch('https://statsapi.web.nhl.com/api/v1/schedule?startDate=2018-11-18&endDate=2018-11-18&expand=schedule.teams,schedule.linescore,schedule.broadcasts,schedule.ticket,schedule.game.content.media.epg&leaderCategories=&site=en_nhl')
			.then((response) => response.json())
			.then((response) => {
				this.setState({
					todoDataSource: this.state.todoDataSource.cloneWithRows(response.dates[0].games)
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
				<Modal
	          		animationType="fade"
	          		transparent={false}
	          		visible={this.state.modalVisible}
	          		onRequestClose={() => {
	            		Alert.alert('Modal has been closed.');
	          		}}
	          	>
	          		<View style={{alignItems: 'center', backgroundColor: '#a4d8ee'}}>
	              		<Image style={styles.featuredImg} source={{uri: this.state.imgUrl}}/>
	              		<TouchableHighlight
	              			onPress={() => {
	              				this.setModalVisible(!this.state.modalVisible);
	              			}}
	              		>
	              			<View style={styles.button}>
	              				<Text style={styles.back}>BACK TO GALLERY</Text>
	              			</View>
	              		</TouchableHighlight>
	              	</View>
	        	</Modal>
				<TouchableHighlight onPress={() => {
					this.pressRow(rowID);
					highlightRow(sectionID, rowID);
					this.setModalVisible(true);
					this.setImgUrl(task.url);
				}}>
					<View style={styles.row}>
						<Text>{JSON.stringify(response)}</Text>
					</View>
				</TouchableHighlight>
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

  galleryImg: {
  	width: 500,
  	height: 375,
  	borderColor: 'black',
  	borderWidth: 10,
  },

  featuredImg: {
  	marginTop: 50,
  	width: 700,
  	height: 700,
  	marginBottom: 50,
  	borderColor: 'black',
  	borderWidth: 10,
  },

  background: {
  	width: '100%',
  	height: '100%',
  	position: 'absolute',
  },

  button: {
  	paddingHorizontal: 35,
  	paddingVertical: 15,
  	backgroundColor: 'indigo',
  	justifyContent: 'center',
  	alignItems: 'center',
  	borderRadius: 25,
  },

  back: {
  	color: 'white',
  	fontSize: 50,
  }
});