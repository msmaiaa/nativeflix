interface ActiveMedia {
	quality: string;
	seeds: number;
	peers: number;
	size: string;
	size_bytes: string;
	url: string;
	type: string;
	title: string;
	imdb_code: string;
}

export interface PlayerStatusResponse {
	condition: boolean;
	activeMedia?: ActiveMedia;
}
