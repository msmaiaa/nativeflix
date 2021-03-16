const movieGenres = ['action','adventure','animation','biography','comedy','crime','documentary','drama','family','fantasy','film-noir','history','horror','music','musical','mystery','romance','sci-fi','sport','thriller','war','western']
const showGenres = ['action','adventure','animation','comedy','crime','disaster','documentary','drama','eastern','family','fan-film','fantasy','film-noir','history','holiday','horror','indie','music','mystery','none','road','romance','science-fiction','short','sports','sporting-event','suspense','thriller','tv-movie','war','western']
const animeGenres = ['Action','Ecchi','Harem','Romance','School','Supernatural','Drama','Comedy','Mystery','Police','Sports','Mecha','Sci-Fi','Slice of Life','Fantasy','Adventure','Gore','Music','Psychological','Shoujo Ai','Yuri','Magic','Horror','Thriller','Gender Bender','Parody','Historical','Racing','Demons','Samurai','Super Power','Military','Dementia','Mahou Shounen','Game','Martial Arts','Vampire','Kids','Mahou Shoujo','Space','Shounen Ai']

module.exports = {
    netflixColor: '#E50914',
    movieGenres: movieGenres,
    showGenres: showGenres,
    animeGenres: animeGenres,
    allGenres: [
        {name: 'Movie',genres:movieGenres},
        {name: 'Show',genres:showGenres},
        {name: 'Anime',genres:animeGenres}
    ]
}
