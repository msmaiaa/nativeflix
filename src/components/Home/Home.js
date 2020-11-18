import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import GenreButton from '../GenreButton/GenreButton';
import * as consts from '../../consts/consts';

// const genres = consts.genres.map((item,index)=>{
//     return <GenreButton data={item} key={index} onPress={()=>handlePress(genre)}></GenreButton>
// })

export default function Home({navigation, route}){
    handlePress = (genre) =>{
        console.log(genre);
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{color:'#61DAFB', fontSize:40, fontStyle:'italic'}}>native</Text><Text style={{color:consts.netflixColor, fontSize:40, fontStyle:'italic'}}>flix</Text>
            </View>
            <Text style={{fontSize:20, color:consts.netflixColor, textAlign:'center', marginBottom:25}}>Select a movie genre</Text>
                <View style={styles.genres}>
                    <FlatList data={consts.genres} keyExtractor={index=>index} renderItem={GenreButton}/>
                    {/* {genres} */}
                </View>
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