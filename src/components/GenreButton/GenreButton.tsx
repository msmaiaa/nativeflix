import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as utils from '../../utils/utils';
import * as consts from '../../consts/consts';

type Prop = {
	item: string;
	// eslint-disable-next-line @typescript-eslint/ban-types
	onPress: Function;
};

export default function GenreButton({ item, onPress }: Prop) {
	const name = utils.capitalizeFirstLetter(item);

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.btn} onPress={() => onPress(item)}>
				<Text style={{ textAlign: 'center', color: '#fff' }}>
					{name}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginBottom: '1%',
		width: '100%',
		flexDirection: 'row',
	},
	btn: {
		backgroundColor: consts.backgroundColor,
		width: '100%',
		justifyContent: 'center',
		height: 35,
		paddingTop: 5,
		paddingBottom: 5,
	},
});
