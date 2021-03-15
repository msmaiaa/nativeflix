import React, {useState, useEffect} from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler'
import GenreButton from '../GenreButton/GenreButton';
import CarouselItem from '../CarouselItem/CarouselItem';
import * as consts from '../../consts/consts';

export default function Home({navigation, route}){
    const [carouselItems] = useState([
        {'name': 'Movies'},
        {'name': 'Shows'},
        // {'name': 'Animes'},
    ])
    const [mediaTypeIndex, setMediaTypeIndex] = useState(0);
    const [activeMediaType, setActiveMediaType] = useState({name: 'Movie', genres: consts.movieGenres});

    useEffect(()=>{
        let i = mediaTypeIndex;
        if(i == 0){
            setActiveMediaType({name: 'Movie', genres: consts.movieGenres})
        }else if(i == 1){
            setActiveMediaType({name: 'Show', genres: consts.showGenres})
        }else if(i == 2){
            setActiveMediaType({name: 'Anime', genres: consts.animeGenres})
        }
    },[mediaTypeIndex])

    handlePress = (genre) =>{
        navigation.navigate('MediaList', {type: activeMediaType.name, genre: genre});
    }
    return(
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={{color:'#61DAFB', fontSize:40, fontStyle:'italic'}}>native</Text><Text style={{color:consts.netflixColor, fontSize:40, fontStyle:'italic'}}>flix</Text>
            </View>
            <View style={{width:'100%', display:'flex', alignItems:'center', marginBottom:5}}>
                <Carousel 
                layout={"default"}
                sliderWidth={300}
                itemWidth={200}
                data={carouselItems}
                renderItem={CarouselItem}
                containerCustomStyle={{flexGrow:0}}
                onSnapToItem={(index)=>{setMediaTypeIndex(index)}}
                useScrollView={true}
                />
            </View>
            <ScrollView>
            <Text style={{fontSize:20, color:consts.netflixColor, textAlign:'center', marginBottom:15, marginTop: 25}}>Select a {activeMediaType.name} genre</Text>
            <View style={styles.genres}>
                {activeMediaType.genres.map((value, index)=>{
                    return(
                        <GenreButton key={index} onPress={handlePress} onPress={handlePress} item={value}></GenreButton>
                    )
                })}
                {/* <FlatList data={activeMediaType.genres} keyExtractor={index=>index} renderItem={({item})=><GenreButton onPress={handlePress} item={item}></GenreButton>}/> */}
            </View>
                
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#000",
        flex: 1,
        alignItems:'center',
    },
    header:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height: '15%',
        marginBottom: 25
    },
    genres:{
        flex: 1,
        alignItems:'center',
    }
})