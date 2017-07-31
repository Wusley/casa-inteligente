import React, { Component } from 'react';
// import { vw, vh } from 'react-native-viewport-units';
import {
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	View,
	Text,
	Image
} from 'react-native';

import * as Animatable from 'react-native-animatable';

var Dimensions = require( 'Dimensions' ),
	{ width, height } = Dimensions.get( 'window' );

var vw = width/100,
	vh = height/100;

class Tool extends Component {
  constructor(props) {
    super(props);
    this.state = {
			delay: 0,
			name: 'Tool Name',
			started: '0:00',
			ended: '0:00'
		};
  }

  render() {
		let delay = Number( this.props.delay );

    return (
			<TouchableOpacity style={ styles.tool } onPress={() => {}}>
				<Animatable.View animation="bounceIn" delay={delay} iterationCount="1">
					<Animatable.View style={ styles.ballStatus }></Animatable.View>
					<View style={ styles.boxFix }>
						<Text style={ styles.toolName }>{this.props.name !== "" ? this.props.name : this.state.name }</Text>
						<Text style={ styles.toolTime }>
							<Text style={ styles.toolStarted }>{this.props.started !== "" ? this.props.started : this.state.started }</Text>
						</Text>
					</View>
				</Animatable.View>
			</TouchableOpacity>
    );
  }
}

class App extends Component {

	render() {

		const tools = [
			{
				"id": 0,
				"name": "Tool 1",
				"started": "9:02",
				"ended": "00:00",
				"status": 0
			},
			{
				"id": 1,
				"name": "",
				"started": "",
				"ended": "",
				"status": 0
			},
			{
				"id": 2,
				"name": "Tool 3",
				"started": "11:54",
				"ended": "00:00",
				"status": 1
			}
		];

		// arrumar delay

		const data = tools.map( tool => {
			let delay = 500 + ( 1250 * ( tool.id + 1 ) );
      return <Tool key={tool.id} name={tool.name} started={tool.started} delay="{delay}"/>;
    });

		return (
			<View style={ styles.main }>
				<View style={ styles.mainFix }>
					<View style={ styles.profile }></View>
					<View style={ styles.boxPart }></View>

					<Animatable.View style={ styles.lineTools } animation="nav" delay={500} iterationCount="1"></Animatable.View>
					<Animatable.View style={ styles.thumb } animation="bounceIn" iterationCount="1">
						<Image source={{ uri: 'https://res.cloudinary.com/dwqwnm1r6/image/upload/v1499808665/house_uwlxiy.png' }} style={ styles.imageThumb } />
					</Animatable.View>

					<ScrollView style={ styles.tools }>
						{data}
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
	},
	tool: {
		// borderWidth: 1,
		borderColor: '#000000',
		// height: 18*vw
		paddingTop: 3*vw,
		paddingBottom: 3*vw
	},
	ballStatus: {
		position: 'absolute',
		left: 18.7*vw,
		top: 3*vw,
		width: 3*vw,
		height: 3*vw,
		borderRadius: 50,
		backgroundColor: '#f67280'
	},
	toolName: {
		fontSize: 21
		// fontWeight: 'bold'
	},
	toolTime: {

	}
} );

export default App;
