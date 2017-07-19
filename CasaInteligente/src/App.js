import React from 'react';
// import { vw, vh } from 'react-native-viewport-units';
import {
	StyleSheet,
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
    <View>
    	<View style={ styles.lineTools }></View>
    	<View style={ styles.profile }>
    		<View style={ styles.thumb }>
    			<Image source={{ uri: 'https://res.cloudinary.com/dwqwnm1r6/image/upload/v1499808665/house_uwlxiy.png' }} style={ styles.imageThumb } />
    		</View>
        	<View style={ styles.boxPart }></View>
    	</View>
    </View>
  );
};

const styles = StyleSheet.create( {
	profile: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: 45*vw,
		backgroundColor: '#6c5b7b',
		zIndex: 9
	},
	thumb: {
		position: 'absolute',
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
		bottom: 15*vw,
		left: 5*vw,
		width: 20*vw,
		height: 20*vw,
		backgroundColor: '#f8aa80',
		// backgroundImage: {

		// },
		// background-repeat: no-repeat;
		// background-image: url("http://res.cloudinary.com/dwqwnm1r6/image/upload/v1499808665/house_uwlxiy.png");
		// background-size: 80%;
		// background-position: center;
		borderRadius: 20*vw,

		// transition: all .5s linear;

	    // transform: scale(0, 0);
	    // box-shadow: 0 2px 5px 1px rgba( 0, 0, 0, .2 );
		zIndex: 9
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
		bottom: -20*vw,
		backgroundColor: 'white',
		transform: [{rotate: '7deg'}],
		zIndex: 1
	},
	lineTools: {
		position: 'absolute',
		width: 1.2*vw,
		backgroundColor: 'rgba( 0, 0, 0, 0.05 )',
		top: 25*vw,
		left: 14.5*vw,
		height: '100%',
		zIndex: 1
	}
} );

export default App;


