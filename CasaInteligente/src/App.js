import React from 'react';
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

// MyCustomComponent = Animatable.createAnimatableComponent( MyCustomComponent );

var Dimensions = require( 'Dimensions' ),
	{ width, height } = Dimensions.get( 'window' );

var vw = width/100,
	vh = height/100;

const App = () => {
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

					<TouchableOpacity style={ styles.tool } onPress={() => this.refs.view.bounce(800).then((endState) => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled')}>
						<Animatable.View ref="view" animation="nav" delay={500} iterationCount="1">
							<View style={ styles.ballStatus }></View>
							<View style={ styles.boxFix }>
							<Text style={ styles.toolName }>Regador</Text>
							<Text style={ styles.toolTime }>
							<Text style={ styles.toolStarted }>9:02</Text>
							</Text>
							</View>
						</Animatable.View>
					</TouchableOpacity>

	      </ScrollView>
    	</View>
    </View>
  );
};

// <View style={ styles.tool }>
//     <Text style={ styles.name }>Regador</Text>
//     <Text style={ styles.time }>
// 			<Text style={ styles.started }>9:02</Text>
// 		</Text>
// </View>

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

// Animatable.initializeRegistryWithDefinitions( fadeIn );

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
		top: 5.5*vw,
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
