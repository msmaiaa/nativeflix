import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as consts from '../../consts/consts';

const Shows = require('../../pics/shows.jpg');
const Movies = require('../../pics/movies.jpg');

const imgs: any = {
	//	Animes:require('../../pics/animes.jpg'),
	Shows,
	Movies,
};

type Prop = {
	item: any;
};

export default function CarouselItem({ item }: Prop) {
	const itemName: string = item.name;

	return (
		<View>
			<Image style={styles.image} source={imgs[itemName]} />
			<Text style={styles.text}>{item.name}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: consts.netflixColor,
		textAlign: 'center',
		width: '100%',
		fontSize: 16,
		backgroundColor: consts.netflixColor,
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
	},
	image: {
		width: '100%',
		height: 200,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
});
