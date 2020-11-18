import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as consts from '../../consts/consts';

export default function MovieDetails(props){
    let movieData = props.route.params.data;
    let movieGenres = [];
    let movieOptions = movieData.torrents;

    const headerStyle = {
        title: '',
        headerStyle:{
            backgroundColor:'#000',
        },
        headerTintColor:consts.netflixColor,
        headerTitleStyle:{
            fontSize:18,
        },
    }

    useEffect(()=>{
        props.navigation.setOptions(headerStyle);
    },[])

    movieData.genres.forEach((g, index) => {
        if(!index == movieData.genres.length){
            movieGenres.push(g);
        }else{
            movieGenres.push(g + ' / ');
        }
    });


    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.mainContent}>
                    <Text style={styles.title}>{movieData.title}</Text>
                    <Image source={{uri: movieData.largeImage}} style={styles.image}></Image>
                    <View style={{width: 200}}>
                        <Text numberOfLines={1} style={{color:"#E50914", fontSize:10}}>{movieGenres.join("")}</Text>
                    </View>

                    <View style={styles.movieInfo}>
                        <Text style={{color:'#fff', fontSize:15, textAlign:'center'}}>Description:</Text>
                        <Text style={styles.movieDescText}>{movieData.description}</Text>
                    </View>
                    <View style={styles.movieAbout}>
                        <Text style={{color:'#fff', marginRight:5,}}>Year:</Text>
                        <Text style={{color:'#E50914', marginRight:20}}>{movieData.year}</Text>

                        <Text style={{color:'#fff', marginRight:5}}>IMDB Rating:</Text>
                        <Text style={{color:'#E50914'}}>{movieData.rating}</Text>
                    </View>
                    <View style={styles.movieOptions}>
                        <Text style={{color: '#fff', fontSize:15, marginBottom: 20}}>Movie Options</Text>
                        {movieOptions.map((value,index)=>{
                            return (
                            <View style={styles.qualityArea} key={index}>
                                <View style={styles.qualityText} >
                                    <Text style={{color:"#fff"}}>Quality: </Text>
                                    <Text style={{color:"#E50914", marginRight:10}}>{value.quality}</Text>
                                    <Text style={{color:"#fff"}}>Seeds: </Text>
                                    <Text style={{color:"#E50914"}}>{value.seeds}</Text>
                                </View>
                                <View style={styles.qualityButtons}>
                                    <TouchableOpacity style={{backgroundColor:'#E50914', padding:5, marginRight:10}}>
                                        <Text style={{fontSize:12, color:"#fff"}}>Download</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{backgroundColor:'#E50914', padding:5}}>
                                        <Text style={{fontSize:12, color:"#fff"}}>Stream</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#000",
        justifyContent:'center',
        alignItems:'center',
        height: '100%',
    },
    header:{
        width: '100%',
        flexDirection: 'row',
        backgroundColor:'#fff',
        height: '5%',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#E50914'
    },
    headerBox:{
        flexDirection:'row',
        width: '72%',
        alignItems:'center',
        justifyContent:'space-between'
    },
    headerBtn:{
        marginLeft: 10,
    },
    headerText:{
        fontSize:18,
        fontWeight:'bold'
    },
    icon:{
        color: '#000',

    },
    mainContent:{
        flex: 1,
        height: '90%',
        paddingTop: 25,
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        textAlign: 'center',
        color: '#fff',
        fontSize:22,
        marginBottom:15
    },
    image:{
        height: 350,
        width: 200,
    },
    movieInfo:{
        marginTop: 20,
        width: 300
    },
    movieDescText:{
        marginTop:10,
        color: '#E50914',
        textAlign:'center'
    },
    movieAbout:{
        marginTop:10,
        flexDirection:'row'
    },
    movieOptions:{
        marginTop:20
    },
    movieOptions:{
        marginTop:20,
        marginBottom:10,
        alignItems:'center'
    },
    checkbox:{
        backgroundColor:'#E50914'
    },
    qualityArea:{
        marginBottom:10,
        flexDirection: 'row',
        justifyContent:'space-between',
        width:350,
    },
    qualityText:{
        flexDirection:'row'
    },
    qualityButtons:{
        flexDirection:'row'
    }
    

})