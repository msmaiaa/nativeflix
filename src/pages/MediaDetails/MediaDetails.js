import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import socket from '../../services/socket/socket';

export default function MediaDetails(props){
    const [isWatching, setWatching] = useState(null);
    const [activeMovie, setActiveMovie] = useState(null);
    const [isLoading, setLoading] = useState(true);

    let mediaData = props.route.params.data;
    let mediaGenres = [];
    let mediaOptions = mediaData.torrents;

    //fix memory leak
    const isMounted = useRef(true)    

    useEffect(()=>{
        socket.emit('app_getStatus');
        mediaData.genres.forEach((g, index) => {
            if(index == mediaData.genres.length - 1){
                mediaGenres.push(g);
            }else{
                mediaGenres.push(g + ' / ');
            }
        });
        setLoading(false)
        return () => { isMounted.current = false };
    }, [])

    socket.on('setWatching',(data)=>{
        if(isMounted.current){
            if(data.condition){
                setWatching(true)
                setActiveMovie(data.activeCode);
            }else{
                setWatching(false);
                setActiveMovie(false);
            }
        }
    })

    const pauseScreen = () =>{
        socket.emit('app_pauseScreen');
    }

    const closeProcess = () =>{
        socket.emit('app_closeProcess');
    }

    //sends magnet and some identification stuff to the server
    const handleOptionClick = (data)=>{
        let newData = {...data, title:mediaData.title, imdb_code: mediaData.id};
        if(newData.type == 'stream'){
            socket.emit('app_startStream', newData);
        }else{
            socket.emit('app_startDownload', newData);
        }
    }


    if(isLoading){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#E50914"></ActivityIndicator>
            </View>
        )
    }else{
        return(
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.mainContent}>
                        <Text style={styles.title}>{mediaData.title}</Text>
                        <Image source={{uri: mediaData.largeImage}} style={styles.image}></Image>
                        <View style={{width: 200, alignItems:'center'}}>
                            <Text numberOfLines={1} style={{color:"#E50914", fontSize:10, textAlign:'center'}}>{mediaGenres.join("")}</Text>
                        </View>
    
                        <View style={styles.movieInfo}>
                            <Text style={{color:'#fff', fontSize:15, textAlign:'center'}}>Description:</Text>
                            <Text style={styles.movieDescText}>{mediaData.description}</Text>
                        </View>
                        <View style={styles.movieAbout}>
                            <Text style={{color:'#fff', marginRight:5}}>Year:</Text>
                            <Text style={{color:'#E50914', marginRight:20}}>{mediaData.year}</Text>
                        </View>
                        {isWatching && activeMovie == mediaData.id?
                        <View style={styles.movieActions}>
                            <TouchableOpacity style={{backgroundColor:'#E50914', padding:5, marginRight:5}} onPress={closeProcess}>
                                <Text style={{fontSize:12, color:"#fff"}}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:'#E50914', padding:5,}} onPress={pauseScreen}>
                                <Text style={{fontSize:12, color:"#fff"}}>Pause/Play</Text>
                            </TouchableOpacity>
                        </View> : 
                    
                        <View style={styles.mediaOptions}>
                            <Text style={{color: '#fff', fontSize:15, marginBottom: 20}}>Movie Options</Text>
                            {mediaOptions.map((value,index)=>{
                                return (
                                <View style={styles.qualityArea} key={index}>
                                    <View style={styles.qualityText} >
                                        <Text style={{color:"#fff", fontSize:15}}>Quality: </Text>
                                        <Text style={{color:"#E50914", marginRight:10, fontSize:15}}>{value.quality}</Text>
                                        <Text style={{color:"#fff", fontSize:15}}>Seeds: </Text>
                                        <Text style={{color:"#E50914", fontSize:15}}>{value.seeds}</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <TouchableOpacity style={{backgroundColor:'#E50914', padding:8}} onPress={()=>handleOptionClick({value: value, type: 'stream'})}>
                                            <Text style={{fontSize:12, color:"#fff"}}>Watch</Text>
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
    mediaOptions:{
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