import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import * as consts from '../../consts/consts';

export default function GenreButton(props){
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let name = capitalizeFirstLetter(props.data);

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn}>
                <Text style={{textAlign:'center', color:'#fff'}}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        marginBottom:'1%',
        width:'100%',
        flexDirection:'row'
    },
    btn:{
        backgroundColor: '#000',
        width: '100%',
        justifyContent:'center',
        height:35,
        paddingTop:5,
        paddingBottom:5
    }
})