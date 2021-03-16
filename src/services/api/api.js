const axios = require('axios');

//const ytsApi = 'https://yts.mx/api/v2/list_movies.json?';
const animeApi = 'https://tv-v2.api-fetch.sh/'
const popApi = 'http://popcorn-ru.tk/'
const mediaApi = 'https://popcorn-api-enhanced.herokuapp.com/'

async function getReq(url){
    let rawdata = await axios.get(url);
    return rawdata.data;
}

export async function getMedia({genre, activePage, query=null, mediaType}){
    //mediaApi returns the content sorted by trending
    //still need to add query search option to the api  
    let params = {genre: genre,  page: activePage, mediaType:mediaType + 's'};
    if(query){
        params.query = query
    }

    let reqUrl = mountUrlParams(params);
    let data = await getReq(reqUrl);
    return filterMedia(data, activePage, mediaType);
}

export async function getMediaInfo(mediaInfo){
    let baseUrl = '';
    if(mediaType == 'anime'){
        baseUrl = animeApi;
    }else{
        baseUrl = popApi
    }
    let newUrl = `${baseUrl}${mediaInfo.type}/${mediaInfo.id}`
    let info = await getReq(newUrl)
    return info
}

const filterMedia = (data, page, type)=>{
    let newData = {activePage:page, medias: [], totalPages: []}
    for(let i = 0; i <= data.totalPages; i++){
        newData.totalPages[i] = i + 1
    }
    for(let m of data.data){
        let content = {
            image: m.images.poster,
            largeImage: m.images.poster,
            description: m.synopsis,
            genres: m.genres,
            id: m._id,
            rating: m.rating,
            title: m.title,
            year: m.year,
            type:type,
            }
        if(type == 'Movie'){
            content.torrents = filterTorrents(m.torrents)
        }
        newData.medias.push(content)
    }
    return newData;
}

const filterTorrents = (torrents) =>{
    let newTorrents = []
    for(const [key, value] of Object.entries(torrents.en)){
        newTorrents.push({
            quality: key,
            seeds: value.seeds,
            size: value.filesize,
            size_bytes: value.size
        })
    }
    return newTorrents
}

const mountUrlParams = (params)=>{
    let newUrl = `${mediaApi}${params.mediaType}?genre=${params.genre}&page=${params.page}`;
    return newUrl;
}