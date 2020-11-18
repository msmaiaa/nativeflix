import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MovieCard } from '../MovieCard/MovieCard';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import * as utils from '../../utils/utils';
import * as consts from '../../consts/consts';
import * as Axios from '../../services/api/api';

export default function MovieList({navigation, route}){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const headerTitle = `${utils.capitalizeFirstLetter(route.params.genre)} movies`
    const headerStyle = {
        title: headerTitle,
        headerStyle:{
            backgroundColor:'#000',
        },
        headerTintColor:consts.netflixColor,
        headerTitleStyle:{
            fontSize:18,
        },
    }

    const startFetchMovies = () =>{
        setLoading(true);
        let moviesFetch = Axios.getMovies(route.params.genre, undefined, 1)
        .then((moviesData)=>{
            setMovies(moviesData.movies);
            setLoading(false);
        })

    }

    const handleNavigationPress = (movie) =>{
        navigation.navigate('MovieDetails', {data:movie});
    }

    useEffect(()=>{
        navigation.setOptions(headerStyle);
        startFetchMovies();
    },[])

    return(
        <View style={styles.container}>
            {loading ? <LoadingScreen></LoadingScreen> :
            <FlatList style={{marginTop:25}} data={movies} numColumns={2} renderItem={({item}) => <MovieCard data={item} onPress={handleNavigationPress}></MovieCard>} keyExtractor={(item,index)=>item.imdb_code}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        flex: 1,
        justifyContent:'center'
    }
})
