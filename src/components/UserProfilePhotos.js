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
import {FontAwesome} from '@expo/vector-icons';
import {PHOTO_ADD_URL} from '../variables';

// Add custom styling
// Add child props that get passed into background image

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class UserProfilePhotos extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      loaded: false,
      currentImage: 0,
      pics: this.props.pics.filter(pic => pic !== PHOTO_ADD_URL)
    }
  }

  clickLeftSide = () => {
    if(this.state.currentImage > 0) {
      this.setState(prevState => ({currentImage:prevState.currentImage - 1}))
    }
  }
  
  clickRightSide = () => {
    if(this.state.currentImage < this.state.pics.length - 1) {
      this.setState(prevState => ({currentImage:prevState.currentImage + 1}))
    }
  }

  componentWillMount = () => {
    this.state.pics.map(async (pic,i) => {
      await CacheManager.cache(pic, newURI => {
        this.setState((prevState) => ({
          pics: prevState.pics.map((picP,iP) => (i===iP) ? newURI : picP) 
        }))
      })
    });
  }

  componentWillUnmount = async () => {
    await CacheManager.clearCache();
  }

  render() {
    const {userPics,userPhoto,touchablePics,leftClicker,rightClicker,picIndicator} = styles;

    return (        
        <View style={userPics}>
          {this.state.pics.map((pic,i) => (    
              <ImageBackground 
                key={pic} 
                source={{uri:pic}} 
                style={[userPhoto,{display:i === this.state.currentImage? 'flex':'none'}]}
              >
                <View style={picIndicator}>
                  {this.state.pics.map((_,i) => {
                    return i === this.state.currentImage ? (
                      <FontAwesome key={i} name="circle" size={12} color="white" style={{backgroundColor:'transparent',paddingHorizontal:2}}/>
                    ) : (
                      <FontAwesome key={i} name="circle-o" size={12} color="white" style={{backgroundColor:'transparent',paddingHorizontal:2}}/>
                    )
                  })}
                </View>
                <View style={touchablePics}>
                  <TouchableWithoutFeedback onPress={this.clickLeftSide}>
                    <View style={leftClicker}></View>
                  </TouchableWithoutFeedback>          
                  <TouchableWithoutFeedback onPress={this.clickRightSide}>
                    <View style={rightClicker} ></View>
                  </TouchableWithoutFeedback>          
                </View>
              </ImageBackground>
            ))}  
        </View>
    )
  }

}

const styles = StyleSheet.create({
  userPics: {
    flex:4
  },
  userPhoto: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center'
    
  },
  leftClicker:{
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH * .9,
    
  },
  rightClicker: {
    width: SCREEN_WIDTH / 2,
    height: SCREEN_WIDTH *.9,
    
  },
  touchablePics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  picIndicator: {
    paddingVertical: 3,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default UserProfilePhotos;