import React, {Component} from 'react';
import {View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  TextInput
} from 'react-native';
import {CirclePicture,Card,CardSection,Button} from './common';
import {connect} from 'react-redux';
import {
  startChangeAge,
  startProfilePicture,
  startChangeAncillaryPictures,
  startChangeName,
  startChangeSchool,
  startChangeWork,
  startChangeDescription
} from '../actions/profile'

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: false,
      editSchool: false,
      editWork: false,
      editDescription: false,
      editAge: false,
      name: this.props.name,
      school: this.props.school,
      work: this.props.work,
      description: this.props.description,
      age:this.props.age
    }
  }
  alterName() {this.setState((prevState) => ({editName:!prevState.editName}))};
  alterSchool() {this.setState((prevState) => ({editSchool:!prevState.editSchool}))};
  alterWork() {this.setState((prevState) => ({editWork:!prevState.editWork}))};
  alterDescription() { this.setState((prevState) => ({editDescription:!prevState.editDescription}))};
  alterAge() { this.setState((prevState) => ({editAge:!prevState.editAge}))};

  changeName() { this.alterName(); this.props.startChangeName(this.state.name)};
  changeSchool() { this.alterSchool(); this.props.startChangeSchool(this.state.school)};
  changeWork() { this.alterWork(); this.props.startChangeWork(this.state.work)};
  changeDescription() { this.alterDescription(); this.props.startChangeDescription(this.state.description)};
  changeAge() { this.alterAge(); this.props.startChangeAge(this.state.age)};

  render() {
    return (
        <View style={styles.settingsContainer}>
            <Card>

              <CardSection stylesOverride={styles.cardSection}>
              {!this.state.editName? (
                <TouchableOpacity onPress={() => this.alterName()}>
                <Text>Name: {this.props.name}</Text>
              </TouchableOpacity>
              ) : (
                <View style={styles.editView}>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                />
                <Button 
                  onPress={() => this.changeName()}
                >Save</Button>
                </View>
              )}
              </CardSection>

              <CardSection stylesOverride={styles.cardSection}>
              {!this.state.editSchool? (
                <TouchableOpacity onPress={() => this.alterSchool()}>
                <Text>School: {this.props.school}</Text>
              </TouchableOpacity>
              ) : (
                <View style={styles.editView}>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(school) => this.setState({school})}
                  value={this.state.school}
                />
                <Button 
                  onPress={() => this.changeSchool()}
                >Save</Button>
                </View>
              )}
              </CardSection>

              <CardSection stylesOverride={styles.cardSection}>
              {!this.state.editWork? (
                <TouchableOpacity onPress={() => this.alterWork()}>
                <Text>Work: {this.props.work}</Text>
              </TouchableOpacity>
              ) : (
                <View style={styles.editView}>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(work) => this.setState({work})}
                  value={this.state.work}
                />
                <Button 
                  onPress={() => this.changeWork()}
                >Save</Button>
                </View>
              )}
              </CardSection>

              <CardSection stylesOverride={styles.cardSection}>
              {!this.state.editDescription? (
                <TouchableOpacity onPress={() => this.alterDescription()}>
                <Text>Description: {this.props.description}</Text>
              </TouchableOpacity>
              ) : (
                <View style={styles.editView}>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(description) => this.setState({description})}
                  value={this.state.description}
                />
                <Button 
                  onPress={() => this.changeDescription()}
                >Save</Button>
                </View>
              )}
              </CardSection>

              <CardSection stylesOverride={styles.cardSection}>
              {!this.state.editAge? (
                <TouchableOpacity onPress={() => this.alterAge()}>
                <Text>Age: {this.props.age}</Text>
              </TouchableOpacity>
              ) : (
                <View style={styles.editView}>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(age) => this.setState({age})}
                  value={this.state.age}
                />
                <Button 
                  onPress={() => this.changeAge()}
                >Save</Button>
                </View>
              )}
              </CardSection>
            </Card>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    textInputStyle: {
      height: 40,
      width: 100,
      borderColor: 'gray',
      borderWidth: 1
    },
    cardContainer: {
      width: 300,
      height: 400
    },
    cardSection: {
      height:50,
      width: 300
    },
    editView: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        startChangeAge: (age) => dispatch(startChangeAge(age)),
        startProfilePicture: (profilePic) => dispatch(startProfilePicture(profilePic)),
        startChangeAncillaryPictures: (urlList) => dispatch(startChangeAncillaryPictures(urlList)),
        startChangeName: (name) => dispatch(startChangeName(name)),
        startChangeSchool: (school) => dispatch(startChangeSchool(school)),
        startChangeWork: (work) => dispatch(startChangeWork(work)),
        startChangeDescription: (description) => dispatch(startChangeDescription(description))
    }
}



const mapStateToProps = (state,ownProps) => {
    return {
        profilePic: state.profileReducer.profilePic,
        name: state.profileReducer.name,
        work: state.profileReducer.work,
        school: state.profileReducer.school,
        description: state.profileReducer.description,
        gender: state.profileReducer.gender,
        age: state.profileReducer.age
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);
