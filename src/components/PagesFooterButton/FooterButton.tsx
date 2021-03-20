import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

type Props = {
	data: number | string;
	// eslint-disable-next-line @typescript-eslint/ban-types
	onPress: Function;
	activePage: number | string;
};

export default function FooterButton({ data, onPress, activePage }: Props) {
	const page = data;
	const handlePress = () => {
		onPress(page);
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={activePage === page ? styles.activeButton : styles.button}
		>
			<Text style={activePage === page ? styles.activePage : styles.text}>
				{page}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'red',
		height: 30,
		width: 30,
		marginRight: 8,
	},
	activeButton: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		height: 30,
		width: 30,
		marginRight: 8,
	},
	text: {
		color: '#fff',
	},
	activePage: {
		color: '#E50914',
	},
});
