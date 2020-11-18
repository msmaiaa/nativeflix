const url = 'https://yts.mx/api/v2/list_movies.json?';

export function filterMovies(data, page){
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

export function mountUrlParams (params){
    let newUrl = url;
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
