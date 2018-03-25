import React, {Component} from 'react';
import {View, Text, StyleSheet, Image } from 'react-native';
import {db} from '../firebase';
import {connect} from 'react-redux';
import getUserProfile from '../selectors/getUserProfile';

class UserProfile extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      loaded: false
    }
  }

  render() {
    console.log('user: ',this.props.user); 
    return (
      <View style={styles.userProfileContainer}>
        <Image 
          source={{uri:this.props.user.profilePic}}
          style={styles.userPicture}
        />
        <View style={styles.userInfo}>
          <Text>{this.props.user.name}</Text>
          {!!this.props.user.school && <Text>{this.props.user.school}</Text>}
          {!!this.props.user.work && <Text>{this.props.user.work}</Text>}  
          </View>
        <View style={styles.userDescription}>
          {!!this.props.user.description && <Text>{this.props.user.description}</Text>}
        </View>
        
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
  userPicture: {
    flex:4
  },
  userInfo: {
    flex:1,
    paddingLeft: 10,
    marginTop: 10,
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1.5
  },
  userDescription: {
    flex: 1,
    paddingLeft: 10

  }
})

const mapStateToProps = (state, ownProps) => {
  //console.log('id: ',ownProps.navigation.state.params.id);
  return {
    // Returns matches profile
    user: getUserProfile(ownProps.navigation.state.params.id,state.matchListReducer.matches)
  }
}

export default connect(mapStateToProps)(UserProfile);