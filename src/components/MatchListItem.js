import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {CirclePicture} from './common';

const MatchListItem = ({name,picture,onPress,lastMessage = "test"}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.itemContainer}>
          <CirclePicture imageURL={picture} picSize="small"/>
          <View style={styles.textContainer}>
            <Text>
              {name}
            </Text>
            <Text style={styles.lastMessage}>{lastMessage}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5
        //alignItems: 'stretch'
    },
    textContainer: {
      display:'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginLeft: 5
    },
    lastMessage: {
      opacity: 0.7,
      fontSize: 10
    }
});


export default MatchListItem;