import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import consts from '../../consts/consts';
import LabelSM from '../LabelSM/LabelSM';

type Props = {
	quality: string;
	seeds: string | number;
	peers: string | number;
	// eslint-disable-next-line @typescript-eslint/ban-types
	press: Function;
};

export default function MediaOption({ quality, seeds, peers, press }: Props) {
	return (
		<View style={styles.area}>
			<TouchableOpacity onPress={() => press()} style={styles.btn}>
				<Text style={styles.quality}>{quality}</Text>
			</TouchableOpacity>
			<View style={styles.infoArea}>
				<View style={styles.labelArea}>
					<Text style={styles.labelText}>seeds: </Text>
					<LabelSM
						title={seeds}
						width={41}
						bgColor={consts.greenShadowColor}
					/>
				</View>
				<View style={styles.labelArea}>
					<Text style={styles.labelText}>peers: </Text>
					<LabelSM
						title={peers}
						width={41}
						bgColor={consts.redShadowColor}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	area: {
		backgroundColor: '#000000',
		width: 170,
		height: 35,
		flexDirection: 'row',
		marginBottom: 28,
	},
	quality: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center',
	},
	btn: {
		elevation: 1,
		shadowRadius: 2,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 2,
		shadowColor: '#fff',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#000000',
		backgroundColor: '#000000',
		paddingVertical: 6,
		paddingHorizontal: 10,
		width: 72,
		marginRight: 2,
	},
	infoArea: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	labelArea: {
		flexDirection: 'row',
		height: 13,
	},
	labelText: {
		fontSize: 10,
		color: '#fff',
		marginRight: 2,
	},
});
