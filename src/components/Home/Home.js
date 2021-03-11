import React, {useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {View, Text, StyleSheet} from 'react-native';
import GenreButton from '../GenreButton/GenreButton';
import CarouselItem from '../CarouselItem/CarouselItem';
import * as consts from '../../consts/consts';

export default function Home({navigation, route}){
    const [carouselItems] = useState([
        {'name': 'Movies'},
        {'name': 'Shows'},
        {'name': 'Animes'},
    ])
    handlePress = (genre) =>{
        navigation.navigate('MediaList', {genre: genre});
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{color:'#61DAFB', fontSize:40, fontStyle:'italic'}}>native</Text><Text style={{color:consts.netflixColor, fontSize:40, fontStyle:'italic'}}>flix</Text>
            </View>
            <Carousel 
            layout={"default"}
            sliderWidth={300}
            itemWidth={200}
            data={carouselItems}
            renderItem={CarouselItem}
            />
            {/* <Text style={{fontSize:20, color:consts.netflixColor, textAlign:'center', marginBottom:25}}>Select a movie genre</Text>
            <View style={styles.genres}>
                <FlatList data={consts.genres} keyExtractor={index=>index} renderItem={({item})=><GenreButton onPress={handlePress} item={item}></GenreButton>}/>
            </View> */}
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
        marginBottom: 60
    },
    genres:{
        flex: 1,
        alignItems:'center',
    }
})