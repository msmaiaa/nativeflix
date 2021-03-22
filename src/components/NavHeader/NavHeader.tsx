import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function NavHeaderBtn() {
	return (
		<View>
			<Image
				source={require('../../pics/headerBack.png')}
				style={styles.img}
			/>
		</View>
	);
}

const NavHeaderOptions = {
	headerBackImage: () => <NavHeaderBtn />,
	headerStyle: {
		height: 50,
		backgroundColor: '#000000',
		shadowColor: '#fff',
	},
	headerTintColor: '#ffffff',
	headerTitle: '',
	headerBackTitle: '',
	headerBackTitleVisible: false,
	headerTitleStyle: {
		fontSize: 30,
		fontFamily: 'Roboto_300Light_Italic',
	},
};

const styles = StyleSheet.create({
	img: {
		height: 30,
		width: 30,
		marginLeft: 10,
	},
});

export { NavHeaderBtn, NavHeaderOptions };
