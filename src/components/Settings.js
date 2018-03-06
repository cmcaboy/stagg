import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {CirclePicture} from './common';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

const Settings = (props) => {
    const {profilePic = 'https://placebear.com/300/200',name,work,school} = props;
    return (
        <View style={styles.settingsContainer}>
            <View style={styles.miniProfile}> 
                <CirclePicture size='large' imageURL={profilePic} />
                <View style={styles.profileText}>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.schoolText}>
                        {school? school:work}
                    </Text>
                </View>
            </View>
            <View style={styles.options}>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditSettings')}>
                <Text style={styles.optionText}>
                    Settings
                </Text></TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')}>
                <Text style={styles.optionText}>
                    Edit Info
                </Text></TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => props.startLogout()}>
                    <Text style={styles.optionText}>
                    Log out
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    miniProfile: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        minHeight: 100
    },
    profileText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
    },
    options: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200
    },
    optionText: {
        opacity: 0.7
    },
    nameText: {
        fontSize: 30
    },
    schoolText: {
        fontSize: 20
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        startLogout: () => dispatch(startLogout())
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        profilePic: state.profileReducer.profilePic,
        name: state.profileReducer.name,
        work: state.profileReducer.work,
        school: state.profileReducer.school
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings);
