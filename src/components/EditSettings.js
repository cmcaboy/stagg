import React,{Component} from 'react';
import {Text,View,Slider,Switch,StyleSheet} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {connect} from 'react-redux';
import {
  startChangeNotification,
  startChangeAgePreference,
  startChangeDistance
} from '../actions/settings';


class EditSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageValues: this.props.agePreference,
      distance: this.props.distance,
      sendNotifications: this.props.sendNotifications
    }
  }
    
  notificationChange = () => {
    this.setState((prevState) => ({sendNotifications:!prevState.sendNotifications}))
    startChangeNotification(this.state.sendNotifications);
  }

  render() {
  return (
    <View style={styles.containerStyle}>
    
    <Text>Settings</Text>
    <Text>Age Preference</Text>
    <MultiSlider 
      style={{flex: 1,marginTop:20,marginBottom:20}}
      step={1}
      values={[this.state.ageValues[0],this.state.ageValues[1]]}
      max={65}
      min={18}
      onValuesChange={(ageValues) => this.setState({ageValues:ageValues})}
      onValuesChangeFinish={(ageValues) => this.props.startChangeAgePreference(ageValues)}
    />
    <Text>Min Age: {this.state.ageValues[0]}</Text>
    <Text>Max Age: {this.state.ageValues[1]}</Text>
    <Text>Search Distance</Text>
    <Slider 
      style={{}}
      step={1}
      value={this.state.distance}
      maximumValue={50}
      minimumValue={0}
      disabled={false}
      onValueChange={(distance) => this.setState({distance:distance})}
      onSlidingComplete={(distance) => this.props.startChangeDistance(distance)}
    />
    <Text>Distance: {this.state.distance}</Text>
    <Text>Send Notifications</Text>
       <Switch 
        onValueChange={() => this.setState((prevState) => ({sendNotifications:!prevState.sendNotifications}) )}
        value={this.state.sendNotifications}
       />
       <Text>Send Notifications: {this.state.sendNotifications?'yes':'no'}</Text>
    </View>
  )
}
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    display:'flex',
    justifyContent: 'space-around'
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    startChangeAgePreference: (age) => dispatch(startChangeAgePreference(age)),
    startChangeDistance: (distance) => dispatch(startChangeDistance(distance)),
    startChangeNotification: (notification) => dispatch(startChangeNotification(notification))
  }
}

const mapStateToProps = (state,ownProps) => {
  console.log('state -- ',state)
  return {
    agePreference: state.settingsReducer.agePreference,
    distance: state.settingsReducer.distance,
    sendNotifications: state.settingsReducer.sendNotifications
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditSettings);