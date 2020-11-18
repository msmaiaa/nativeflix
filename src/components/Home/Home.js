import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import GenreButton from '../GenreButton/GenreButton';
import * as consts from '../../consts/consts';

const genres = consts.genres.map((item,index)=>{
    return <GenreButton data={item} key={index}></GenreButton>
})

export default function Home({navigation, route}){
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{color:'#61DAFB', fontSize:40, fontStyle:'italic'}}>native</Text><Text style={{color:consts.netflixColor, fontSize:40, fontStyle:'italic'}}>flix</Text>
            </View>
            <Text style={{fontSize:20, color:consts.netflixColor, textAlign:'center', marginBottom:25}}>Select a movie genre</Text>
            <ScrollView style={{flex: 1}}>
                <View style={styles.genres}>
                    {genres}
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#000",
        flex: 1
    },
    header:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height: '15%'
    },
    genres:{
        flex: 1,
        alignItems:'center',
    }
})