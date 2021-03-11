import axios from 'axios';

const moviesApi = 'https://yts.mx/api/v2/list_movies.json?';
const popApi = 'https://tv-v2.api-fetch.sh/'

async function getReq(url){
    let rawdata = await axios.get(url);
    return rawdata.data.data;
}

export async function getMovies(genre, sort_by = null, activePage){
    let params = {genre: genre, sort_by: sort_by, page: activePage};
    if(!sort_by){
        params.sort_by = 'download_count';
    }
    let reqUrl = mountUrlParams(params);
    let data = await getReq(reqUrl);
    return filterMovies(data, activePage);
}

const filterMovies = (data, page)=>{
    let totalPages = Math.ceil(data.movie_count / data.limit);
    let newData = {totalPages: totalPages, activePage:page, movies: []}
    for(let m of data.movies){
        newData.movies.push(
            {image: m.medium_cover_image,
            largeImage: m.large_cover_image,
            description: m.description_full,
            genres: m.genres,
            imdb_code: m.imdb_code,
            rating: m.rating,
            title: m.title,
            torrents: m.torrents,
            year: m.year}
        )
    }
    return newData;
}

const mountUrlParams = (params)=>{
    let newUrl = moviesApi;
    if(params.genre){
        newUrl = newUrl.concat(`&genre=${params.genre}`)
    }
    if(params.sort_by){
        newUrl = newUrl.concat(`&sort_by=${params.sort_by}`)
    }
    if(params.page){
        newUrl = newUrl.concat(`&page=${params.page}`)
    }
    return newUrl;
}
