import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {CirclePicture,Card} from './common';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';
import {MaterialCommunityIcons,Ionicons,MaterialIcons} from '@expo/vector-icons';

const Settings = (props) => {
    const {profilePic = 'https://placebear.com/300/200',name,work,school} = props;
    return (
        <View style={styles.settingsContainer}>
            
            <View style={styles.miniProfile}> 
                <CirclePicture size='large' imageURL={profilePic} />
                <View style={styles.profileText}>
                    <Text style={[styles.nameText,{textAlign:'center'}]}>{name}</Text>
                    {school? (
                        <View style={styles.subHeading}>
                            <Ionicons name="md-school" size={14} color="black" style={styles.schoolText}/>
                            <Text style={[styles.schoolText,{paddingLeft:4}]}>{school}</Text>
                        </View>
                    ) : (
                        <View style={styles.subHeading}>
                            <MaterialIcons name="work" size={14} color="black" style={styles.schoolText}/>
                            <Text style={[styles.schoolText,{paddingLeft:4}]}>{work}</Text>
                        </View>
                    )}
                        </View>
            </View>
            <View style={styles.options}>
                <TouchableOpacity 
                    onPress={() => props.navigation.navigate('EditSettings')}
                    style={styles.buttons}
                >
                    <Ionicons 
                        name="md-settings"
                        size={32}
                        color="black"
                    />
                    <Text style={styles.optionText}>
                        Settings
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => props.navigation.navigate('EditProfile')}
                    style={styles.buttons}
                >
                    <MaterialCommunityIcons 
                        name="account-edit"
                        size={32}
                        color="black"
                    />
                    <Text style={styles.optionText}>
                        Edit Info
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => props.startLogout()}
                    style={styles.buttons}
                >
                    <MaterialCommunityIcons 
                        name="logout"
                        size={32}
                        color="black"
                    />
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
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        margin:10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderBottomWidth: 0,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2,
        shadowOpacity: 0.5,
        borderRadius: 10
    },
    miniProfile: {
        flex: 2,
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
        fontSize: 14,
        opacity: 0.7
    },
    buttons: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    subHeading: {
        flexDirection: 'row',
        marginTop: 2
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
