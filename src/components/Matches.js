import React,{Component} from 'react';
import {
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Platform, 
    ScrollView 
} from 'react-native';

class Matches extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <ScrollView
                    horizontal={true}
                >
                    {this.props.matches.map((match) => {
                        return (
                            <TouchableOpacity 
                                onPress={() => props.navigation.navigate('Messenger',{matchId:match.matchId,id:this.props.id})}
                            >
                                <CirclePicture imageURL={match.profilePic} picSize="small"/>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <ScrollView>
                    {this.props.matches.map((match) => {
                        <MatchListItem 
                            name={match.name} 
                            picture={match.profilePic}
                            onPress={() => props.navigation.navigate('Messenger',{matchId:match.matchId,id:this.props.id})}
                        />
                    })}
                </ScrollView>
            </View>
        )
    }
}
/*
const Matches = (props) => {
    return (
        <View style={styles.matchesContainer}>
            <Text>
                Stagg Page
            </Text>
        </View>
    )
}
*/
const styles = StyleSheet.create({
    matchesContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    }
});

const mapStateToProps(state,ownProps) {
    return {
        matches: state.matchListReducer.matches,
        id: state.authReducer.uid
    }
}

export default connect(mapStateToProps)(Matches);