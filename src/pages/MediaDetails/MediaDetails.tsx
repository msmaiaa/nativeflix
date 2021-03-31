import React, { useEffect, useState, useRef, useContext } from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Text,
	Image,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import { Torrent } from '../../models/Torrent';
import LabelSM from '../../components/LabelSM/LabelSM';
import { SocketContext } from '../../context/socket';
import MediaOption from '../../components/MediaOption/MediaOption';

//	split later
interface SocketWatchingResponse {
	condition: boolean;
	activeCode?: string;
}

type Props = {
	route: any;
	navigation: any;
};

export default function MediaDetails({ route, navigation }: Props) {
	const [isWatching, setWatching] = useState(null);
	const [activeMovie, setActiveMovie] = useState(null);
	const [isLoading, setLoading] = useState(true);

	const socket = useContext(SocketContext);
	const mediaData = route.params.data;
	const mediaGenres: string[] = [];
	const mediaOptions = mediaData.torrents;

	//	fix memory leak
	const isMounted = useRef(true);

	useEffect(() => {
		navigation.setOptions({ headerTitle: '' });
		socket.emit('app_getStatus');
		mediaData.genres.forEach((g: string, index: number) => {
			if (index === mediaData.genres.length - 1) {
				mediaGenres.push(g);
			} else {
				mediaGenres.push(`${g} / `);
			}
		});
		setLoading(false);
		return () => {
			isMounted.current = false;
			socket.off('SET_WATCHING');
		};
	}, []);

	socket.on(
		'SET_WATCHING',
		({ condition, activeCode }: SocketWatchingResponse) => {
			if (isMounted.current) {
				if (condition) {
					setWatching(true);
					setActiveMovie(activeCode);
				} else {
					setWatching(false);
					setActiveMovie(false);
				}
			}
		}
	);

	const pausePlayer = () => {
		socket.emit('APP_PAUSE_PLAYER');
	};

	const closeProcess = () => {
		socket.emit('APP_CLOSE_PROCESS');
	};

	//	sends magnet and some identification stuff to the server
	const handleOptionClick = (data: any) => {
		const newData = {
			...data,
			title: mediaData.title,
			imdb_code: mediaData.id,
		};
		if (newData.type === 'stream') {
			socket.emit('APP_START_STREAM', newData);
		} else {
			socket.emit('APP_START_DOWNLOAD', newData);
		}
	};

	if (isLoading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#E50914" />
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.mainContent}>
					<Text style={styles.title}>{mediaData.title}</Text>
					<LabelSM
						title={mediaData.year}
						bgColor="#ffffff"
						width={32}
					/>
					<Image
						source={{ uri: mediaData.largeImage }}
						style={styles.image}
					/>
					<View style={styles.movieInfo}>
						<Text
							style={{
								color: '#fff',
								fontFamily: 'Roboto_400Regular',
								fontSize: 18,
							}}
						>
							Synopsis
						</Text>
						<Text style={styles.movieDescText}>
							{mediaData.description}
						</Text>
					</View>
					{isWatching && activeMovie === mediaData.id ? (
						<View style={styles.movieActions}>
							<TouchableOpacity
								style={{
									backgroundColor: '#E50914',
									padding: 5,
									marginRight: 5,
								}}
								onPress={closeProcess}
							>
								<Text style={{ fontSize: 12, color: '#fff' }}>
									Close
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									backgroundColor: '#E50914',
									padding: 5,
								}}
								onPress={pausePlayer}
							>
								<Text style={{ fontSize: 12, color: '#fff' }}>
									Pause/Play
								</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.mediaOptions}>
							<Text
								style={{
									color: '#fff',
									fontSize: 15,
									marginBottom: 20,
								}}
							>
								Movie Options
							</Text>
							{mediaOptions.map(
								(value: Torrent, index: number) => {
									return (
										<MediaOption
											key={value.seeds}
											quality={value.quality}
											seeds={value.seeds}
											peers={value.peers}
											press={() =>
												handleOptionClick({
													value,
													type: 'stream',
												})
											}
										/>
									);
								}
							)}
						</View>
					)}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		height: '5%',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#E50914',
	},
	mainContent: {
		flex: 1,
		height: '90%',
		paddingTop: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		textAlign: 'center',
		color: '#fff',
		fontFamily: 'Roboto_300Light_Italic',
		fontSize: 24,
		marginBottom: 10,
	},
	image: {
		height: 350,
		width: 250,
	},
	movieInfo: {
		marginTop: 25,
		width: 250,
	},
	movieDescText: {
		marginTop: 10,
		color: '#A8A8A8',
		textAlign: 'center',
		fontSize: 12,
	},
	mediaOptions: {
		marginTop: 20,
		marginBottom: 10,
		alignItems: 'center',
	},
	qualityArea: {
		marginBottom: 20,
		alignItems: 'center',
		width: 300,
	},
	qualityText: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	movieActions: {
		justifyContent: 'center',
		flexDirection: 'row',
		marginTop: 20,
		marginBottom: 30,
	},
});
