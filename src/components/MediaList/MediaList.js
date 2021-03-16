import React, {useEffect, useState} from 'react'
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { MediaCard } from '../MediaCard/MediaCard';
import * as utils from '../../utils/utils';
import * as consts from '../../consts/consts';
import * as Axios from '../../services/api/api';
import FooterButton from '../PagesFooterButton/FooterButton';

export default function MediaList({navigation, route}){
    const [medias, setMedias] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activePage, setActivePage] = useState(null);
    const mediaType = route.params.type;

    const headerTitle = `${utils.capitalizeFirstLetter(route.params.genre)} ${mediaType.toLowerCase()}s`
    const headerStyle = {
        title: headerTitle,
        headerStyle:{
            backgroundColor:'#000',
        },
        headerTintColor:consts.netflixColor,
        headerTitleStyle:{
            fontSize:20,
        },
    }

    const startFetchMedia = () =>{
        setLoading(true);
        let mediaFetch = Axios.getMedia({genre:route.params.genre, activePage:activePage, mediaType:mediaType})
        .then((mediaData)=>{
            setTotalPages(mediaData.totalPages);
            setMedias(mediaData.medias);
            setLoading(false);
        })

    }

    const handleNavigationPress = (media) =>{
        navigation.navigate('MediaDetails', {data:media});
    }

    const changePage = (pageNumber) =>{
        setActivePage(pageNumber);
    }

    useEffect(()=>{
        navigation.setOptions(headerStyle);
        setActivePage(1)
    },[])

    useEffect(()=>{
        if(activePage != null){
            startFetchMedia();
        }
    },[activePage])

    if(loading || !totalPages || !medias){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#E50914"></ActivityIndicator>
            </View>
        )
    }else{
        return(
            <View style={styles.container}>
                <FlatList style={{marginTop:25}} data={medias} numColumns={2} renderItem={({item}) => <MediaCard data={item} onPress={handleNavigationPress}></MediaCard>} keyExtractor={(item,index)=>item.id}/>
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
