import React from 'react';
import { View,Image,StyleSheet, Dimensions } from 'react-native';
import {PLACEHOLDER_PHOTO} from '../../variables';


// picSize can be 'large', 'small', or 'mini'
const CirclePicture = ({imageURL = PLACEHOLDER_PHOTO,picSize = 'large', auto = false}) => {
    // pic
    let HEIGHT = 0;
    let BORDER_RADIUS = 0;
    console.log('Width: ',Dimensions.get('window').width);
    console.log('Height: ',Dimensions.get('window').height);
    if (picSize == 'large') {
        if (auto) {
            HEIGHT = Dimensions.get('window').width * 0.625;
            BORDER_RADIUS = HEIGHT/2;
        } else {
            HEIGHT = 200;
            BORDER_RADIUS = 100;
        }
    } else if (picSize == 'small') {
        HEIGHT = 70;
        BORDER_RADIUS = 35;
    } else if (picSize == 'xlarge') {
        HEIGHT = 300;
        BORDER_RADIUS=150;
    } else { // mini
        HEIGHT = 34;
        BORDER_RADIUS = 17;
    } 
    return (
        <Image 
          source={{uri:imageURL}} 
          style={[styles.pictureStyle,
            {
              height:       HEIGHT,
              width:        HEIGHT,
              borderRadius: BORDER_RADIUS
            }
          ]}
        />
    )
};

const styles = StyleSheet.create({
    pictureStyle: {
        //borderColor: 'black',
        //borderWidth: 2
    }
});

export {CirclePicture};