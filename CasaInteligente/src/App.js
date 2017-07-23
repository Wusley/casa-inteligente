import React from 'react';
// import { vw, vh } from 'react-native-viewport-units';
import {
	StyleSheet,
	ScrollView,
	FlatList,
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

				<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
					 <FlatList
						 data={this.state.data}
						 renderItem={({ item }) => (
							 <ListItem
								 roundAvatar
								 title={`${item.name.first} ${item.name.last}`}
								 subtitle={item.email}
								 avatar={{ uri: item.picture.thumbnail }}
								 containerStyle={{ borderBottomWidth: 0 }}
							 />
						 )}
						 keyExtractor={item => item.email}
						 ItemSeparatorComponent={this.renderSeparator}
						 ListHeaderComponent={this.renderHeader}
						 ListFooterComponent={this.renderFooter}
						 onRefresh={this.handleRefresh}
						 refreshing={this.state.refreshing}
						 onEndReached={this.handleLoadMore}
						 onEndReachedThreshold={50}
					 />
				 </List>
	        // <View style={ styles.tool }>
          //     <Text style={ styles.name }>Regador</Text>
          //     <Text style={ styles.time }>
					// 			<Text style={ styles.started }>9:02</Text>
					// 		</Text>
	        // </View>
	      </ScrollView>
    	</View>
    </View>
  );
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
	}
} );

export default App;
