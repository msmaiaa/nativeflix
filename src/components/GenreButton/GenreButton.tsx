import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
			<TouchableOpacity
				style={styles.btn}
				onPress={() => onPress(item)}
				containerStyle={{ overflow: 'visible' }}
			>
				<Text
					style={{
						textAlign: 'center',
						color: '#ffffff',
						fontFamily: 'Roboto_300Light',
						fontSize: 18,
					}}
				>
					{name}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginBottom: 35,
		width: 115,
		height: 45,
	},
	btn: {
		backgroundColor: '#000000',
		borderRadius: 5,
		width: 115,
		justifyContent: 'center',
		height: 45,
		paddingTop: 5,
		paddingBottom: 5,
		shadowColor: consts.grayShadowColor,
		elevation: 10,
		shadowRadius: 1,
		shadowOffset: { width: -5, height: 5 },
		shadowOpacity: 5,
		borderColor: consts.grayShadowColor,
		borderWidth: 1,
	},
});
