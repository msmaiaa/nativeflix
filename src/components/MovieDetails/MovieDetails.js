import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as consts from '../../consts/consts';
import socket from '../../services/socket/socket';

export default function MovieDetails(props){
    const [isWatching, setWatching] = useState(null);
    const [processType, setProcessType] = useState(null);
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

    movieData.genres.forEach((g, index) => {
        if(!index == movieData.genres.length){
            movieGenres.push(g);
        }else{
            movieGenres.push(g + ' / ');
        }
    });

    useEffect(()=>{
        props.navigation.setOptions(headerStyle);
    },[])

    socket.on('setWatching',(data)=>{
        if(data){
            setWatching(true)
        }else{
            setProcessType(null);
            setWatching(false);
        }
    })

    socket.on('processType', (data)=>{
        console.log(data);
        setProcessType(data);
    })

    const changeScreen = () =>{
        socket.emit('app_changeScreen');
    }

    const closeProcess = () =>{
        socket.emit('app_closeProcess', processType);
    }

    const handleOptionClick = (data)=>{
        let newData = {...data, title:movieData.title};
        if(newData.type == 'stream'){
            socket.emit('app_startStream', newData);
        }else{
            socket.emit('app_startDownload', newData);
        }
    }


    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                                    <Text style={{color:"#fff", fontSize:10}}>Quality: </Text>
                                    <Text style={{color:"#E50914", marginRight:10, fontSize:10}}>{value.quality}</Text>
                                    <Text style={{color:"#fff", fontSize:10}}>Seeds: </Text>
                                    <Text style={{color:"#E50914", fontSize:10}}>{value.seeds}</Text>
                                </View>
                                <View style={styles.qualityButtons}>
                                    <TouchableOpacity style={{backgroundColor:'#E50914', padding:5, marginRight:10}} onPress={()=>handleOptionClick({value: value, type: 'download'})}>
                                        <Text style={{fontSize:10, color:"#fff"}}>Download</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{backgroundColor:'#E50914', padding:5}} onPress={()=>handleOptionClick({value: value, type: 'stream'})}>
                                        <Text style={{fontSize:10, color:"#fff"}}>Stream</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            );
                        })}
                    </View>
                    {isWatching && processType ?
                    <View style={styles.movieActions}>
                        <TouchableOpacity style={{backgroundColor:'#E50914', padding:5}} onPress={changeScreen}>
                            <Text style={{fontSize:12, color:"#fff"}}>Set Fullscreen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'#E50914', padding:5}} onPress={closeProcess}>
                            <Text style={{fontSize:12, color:"#fff"}}>Close Window</Text>
                        </TouchableOpacity>
                    </View> : <Text> </Text>}

                </View>
            </ScrollView>

        </View>
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
        width: 280
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
        width:300,
    },
    qualityText:{
        flexDirection:'row'
    },
    qualityButtons:{
        flexDirection:'row'
    },
    movieActions:{
        justifyContent:'center'
    }
    

})