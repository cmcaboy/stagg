import React,{Component} from 'react';
import {
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Platform, 
    ScrollView 
} from 'react-native';
import {connect} from 'react-redux';
import {CirclePicture} from './common';
import MatchListItem from './MatchListItem';

class Matches extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.matchContainer}>
                <View style={styles.newMatchesContainer}>
                    <Text>New Matches</Text>
                    <ScrollView
                        horizontal={true}
                    >
                    {this.props.matches.map((match) => {
                        return (
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('Messenger',{matchId:match.matchId,id:this.props.id})}
                                key={match.id}
                            >
                                <View style={styles.newMatch}>
                                    <CirclePicture imageURL={match.profilePic} picSize="small"/>
                                    <Text>{match.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                    </ScrollView>
                </View>
                <View style={styles.messagesContainer}>
                    <Text>Messages</Text>
                    <ScrollView>
                        {this.props.matches.map((match) => (
                        <MatchListItem 
                            key={match.id}
                            name={match.name} 
                            picture={match.profilePic}
                            lastMessage={match.lastMessage}
                            onPress={() => this.props.navigation.navigate('Messenger',{matchId:match.matchId,id:this.props.id})}
                        />
                    ))}
                    </ScrollView>
                </View>
            </View>
        )
    }
}
/*
const Matches = (props) => {
    return (
        <View style={styles.matchContainer}>
            <Text>
                Stagg Page
            </Text>
        </View>
    )
}
*/
const styles = StyleSheet.create({
    matchContainer: {
        flex: 1,
        marginLeft: 10,
        marginTop:5

    },
    newMatchesContainer: {
        flex: 1
    },
    messagesContainer: {
        flex: 4
    },
    newMatch: {
        margin: 5,
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection:'column'
    }
});

const mapStateToProps = (state,ownProps) => {
    console.log('state at matches -- ',state);
    return {
        matches: state.matchListReducer.matches,
        id: state.authReducer.uid
    }
}

export default connect(mapStateToProps)(Matches);