export interface MediaInfoParams {
	type: string;
	id: string;
}

export interface GetAllMediaParams {
	genre: string;
	activePage: number | string;
	mediaType: string;
	query?: string;
}

export interface Rating {
	percentage: number;
	watching: number;
	votes: number;
	loved: number;
	hated: number;
}

export interface Media {
	image: string;
	largeImage: string;
	description: string;
	genres: string;
	id: string;
	rating: Rating;
	title: string;
	year: string;
	type?: string;
	torrents?: any[];
}
