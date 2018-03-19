import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {db} from '../firebase';
import {connect} from 'react-redux';

class Messenger extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
        this.messageRef = db.collection(`matches/${this.props.matchId}/messages`);
        this.unsubscribe;
    }
    
    componentDidMount() {
        this.listenForUpdates();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    listenForUpdates() {
        this.unsubscribe = this.messageRef.orderBy("order").onSnapshot((querySnapshot) => {
            // the snapshot first returns all messages
            // It then will listen to updates.
            let messages = [];
            querySnapshot.docChanges.forEach((change) => {
                
                const changeData = change.doc.data();
                messages.push({
                    _id: changeData.createdAt,
                    text: changeData.text,
                    createdAt: new Date(changeData.createdAt),
                    user: {
                        _id: changeData.uid,
                        name: changeData.name,
                        avatar: changeData.avatar
                    }
                });
                
            })
            this.setState((prevState) => ({
                messages: [...messages,...prevState.messages]
            }));
        })
    }

    onSend(messages = []) {
        messages.forEach(message => {
            const now = new Date().getTime();
            this.messageRef.add({
                _id: now,
                text: message.text,
                createdAt: now,
                uid: this.props.id,
                order: -1 * now,
                name: this.props.name,
                avatar: this.props.profilePic
            })
        })
    }
    
    render() {
        return (
        <View style={styles.messengerContainer}>
            <GiftedChat 
                messages={this.state.messages}
                onSend={(message) => this.onSend(message)}
                user={{_id:this.props.id}}
                showUserAvatar={false}
                onPressAvatar={(user) => this.props.navigation.navigate('UserProfile',{id:user._id})}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    messengerContainer: {
        flex: 1,
        alignItems: 'stretch',
        marginLeft: 0,
        marginRight: 0
    }
});

const mapStateToProps = (state,ownProps) => {
    return {
        matchId: ownProps.navigation.state.params.matchId,
        id: ownProps.navigation.state.params.id,
        name: state.profileReducer.name,
        profilePic: state.profileReducer.profilePic
   }
}
export default connect(mapStateToProps)(Messenger);