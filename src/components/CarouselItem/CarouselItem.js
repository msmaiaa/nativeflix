import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import * as consts from '../../consts/consts';

let imgs = {
    //Animes:require('../../pics/animes.jpg'),
    Shows:require('../../pics/shows.jpg'),
    Movies:require('../../pics/movies.jpg')
}

export default function CarouselItem({item, index}){
    let itemName = item.name;
	
    return(
        <View style={styles.container}>
			<Image style={styles.image} source={imgs[itemName]}/> 
            <Text style={styles.text}>{item.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    },
    text:{
		color:consts.netflixColor,
        textAlign:'center',
        width:'100%',
        fontSize: 16,
		backgroundColor:consts.netflixColor,
		borderBottomRightRadius:5,
		borderBottomLeftRadius:5
    },
    image:{
        width:'100%',
        height:200,
		borderTopLeftRadius: 5,
		borderTopRightRadius:5
    },
})