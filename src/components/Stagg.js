import React,{Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {connect} from 'react-redux';
import {startLike,startDislike,startMatch,startRequeue} from '../actions/matchList';


class Stagg extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
        <View style={styles.staggContainer}>
            {this.props.prospectiveList.map((prospect) => <Text key={prospect.id}>{prospect.name}</Text>)}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    staggContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        startLike: (id) => dispatch(startLike(id)),
        startDislike: (id) => dispatch(startDislike(id)),
        startMatch: (id) => dispatch(startMatch(id)),
        startRequeue: (id) => dispatch(startRequeue(id))
    }
}

const mapStateToProps = (state,ownProps) => {
    console.log('state at stagg -- ',state);
    return {
        prospectiveList: state.matchListReducer.queue,
        likeList: state.matchListReducer.likeList,
        dislikeList: state.matchListReducer.dislikeList,
        matchList: state.matchListReducer.matches
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Stagg);
