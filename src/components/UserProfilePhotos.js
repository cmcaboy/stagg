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
    const {picHeight = SCREEN_WIDTH,picWidth = SCREEN_WIDTH,customPicStyle,borderRadius} = this.props;

    return (        
        <View style={userPics}>
        
          {this.state.pics.map((pic,i) => (
              <ImageBackground 
                key={i} 
                source={{uri:pic}} 
                style={[
                  userPhoto,
                  {display:i === this.state.currentImage? 'flex':'none'},
                  {height:picHeight},
                  {width:picWidth},
                  customPicStyle,
                  {borderRadius:borderRadius}
                ]}
                imageStyle={{borderRadius: borderRadius}}
              >
                
                <View style={picIndicator}>
                  {this.state.pics.map((_,i2) => {
                    return i2 === this.state.currentImage ? (
                      <FontAwesome key={i2} name="circle" size={12} color="white" style={{backgroundColor:'transparent',paddingHorizontal:2}}/>
                    ) : (
                      <FontAwesome key={i2} name="circle-o" size={12} color="white" style={{backgroundColor:'transparent',paddingHorizontal:2}}/>
                    )
                  })}
                </View>
                
                <View style={touchablePics}>
                  <TouchableWithoutFeedback onPress={this.clickLeftSide}>
                    <View style={[leftClicker,{height:picHeight}]}></View>
                  </TouchableWithoutFeedback>          
                  <TouchableWithoutFeedback onPress={this.clickRightSide}>
                    <View style={[rightClicker,{height:picHeight}]} ></View>
                  </TouchableWithoutFeedback>          
                </View>
                </ImageBackground>
              ))}
              {this.props.children}
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