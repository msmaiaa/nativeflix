import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 200,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
});
