import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import * as utils from '../../utils/utils';

export default function GenreButton(props){

    let name = utils.capitalizeFirstLetter(props.item);

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={()=>props.onPress(props.item)}>
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