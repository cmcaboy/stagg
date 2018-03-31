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
import {Ionicons} from '@expo/vector-icons';

class Matches extends Component {
    constructor(props) {
        super(props);
    }
    noMatches = () => {
        return (
            <View style={styles.noMatches}>
                <Ionicons 
                    name="md-sad"
                    size={100}
                    color="black"
                />
                <Text>You do not have any matches.</Text>
                <Text>Better get to swipping!</Text>
            </View>
        )
    }
    render() {
        const {matches,navigation} = this.props;

        if (matches.length === 0) {
            return this.noMatches();
        } else {
            return (
                <View style={styles.matchContainer}>
                    <View style={styles.newMatchesContainer}>
                        <Text>New Matches</Text>
                        <ScrollView
                            horizontal={true}
                        >
                        {matches.filter(match => !match.lastMessage).map((match) => {
                            return (
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('Messenger',{
                                        matchId:match.matchId,
                                        id:this.props.id,
                                        otherId: match.id,
                                        name:match.name,
                                        pic:match.profilePic
                                    })}
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
                            {matches.filter(match => !!match.lastMessage).map((match) => (
                            <MatchListItem 
                                key={match.id}
                                name={match.name} 
                                picture={match.profilePic}
                                lastMessage={match.lastMessage}
                                onPress={() => navigation.navigate('Messenger',{
                                    matchId:match.matchId,
                                    id:this.props.id,
                                    otherId: match.id,
                                    name:match.name,
                                    pic:match.profilePic
                                })}
                            />
                        ))}
                        </ScrollView>
                    </View>
                </View>
            )
    }
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
        paddingLeft: 10,
        paddingTop:5,
        backgroundColor: '#FFFFFF'

    },
    newMatchesContainer: {
        flex: 1
    },
    messagesContainer: {
        flex: 3
    },
    newMatch: {
        margin: 5,
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection:'column'
    },
    noMatches: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state,ownProps) => {
    //console.log('state at matches -- ',state);
    //console.log('state matchList: ',state.matchListReducer);
    return {
        matches: state.matchListReducer.matches,
        id: state.authReducer.uid
    }
}

export default connect(mapStateToProps)(Matches);