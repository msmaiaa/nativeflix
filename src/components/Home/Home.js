import React, {useState, useEffect} from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Text, StyleSheet} from 'react-native';
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
        let typeGenres = consts.allGenres[i]
        setActiveMediaType({name: typeGenres.name, genres: typeGenres.genres})
    },[mediaTypeIndex])

    handlePress = (genre) =>{
        navigation.navigate('MediaList', {type: activeMediaType.name, genre: genre});
    }

    return(
        <View style={styles.container}>
            <ScrollView>
				<View style={styles.header}>
					<Text style={{color:'#61DAFB', fontSize:22, fontStyle:'italic'}}>native</Text><Text style={{color:consts.netflixColor, fontSize:22, fontStyle:'italic'}}>flix</Text>
				</View>
                <View style={{width:'100%', display:'flex', alignItems:'center', marginBottom:5}}>
                    <Carousel 
                    layout={"default"}
                    sliderWidth={300}
                    itemWidth={250}
                    data={carouselItems}
                    renderItem={CarouselItem}
                    containerCustomStyle={{flexGrow:0}}
                    onSnapToItem={(index)=>{setMediaTypeIndex(index)}}
                    useScrollView={true}
                    />
                </View>
                <Text style={{fontSize:20, color:consts.netflixColor, textAlign:'center', marginBottom:15, marginTop: 25}}>Select a {activeMediaType.name} genre</Text>
                <View style={styles.genres}>
                    {activeMediaType.genres.map((value, index)=>{
                        return(
                            <GenreButton key={index} onPress={handlePress} item={value}></GenreButton>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:consts.backgroundColor,
        flex: 1,
        alignItems:'center',
    },
    header:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginBottom: 20,
		marginTop: 20
    },
    genres:{
        flex: 1,
        alignItems:'center',
    }
})