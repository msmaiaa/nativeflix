import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image, ScrollView} from 'react-native';
import * as consts from '../../consts/consts';
import socket from '../../services/socket/socket';

export default function MovieDetails(props){
    const [isWatching, setWatching] = useState(null);
    const [processType, setProcessType] = useState(null);
    const [isActiveMovie, setActiveMovie] = useState(null);

    let movieData = props.route.params.data;
    let movieGenres = [];
    let movieOptions = movieData.torrents;

    //fix memory leak
    const isMounted = useRef(true)    

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
        if(index == movieData.genres.length - 1){
            movieGenres.push(g);
        }else{
            movieGenres.push(g + ' / ');
        }
    });


    useEffect(()=>{
        props.navigation.setOptions(headerStyle);
        socket.emit('app_getStatus');
        return () => { isMounted.current = false };
    }, [])

    socket.on('setWatching',(data)=>{
        if(isMounted.current){
            if(data.condition){
                setWatching(true)
                setActiveMovie(data.activeCode);
            }else{
                setProcessType(null);
                setWatching(false);
                setActiveMovie(false);
            }
        }
    })

    socket.on('processType', (data)=>{
        if(isMounted.current){
            setProcessType(data);
        }
    })

    const pauseScreen = () =>{
        socket.emit('app_pauseScreen');
    }

    const changeScreen = () =>{
        socket.emit('app_changeScreen');
    }

    const closeProcess = () =>{
        socket.emit('app_closeProcess', processType);
    }

    const handleOptionClick = (data)=>{
        let newData = {...data, title:movieData.title, imdb_code: movieData.imdb_code};
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
                    <View style={{width: 200, alignItems:'center'}}>
                        <Text numberOfLines={1} style={{color:"#E50914", fontSize:10, textAlign:'center'}}>{movieGenres.join("")}</Text>
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
                    {isWatching && processType && isActiveMovie == movieData.imdb_code ?
                    <View style={styles.movieActions}>
                        <TouchableOpacity style={{backgroundColor:'#E50914', padding:5, marginRight:5}} onPress={changeScreen}>
                            <Text style={{fontSize:12, color:"#fff", }}>Set screen size</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'#E50914', padding:5, marginRight:5}} onPress={closeProcess}>
                            <Text style={{fontSize:12, color:"#fff"}}>Close Window</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'#E50914', padding:5,}} onPress={pauseScreen}>
                            <Text style={{fontSize:12, color:"#fff"}}>Pause/Play</Text>
                        </TouchableOpacity>
                    </View> : 
                
                    <View style={styles.movieOptions}>
                        <Text style={{color: '#fff', fontSize:15, marginBottom: 20}}>Movie Options</Text>
                        {movieOptions.map((value,index)=>{
                            return (
                            <View style={styles.qualityArea} key={index}>
                                <View style={styles.qualityText} >
                                    <Text style={{color:"#fff", fontSize:15}}>Quality: </Text>
                                    <Text style={{color:"#E50914", marginRight:10, fontSize:15}}>{value.quality}</Text>
                                    <Text style={{color:"#fff", fontSize:15}}>Seeds: </Text>
                                    <Text style={{color:"#E50914", fontSize:15}}>{value.seeds}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity style={{backgroundColor:'#E50914', padding:8, marginRight:10}} onPress={()=>handleOptionClick({value: value, type: 'download'})}>
                                        <Text style={{fontSize:12, color:"#fff"}}>Download</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{backgroundColor:'#E50914', padding:8}} onPress={()=>handleOptionClick({value: value, type: 'stream'})}>
                                        <Text style={{fontSize:12, color:"#fff"}}>Stream</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            );
                        })}
                    </View>}
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
        marginTop:20,
        marginBottom:10,
        alignItems:'center'
    },
    qualityArea:{
        marginBottom:20,
        alignItems:'center',
        width:300,
    },
    qualityText:{
        flexDirection:'row',
        marginBottom:10
    },
    movieActions:{
        justifyContent:'center',
        flexDirection:'row',
        marginTop:20,
        marginBottom:30
    }

})