import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { MediaCard } from '../../components/MediaCard/MediaCard';
import { Media } from '../../models/Media';
import FooterButton from '../../components/PagesFooterButton/FooterButton';
import * as utils from '../../utils/utils';
import * as consts from '../../consts/consts';
import * as api from '../../services/api/api';

type Props = {
	navigation: any;
	route: any;
};

export default function MediaList({ navigation, route }: Props) {
	const [medias, setMedias] = useState([]);
	const [totalPages, setTotalPages] = useState(null);
	const [loading, setLoading] = useState(true);
	const [activePage, setActivePage] = useState(null);
	const mediaType = route.params.type;

	const headerTitle = `${utils.capitalizeFirstLetter(
		route.params.genre
	)} ${mediaType.toLowerCase()}s`;

	const headerStyle = {
		title: headerTitle,
		headerStyle: {
			backgroundColor: '#000',
		},
		headerTintColor: consts.netflixColor,
		headerTitleStyle: {
			fontSize: 20,
		},
	};

	const startFetchMedia = () => {
		setLoading(true);
		api.getMedia({ genre: route.params.genre, activePage, mediaType }).then(
			mediaData => {
				setTotalPages(mediaData.totalPages);
				setMedias(mediaData.medias);
				setLoading(false);
			}
		);
	};

	const handleNavigationPress = (media: Media) => {
		navigation.navigate('MediaDetails', { data: media });
	};

	const changePage = (pageNumber: number) => {
		setActivePage(pageNumber);
	};

	useEffect(() => {
		navigation.setOptions(headerStyle);
		setActivePage(1);
	}, []);

	useEffect(() => {
		if (activePage != null) {
			startFetchMedia();
		}
	}, [activePage]);

	if (loading || !totalPages || !medias) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#E50914" />
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<FlatList
				style={{ marginTop: 25 }}
				data={medias}
				numColumns={2}
				renderItem={({ item }) => (
					<MediaCard data={item} onPress={handleNavigationPress} />
				)}
				keyExtractor={item => item.id}
			/>

			<FlatList
				style={{ marginTop: 10 }}
				data={totalPages}
				horizontal
				keyExtractor={index => index.toString()}
				renderItem={({ item }) => (
					<FooterButton
						data={item}
						activePage={activePage}
						onPress={changePage}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000',
		flex: 1,
		justifyContent: 'center',
	},
});
