import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import * as consts from '../../consts/consts';
import { LinearGradient } from 'expo-linear-gradient';

let imgs = {
    Animes:require('../../pics/animes.jpg'),
    Shows:require('../../pics/shows.jpg'),
    Movies:require('../../pics/movies.jpg')
}

export default function CarouselItem({item, index}){
    let itemName = item.name;
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={imgs[itemName]}/> 
            <Text style={styles.text}>{item.name}</Text>
            <LinearGradient
                // Button Linear Gradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={styles.background}>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    },
    text:{
        color: consts.netflixColor,
        textAlign:'center',
        width:'100%',
        fontSize: 16,
        marginTop: 10
    },
    image:{
        width:'100%',
        height:180,
        borderRadius: 5
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 150,
        height: 30,
    },
})