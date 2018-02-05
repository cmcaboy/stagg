import React, {Component} from 'react';
import firebase from 'firebase';
import {View,Text} from 'react-native';
import {Card,CardSection,Button,Spinner,Input} from './common';
import {AccessToken,LoginManager} from 'react-native-fbsdk';
import Expo from 'expo';
//import Input from './Input';


class LoginForm extends Component {
    state = {email: '',password:'',error:'',loading:false}

    onButtonPress() {
        const {email,password} = this.state;
        this.setState({error:'',loading:true})
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess.bind(this))
            .catch((error) => {
                console.log(error);
                firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch((error) => {
                        console.log(error);
                        this.setState({error:'Authentication Failed.',loading:false})
                    });
            });
    }

    authenticate = (token) => {
        const provider = firebase.auth.FacebookAuthProvider;
        const credential = provider.credential(token);
        return firebase.auth().signInWithCredential(credential);
    }
    
    async onButtonPressFB() {
        console.log('facebook login');
        
        const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync('424631184639658',
            {permissions:['public_profile','email']}
        )

        console.log('type',type);

        if(type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
            console.log(await response.json());
            this.authenticate(token);
        }
        
    }
    onLoginSuccess() {
        this.setState({loading:false,error:'',email:'',password:''})
    }
    renderButton() {
        if(this.state.loading) {
            return <Spinner size="small" />
        } else {
            return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>
        }
    }
    renderButtonFB() {
        if(this.state.loading) {
            return <Spinner size="small" />
        } else {
            return (<Button 
                onPress={this.onButtonPressFB.bind(this)}
                buttonStyleOverride={styles.buttonFBStyle}
                textStyleOverride={styles.buttonTextFBStyle}
            >Log in with Facebook</Button>
            )
        }
    }
    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        placeholder="user@gmail.com"
                        value={this.state.email}
                        label="Email"
                        onChangeText={email => this.setState({email})}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        placeholder="password"
                        value={this.state.password}
                        label="Password"
                        onChangeText={password => this.setState({password})}
                        secureTextEntry={true}
                    />
                </CardSection>
                
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
                <CardSection>
                    {this.renderButtonFB()}
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    buttonFBStyle: {
        backgroundColor: '#4C69BA'
    },
    buttonTextFBStyle: {
        color: "white"
    }
}

export default LoginForm;