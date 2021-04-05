export interface Torrent {
	quality: string;
	seeds: number;
	peers: number;
	size: string;
	size_bytes: string;
	url: string;
	title: string;
	largeImage?: string;
}
