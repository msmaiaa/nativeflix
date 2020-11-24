import axios from 'axios';
import * as utils from './utils';

async function getReq(url){
    let rawdata = await axios.get(url);
    return rawdata.data.data;
}

export async function getMovies(genre, sort_by = null, activePage){
    let params = {genre: genre, sort_by: sort_by, page: activePage};
    if(!sort_by){
        params.sort_by = 'download_count';
    }
    let reqUrl = utils.mountUrlParams(params);
    let data = await getReq(reqUrl);
    return utils.filterMovies(data, activePage);
}

