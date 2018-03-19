import React, {Component} from 'react';
import {View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  TextInput,
  ImageEditor,
  Image
} from 'react-native';
import {ImagePicker} from 'expo';
import {CirclePicture,Card,CardSection,Button,Spinner} from './common';
import {connect} from 'react-redux';
import {
  startChangeAge,
  startProfilePicture,
  startChangeAncillaryPictures,
  startChangeName,
  startChangeSchool,
  startChangeWork,
  startChangeDescription,
  startRemoveProfile
} from '../actions/profile';
import { startLogout } from '../actions/auth';
import {firebase} from '../firebase';
import uploadImage from '../firebase/uploadImage';

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
      age:this.props.age,
      image: this.props.profilePic,
      isLoading: false
    }
  }

  pickImage = () => {
    this.setState({isLoading: true});
    ImagePicker.launchImageLibraryAsync({
      allowEditting: true,
      aspect: [2,1]
    }).then((result) => {
      if(result.cancelled) {
        return
      }
      ImageEditor.cropImage(result.uri, {
        offset: {x:0,y:0},
        size: {width: result.width, height: result.height},
        displaySize: {width:200, height:200},
        resizeMode: 'container'
      }, async (uri) => {
        const url = await uploadImage(uri);
        this.props.startProfilePicture(url);
        this.setState({isLoading:false});
        // Now that the image has been selected, we need to upload the image
        // to firebase storage.

        /*
        console.log('uri: ',uri);
        const storageRef = firebase.storage().ref(`profile_pictures/${uri}`);
        let task = storageRef.put(uri);
        task.on('state_changed',
          (snapshot) => {
            let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100
            console.log(`Upload is ${percentage}% done.`)
          },
          (error) => console.log('error uploading file: ',error),
          (complete) => startProfilePicture(task.snapshot.downloadURL)
        )
        */
      },
      () => console.log('Error'))
    })
  }

  alterName() {   this.setState((prevState) => ({editName:!prevState.editName}))};
  alterSchool() { this.setState((prevState) => ({editSchool:!prevState.editSchool}))};
  alterWork() {   this.setState((prevState) => ({editWork:!prevState.editWork}))};
  alterDescription() { this.setState((prevState) => ({editDescription:!prevState.editDescription}))};
  alterAge() {    this.setState((prevState) => ({editAge:!prevState.editAge}))};

  changeName() {  this.alterName(); this.props.startChangeName(this.state.name)};
  changeSchool() {this.alterSchool(); this.props.startChangeSchool(this.state.school)};
  changeWork() {  this.alterWork(); this.props.startChangeWork(this.state.work)};
  changeDescription() { this.alterDescription(); this.props.startChangeDescription(this.state.description)};
  changeAge() {   this.alterAge(); this.props.startChangeAge(this.state.age)};

  removeAccount = () => {
    console.log('Remove Account function');
    this.props.startRemoveProfile();
    this.props.startLogout();

  }

  render() {
    return (
        <View style={styles.settingsContainer}>
            <Card>
            {this.state.isLoading ? (
              <Spinner size="small" style={styles.spinner}/>
            ) : (
              <TouchableOpacity onPress={this.pickImage}>
                <Text>Choose New Picture</Text>
                
                  {this.state.image && (
                  <Image style={styles.img} source={{uri:this.props.profilePic}}/>
                  )}
                </TouchableOpacity>
            )}
              
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
            
              <Button onPress={this.removeAccount}>Remove Account</Button>
            
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
    },
    img: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
      backgroundColor: 'black'
    },
    spinner: {
      width: 150,
      height: 150
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
        startRemoveProfile: () => dispatch(startRemoveProfile()),
        startLogout: () => dispatch(startLogout()),
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
