import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export const MediaCard = (props)=>{
    let urlImage = props.data.image;
    let title = props.data.title;
    function handlePress(){
      props.onPress(props.data);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.5} style={{backgroundColor:'#E50914'}} onPress={handlePress}>
              <Image style={styles.image} source={{uri: urlImage}}/>
            </TouchableOpacity>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    marginBottom: 20
  },
  image:{
     width: 140,
     height: 210,
  },
  text:{
    color:"#fff",
    textAlign:'center',
    fontSize: 12
  },
});
