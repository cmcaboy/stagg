import React, {Component} from 'react';
import {
  View, 
  Text, 
  StyleSheet,
  Image, 
  ScrollView, 
  Dimensions, 
  ImageBackground,
  TouchableWithoutFeedback } from 'react-native';
import {CacheManager} from 'react-native-expo-image-cache';
import {connect} from 'react-redux';
import getUserProfile from '../selectors/getUserProfile';
import {Ionicons,MaterialIcons,FontAwesome} from '@expo/vector-icons';
import UserProfilePhotos from './UserProfilePhotos';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class UserProfile extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      loaded: false,
    }

    //this.pics = [this.props.user.profilePic, ...this.props.user.ancillaryPics];
  }

  render() {
    console.log('props: ',this.props); 
    const {name, school, work, description,profilePic,ancillaryPics} = this.props.user
    const {userProfileContainer,userPics,userInfo,iconText,userPhoto,touchablePics,
      nameText,subHeading,schoolText,userDescription,leftClicker,rightClicker,
      picIndicator} = styles; 

    return (
      <View style={userProfileContainer}>
        <ScrollView>
        <UserProfilePhotos 
          pics={[profilePic, ...ancillaryPics]}
        />
        <View style={userInfo}>
          <Text style={nameText}>{name}</Text>
          {!!school && (
            <View style={subHeading}>
              <Ionicons name="md-school" size={14} color="black" style={iconText}/>
              <Text style={schoolText}>{school}</Text>
            </View>
          )}
          {!!work && (
            <View style={subHeading}>
              <MaterialIcons name="work" size={14} color="black" style={iconText}/>
              <Text style={[schoolText,{paddingLeft:4}]}>{work}</Text>
            </View>
          )}  
          </View>
        <View style={userDescription}>
          {!!description && <Text>{description}</Text>}
        </View>
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  userProfileContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  userPics: {
    flex:4
  },
  userInfo: {
    flex:1,
    paddingLeft: 10,
    marginTop: 10,
    
  },
  schoolText: {
    fontSize: 14,
    opacity: 0.7,
    paddingLeft: 5
  },
  iconText: {
    fontSize: 14,
    opacity: 0.7,
  },

  nameText: {
    fontSize: 30
  },
  userDescription: {
    flex: 1,
    paddingLeft: 10
  },
  subHeading: {
    flexDirection: 'row'
  },
})

const mapStateToProps = (state, ownProps) => {
  //console.log('id: ',ownProps.navigation.state.params.id);
  console.log('matchListReducer: ',state.matchListReducer)
  return {
    // Returns matches profile
    user: getUserProfile(ownProps.navigation.state.params.id,state.matchListReducer.matches)
  }
}

export default connect(mapStateToProps)(UserProfile);