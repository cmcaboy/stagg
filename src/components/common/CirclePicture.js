import React from 'react';
import { View,Image,StyleSheet } from 'react-native';


// picSize can be 'large', 'small', or 'mini'
const CirclePicture = ({imageURL = 'https://placebear.com/300/200',picSize = 'large'}) => {
    // pic
    let HEIGHT = 0;
    let BORDER_RADIUS = 0;
    if (picSize == 'large') {
        HEIGHT = 200;
        BORDER_RADIUS = 100;
    } else if (picSize == 'small') {
        HEIGHT = 70;
        BORDER_RADIUS = 35;
    } else {
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