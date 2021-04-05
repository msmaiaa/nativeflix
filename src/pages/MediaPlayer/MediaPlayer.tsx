import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SocketContext } from '../../context/socket';
import { Torrent } from '../../models/Torrent';

type Props = {
	navigation: any;
};

//	split later
interface SocketWatchingResponse {
	condition: boolean;
	media?: Torrent;
}

interface SocketPausedResponse {
	isPaused: boolean;
}

export default function MediaPlayer({ navigation }: Props) {
	const socket = useContext(SocketContext);
	const [isWatching, setWatching] = useState(false);
	const [activeMedia, setActiveMedia] = useState(null);
	const [playerPaused, setPlayerPaused] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const isMounted = useRef(true);

	useEffect(() => {
		socket.emit('APP_GET_STATUS');
		socket.emit('APP_GET_PAUSED');
		socket.on(
			'SET_STATUS_APP',
			({ condition, media }: SocketWatchingResponse) => {
				if (isMounted.current) {
					if (condition) {
						setWatching(true);
						setActiveMedia(media);
					} else {
						setWatching(false);
						setActiveMedia(null);
					}
				}
			}
		);

		socket.on('SET_PLAYER_PAUSED', ({ isPaused }: SocketPausedResponse) => {
			setPlayerPaused(isPaused);
		});

		return () => {
			isMounted.current = false;
			socket.off('SET_STATUS_APP');
		};
	}, []);

	const pausePlayer = () => {
		socket.emit('APP_PAUSE_PLAYER');
	};

	const closeProcess = () => {
		socket.emit('APP_CLOSE_PROCESS');
	};

	return (
		<View style={styles.container}>
			{isWatching && activeMedia ? (
				<View>
					<Text style={styles.text}>is watching</Text>
					<Text style={styles.text}>
						{playerPaused ? 'Paused' : 'Not paused'}
					</Text>
					<TouchableOpacity
						style={styles.optionBtn}
						onPress={pausePlayer}
					>
						<Text style={styles.btnText}>
							{playerPaused ? 'Play' : 'Pause'}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.optionBtn}
						onPress={closeProcess}
					>
						<Text style={styles.btnText}>Close</Text>
					</TouchableOpacity>
				</View>
			) : (
				<Text style={styles.text}>Not watching</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
		height: '100%',
	},
	text: {
		color: '#fff',
	},
	optionBtn: {
		padding: 15,
		backgroundColor: 'grey',
	},
	btnText: {
		color: '#fff',
	},
});
