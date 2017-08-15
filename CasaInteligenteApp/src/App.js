import React, { Component } from 'react';
// import { vw, vh } from 'react-native-viewport-units';
import {
	StyleSheet,
	ScrollView,
	TouchableNativeFeedback,
	View,
	Text,
	Image
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import * as firebase from "firebase";

var Dimensions = require( 'Dimensions' ),
	{ width, height } = Dimensions.get( 'window' );

var vw = width/100,
		vh = height/100;

class Tool extends Component {
  constructor(props) {
    super(props);

    this.state = {
			delay: Number( props.delay ),
			name: props.name,
			started: props.started,
			ended: props.ended,
			status: props.status
		};
  }

  render() {
		const { status } = this.state;

    return (
			<TouchableNativeFeedback style={ styles.tool } onPress={ () => {
					this.setState( { status: !status } );
			    this.refs.view.animate( 'rubberBand', 2000 );
				}
			}>
				<Animatable.View animation="bounceIn" delay={this.state.delay} iterationCount={1}>
					<Animatable.View ref="view" style={[ styles.ballStatus, status && styles.ballStatusOn ]} transition={['backgroundColor']}></Animatable.View>
					<View style={ styles.boxFix }>
						<Text style={ styles.toolName }>{ this.state.name }</Text>
						<Text style={ styles.toolTime }>
							<Text style={ styles.toolStarted }>{ this.state.started }</Text>
						</Text>
					</View>
				</Animatable.View>
			</TouchableNativeFeedback>
    );
  }
}

class App extends Component {
	componentWillMount() {
		var firebaseConfig = {
			apiKey: "AIzaSyDhC4Z7RA3hIv3zXLbQy7Ba1A3iPQqVF2U",
			authDomain: "casainteligente-975a3.firebaseapp.com",
			databaseURL: "https://casainteligente-975a3.firebaseio.com",
			projectId: "casainteligente-975a3",
			storageBucket: "casainteligente-975a3.appspot.com",
			messagingSenderId: "612325903889"
		};

		firebase.initializeApp(firebaseConfig);

		const rootRef = firebase.database().ref('casa-1').once('value').then(function(snapshot) {

			let tools = [];

			snapshot.forEach(function( data ) {

				tools.push( data.val() );

			} );

			console.log(props);


			this.setState( {
				data: tools
			} );

		} );
	}

	constructor(props) {
    super(props);

		this.state = {
			data: {}
		};
	}

	render() {

		const tools = [
			{
				"id": 0,
				"name": "Lâmpada cozinha",
				"started": "9:02",
				"ended": "9:17",
				"status": true
			},
			{
				"id": 1,
				"name": "Campainha",
				"started": "21:45",
				"ended": "21:45",
				"status": false
			},
			{
				"id": 2,
				"name": "Abajur",
				"started": "11:54",
				"ended": "13:14",
				"status": true
			},
			{
				"id": 3,
				"name": "Lâmpada sala",
				"started": "20:54",
				"ended": "22:01",
				"status": true
			}
		];

		console.log(tools);

		// function listTools( tools ) {
		// 	return tools.map( tool => {
		// 		let delay = 400 + 250 * parseInt( tool.id );
	  //     return <Tool key={ tool.id } status={ tool.status } name={ tool.name } started={ tool.started } ended={ tool.ended } delay={ delay }/>;
	  //   } );
		// }

		// this.data = tools.map( tool => {
		// 					let delay = 400 + 250 * parseInt( tool.id );
		// 		      return <Tool key={ tool.id } status={ tool.status } name={ tool.name } started={ tool.started } ended={ tool.ended } delay={ delay }/>;
		// 		    } );

		return (
			<View style={ styles.main }>
				<View style={ styles.mainFix }>
					<View style={ styles.profile }></View>
					<View style={ styles.boxPart }></View>

					<Animatable.View style={ styles.lineTools } animation="nav" delay={ 500 } iterationCount={ 1 }></Animatable.View>
					<Animatable.View style={ styles.thumb } animation="bounceIn" iterationCount={ 1 }>
						<Image source={{ uri: 'https://res.cloudinary.com/dwqwnm1r6/image/upload/v1499808665/house_uwlxiy.png' }} style={ styles.imageThumb } />
					</Animatable.View>

					<ScrollView style={ styles.tools }>
						{ this.data }
					</ScrollView>
				</View>
			</View>
		);
	}
};

Animatable.initializeRegistryWithDefinitions({
	nav: {
	  from: {
	    height: '0%',
	  },
	  to: {
	    height: '100%',
	  }
	}
} );

const styles = StyleSheet.create( {
	main: {
		backgroundColor: 'white',
		width: '100%',
		height: '100%'
	},
	mainFix: {
		height: '100%'
	},
	profile: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: 40*vw,
		backgroundColor: '#6c5b7b',
		zIndex: 0
	},
	thumb: {
		position: 'absolute',
		flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
		top: 10*vw,
		left: 10*vw,
		width: 20*vw,
		height: 20*vw,
		backgroundColor: '#f8aa80',
		// opacity: 0,
		// backgroundImage: {

		// },
		// background-repeat: no-repeat;
		// background-image: url("http://res.cloudinary.com/dwqwnm1r6/image/upload/v1499808665/house_uwlxiy.png");
		// background-size: 80%;
		// background-position: center;
		borderRadius: 20*vw,
		elevation: 5,

		// transition: all .5s linear;

	    // transform: scale(0, 0);

		zIndex: 3
	},
	imageThumb: {
		width: '80%',
		height: '80%'
	},
	boxPart: {
		position: 'absolute',
		width: '110%',
		height: 40*vw,
		left: -5*vw,
		top: 25*vw,
		backgroundColor: 'white',
		transform: [{rotate: '7deg'}],
		zIndex: 1
	},
	lineTools: {
		position: 'absolute',
		width: 1.2*vw,
		backgroundColor: 'rgba( 0, 0, 0, 0.05 )',
		top: 25*vw,
		left: 19.5*vw,
		height: '100%',
		zIndex: 2
	},
	tools: {
		top: -1*vw,
		// left: 31*vw,
		zIndex: 3
	},
	boxFix: {
		left: 30*vw,
		paddingTop: 3*vw,
		paddingBottom: 3*vw
	},
	tool: {
		// borderWidth: 1,
		borderColor: '#000000',
		// height: 18*vw,
	},
	ballStatus: {
		position: 'absolute',
		left: 18.7*vw,
		top: 6*vw,
		width: 3*vw,
		height: 3*vw,
		borderRadius: 50,
		backgroundColor: '#f67280'
	},
	ballStatusOn: {
		backgroundColor: '#6fd9c9'
	},
	toolName: {
		fontSize: 21
		// fontWeight: 'bold'
	},
	toolTime: {

	}
} );

export default App;
