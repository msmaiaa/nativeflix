import { Torrent } from '../../models/Torrent';
import { MediaInfoParams, GetAllMediaParams, Media } from '../../models/Media';
import { ApiResponseData } from '../../models/Api';

const axios = require('axios');

//	const ytsApi = 'https://yts.mx/api/v2/list_movies.json?';
const animeApi = 'https://tv-v2.api-fetch.sh/';
const popApi = 'http://popcorn-ru.tk/';
const mediaApi = 'https://popcorn-api-enhanced.herokuapp.com/';

interface UrlParams {
	genre?: string;
	page?: number | string;
	mediaType?: string;
	query?: string;
}

async function getReq(url: string) {
	const rawdata = await axios.get(url);
	return rawdata.data;
}

export async function getMedia({
	genre,
	activePage,
	query = null,
	mediaType,
}: GetAllMediaParams) {
	//	mediaApi returns the content sorted by trending
	//	still need to add query search option to the api
	const params: UrlParams = {
		genre,
		page: activePage,
		mediaType: `${mediaType}s`,
	};
	if (query) {
		params.query = query;
	}

	const reqUrl = mountUrlParams(params);
	const data: ApiResponseData = await getReq(reqUrl);
	return filterMedia(data, activePage, mediaType);
}

export async function getMediaInfo(mediaInfo: MediaInfoParams) {
	let baseUrl = '';
	if (mediaInfo.type === 'anime') {
		baseUrl = animeApi;
	} else {
		baseUrl = popApi;
	}
	const newUrl = `${baseUrl}${mediaInfo.type}/${mediaInfo.id}`;
	const info = await getReq(newUrl);
	return info;
}

const filterMedia = (
	data: ApiResponseData,
	page: number | string,
	type: string
) => {
	const totalPages: number[] = [];
	const medias: any[] = [];
	for (let i = 0; i <= data.totalPages; i++) {
		totalPages[i] = i + 1;
	}
	for (const m of data.data) {
		const content: Media = {
			image: m.images.poster,
			largeImage: m.images.poster,
			description: m.synopsis,
			genres: m.genres,
			// eslint-disable-next-line no-underscore-dangle
			id: m._id,
			rating: m.rating,
			title: m.title,
			year: m.year,
			type,
		};
		if (type === 'Movie') {
			content.torrents = filterTorrents(m.torrents);
		}
		medias.push(content);
	}
	return { activePage: page, totalPages, medias };
};

const filterTorrents = (torrents: any) => {
	const newTorrents: Torrent[] = [];
	const torrentList: [string, any][] = Object.entries(torrents.en);
	for (const [key, value] of torrentList) {
		newTorrents.push({
			quality: key,
			seeds: value.seeds,
			peers: value.peers,
			size: value.filesize,
			size_bytes: value.size,
			url: value.url,
			title: value.title,
		});
	}
	return newTorrents;
};

const mountUrlParams = (params: UrlParams) => {
	const newUrl = `${mediaApi}${params.mediaType}?genre=${params.genre}&page=${params.page}`;
	return newUrl;
};
