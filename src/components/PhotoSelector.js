import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions, Image } from 'react-native';
import {Spinner,CardSection} from './common';

class PhotoSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.urlList.map(item => false),
      isSelected: this.props.urlList.map(item => false)
    }
  }

  resetSelected() {
    console.log('reset selected');
    this.setState({isSelected: this.props.urlList.map(item => false)})
  }

  async selectImage(index) {
    await this.setState((prevState) => ({isSelected: prevState.isSelected.map((k,i) => i === index?!k:k)}))
    console.log('select: ',this.state.isSelected);
    if(this.state.isSelected.filter(item => item === true).length === 2) {
      let a = [];
      this.state.isSelected.forEach((item,index) => {
        if(item === true) {
          a.push(index);
        }
      })
      await this.props.switchPicPosition(a[0],a[1]);
      this.resetSelected();
    }
  }

  render() {
    return (
        <View style={styles.container}>
          {this.props.urlList.map((item,index) => {
            return this.state.isLoading[index] ? (
              <Spinner key={index} size="small" style={styles.photo}/>
            ) : (
              <TouchableOpacity 
                key={index} 
                onPress={() => this.selectImage(index)}
                onLongPress={() => this.props.pickImage()}  
              >
                    <Image 
                      style={[styles.photo,this.state.isSelected[index] ? styles.highlighted : styles.notHightlighted]} 
                      source={{uri:item?item:'https://placebear.com/300/200'}}
                    />
              </TouchableOpacity>
            )
          })}
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        //height: 150
    },
    photo: {
      borderRadius: ((Dimensions.get('window').width / 3) - 5) * 0.1,
      margin: 2,
      width: (Dimensions.get('window').width / 3) - 10,
      height: (Dimensions.get('window').width / 3) - 10,
    },
    highlighted: {
      borderWidth: 3,
      borderColor: '#FFDF00'
    },
    notHighlighted: {
      borderWidth: 0
    }
});


export default PhotoSelector;