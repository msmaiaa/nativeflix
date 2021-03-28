import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
	bgColor: string;
	title: string | number;
	width: number | string;
};

export default function LabelSM({ bgColor, title, width }: Props) {
	return (
		<View
			style={{
				width,
				height: 13,
				marginBottom: 12,
				borderWidth: 1,
				shadowOpacity: 2,
				shadowRadius: 2,
				shadowOffset: { width: 0, height: 0 },
				shadowColor: bgColor,
				elevation: 4,
				borderRadius: 5,
				borderColor: '#000000',
				backgroundColor: '#000000',
			}}
		>
			<Text style={styles.text}>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: '#ffffff',
		textAlign: 'center',
		fontSize: 10,
	},
});
