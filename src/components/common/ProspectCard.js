import React from 'react';
import { View } from 'react-native';

const ProspectCard = (props) => {
    return (
        <View style={[styles.containerStyle,props.style]}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: 'white',
        flex: 1,
        borderColor: '#ddd',
        boxShadow: 5
    }
};

export {ProspectCard};