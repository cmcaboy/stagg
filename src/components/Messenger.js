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
        console.log('matchId in const: ',this.props.matchId);
        this.messageRef = db.collection(`matches/${this.props.matchId}/messages`);
    }
    
    componentWillMount() {
        console.log('comp will mount');
        console.log('matchId: ',this.props.matchId);
        db.collection(`matches/${this.props.matchId}/messages`).get()
        .then((messageData) => {
            console.log('comp will mount then');
            const messages = messageData.docs.map((doc) => {
                return doc.data()
            });
            console.log('messages : ', messages);
            this.setState({messages});
        })
        .catch((error) => console.log('error: ',error));
        console.log('end of willMount');
        this.listenForUpdates();
    }

    listenForUpdates() {
        const unsubscribe = this.messageRef.onSnapshot((querySnapshot) => {
            //querySnapshot.docChanges.forEach((doc) => console.log(doc.doc))
            console.log('docChanges: ',querySnapshot.data());
        })
    }

    onSend(message = []) {
        console.log('message: ',message);
        console.log('matchId: ',this.props.matchId);
        this.messageRef.add({message})
        .then(() => {
            this.setState((prevState) => ({
                messages: GiftedChat.append(prevState.messages,message)
            }));
        })
        .catch((error) => console.log('Could not update message: ',error))
    }
    
    render() {
        console.log('id: ',this.props.id);
        return (
        <View style={styles.messengerContainer}>
            <GiftedChat 
                messages={this.state.messages}
                onSend={(message) => this.onSend(message)}
                user={{_id:this.props.id}}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    messengerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state,ownProps) => {
    return {
        matchId: ownProps.navigation.state.params.matchId,
        id: ownProps.navigation.state.params.id
   }
}
export default connect(mapStateToProps)(Messenger);