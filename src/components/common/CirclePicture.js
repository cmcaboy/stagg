import React from 'react';
import { View,Image,StyleSheet } from 'react-native';


// picSize can be 'large' or 'small'
const CirclePicture = ({imageURL = 'https://placebear.com/300/200',picSize = 'large'}) => {
    return (
        <Image 
          source={{uri:imageURL}} 
          style={[styles.pictureStyle,
            {
              height:       picSize == 'large'? 200:50,
              width:        picSize == 'large'? 200:50,
              borderRadius: picSize == 'large'? 100:25
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