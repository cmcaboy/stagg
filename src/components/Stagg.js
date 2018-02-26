import React,{Component} from 'react';
import {
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Platform, 
    Image,
    Dimensions,
    ScrollView,
    Animated,
    PanResponder,
    LayoutAnimation,
    UIManager
} from 'react-native';
import {connect} from 'react-redux';
import {startLike,startDislike,startMatch,startRequeue} from '../actions/matchList';
import {Card} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = (0.25 * SCREEN_WIDTH);
const SWIPE_OUT_DURATION = 250;

class Stagg extends Component {
    /*static defaultProps = {
        onSwipeRight: (id) => {this.props.startLike(id)},
        onSwipeLeft:  (id) => {this.props.startDislike(id)}
    }*/
    constructor(props) {
        super(props);
        this.state = {index:0}

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event,gesture) => {
                position.setValue({x:gesture.dx,y:gesture.dy})
            },
            onPanResponderRelease: (event,gesture) => {
                if(gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        })

        this.position = position;
        this.state = {panResponder, position,index:0}
    }

    componentWillReceiveProps(nextProps) {
        // If we receive a new list, we should reset the index back to 0.
        if(nextProps.prospectiveList !== this.props.prospectiveList) {
            this.setState({index:0});
        }
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // The next time the component changes, add a spring affect to it.
        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        // same as spring, but the animation plays out slightly differently. Timing is more linear while
        // spring is more bouncy.
        Animated.timing(this.state.position, {
            toValue: { x:direction==='right'?SCREEN_WIDTH+100:-SCREEN_WIDTH-100, y:0},
            duration: SWIPE_OUT_DURATION
            // the start function can accept a callback.
        }).start(() => this.onSwipeComplete(direction));
    }
    onSwipeComplete(direction) {
        // data is the array the comes in through props. It is the list of cards
        const {onSwipeLeft,onSwipeRight,prospectiveList} = this.props;
        const item = prospectiveList[this.state.index]

        direction === 'right' ? this.onSwipeRight(item.id) : this.onSwipeLeft(item.id);
        // Reset the card's position to be in default onscreen position
        this.state.position.setValue({x:0,y:0});
        // Increment the state by one
        this.setState({ index: this.state.index + 1 });
    } 
    onSwipeRight = (id) => this.props.startLike(id);
    onSwipeLeft  = (id) => this.props.startDislike(id);
    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: {x:0, y:0}
        }).start();
    }
    getCardStyle() {
        const {position} = this.state;
        // position contains references to x and y position at any given time
        // interpolate allows us to translate one scale to another.
        const rotate = position.x.interpolate({
            // inputRange - the horizontal distance that the card has been dragged left or right.
            // It is not good to hard code these values as the device size can be different.
            // Instead, we should tie the deminsions to the width of the screen.
            // We can also decrease the rotation by increasing the scale of inputRange or decreasing
            // the outputRange
            inputRange: [-SCREEN_WIDTH,0,SCREEN_WIDTH],
            outputRange: ['-60deg','0deg','60deg']
        });
        return {
            ...this.state.position.getLayout(),
            transform: [{rotate}]
        }
    }

    renderCard(prospect) {
        return (
            <Card
                key={prospect.id}
                image={{uri:prospect.profilePic}}
                imageStyle={{height:(SCREEN_HEIGHT*.75)}}
            >
                <Text key={prospect.id}>{prospect.name}</Text>
            </Card>
        )
    }

    render() {
        return (
        <Animated.View>
            {this.props.prospectiveList.map((prospect,i) => {
                if(i < this.state.index) { return null }
                else if (i === this.state.index) {
                    return (
                        <Animated.View 
                            key={prospect.id} 
                            style={[this.getCardStyle(),styles.cardStyle]}
                            {...this.state.panResponder.panHandlers}
                        >
                            {this.renderCard(prospect)}
                        </Animated.View>
                    )
                } else {
                    return (
                        <Animated.View
                            key={prospect.id}
                            style={[styles.cardStyle]}
                        >
                            {this.renderCard(prospect)}
                        </Animated.View>
                    )
                }
            }).reverse()}
        </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    staggContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    cardStyle: {
        width: SCREEN_WIDTH,
        // absolute position does not seem to work as a child of ScrollView
        position: 'absolute',
        elevation:4

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
