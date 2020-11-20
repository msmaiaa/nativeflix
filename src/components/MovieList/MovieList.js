import React, {useEffect, useState} from 'react'
import {View, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { MovieCard } from '../MovieCard/MovieCard';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import * as utils from '../../utils/utils';
import * as consts from '../../consts/consts';
import * as Axios from '../../services/api/api';
import FooterButton from '../PagesFooter/PagesFooterButton/FooterButton';

export default function MovieList({navigation, route}){
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(true);
    const [activePage, setActivePage] = useState(0);

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
        let moviesFetch = Axios.getMovies(route.params.genre, undefined, activePage)
        .then((moviesData)=>{
            let moviesArray = [];
            for(let i = 1; i <= moviesData.totalPages; i++){
                moviesArray.push(i);
            }
            setTotalPages(moviesArray);
            setMovies(moviesData.movies);
            setLoading(false);
        })

    }

    const handleNavigationPress = (movie) =>{
        navigation.navigate('MovieDetails', {data:movie});
    }

    const changePage = (pageNumber) =>{
        setActivePage(pageNumber);
    }

    useEffect(()=>{
        navigation.setOptions(headerStyle);
        setActivePage(1);
    },[])

    useEffect(()=>{
        if(activePage != 0){
            startFetchMovies();
        }
    },[activePage])

    if(loading || !totalPages){
        return(
            <View style={styles.container}>
                <LoadingScreen></LoadingScreen>
            </View>
        )
    }else{
        return(
            <View style={styles.container}>
                <FlatList style={{marginTop:25}} data={movies} numColumns={2} renderItem={({item}) => <MovieCard data={item} onPress={handleNavigationPress}></MovieCard>} keyExtractor={(item,index)=>item.imdb_code}/>
                <FlatList style={{marginTop:10}} data={totalPages} horizontal={true} keyExtractor={index=>index.toString()} renderItem={({item})=> <FooterButton data={item} activePage={activePage} onPress={changePage}></FooterButton>}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        flex: 1,
        justifyContent:'center'
    }
})
