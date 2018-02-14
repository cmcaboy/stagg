import React, {Component} from 'react';
import firebase from 'firebase';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';
import {Card,CardSection,Button,Spinner,Input} from './common';
import Expo from 'expo';
import {
    startEmailLogin,
    startFacebookLogin,
    changeEmail,
    changePassword} from '../actions/auth';
//import Input from './Input';


class LoginForm extends Component {

    renderButton() {
        if(this.props.isLoading) {
            return <Spinner size="small" />
        } else {
            return (
                <Button 
                onPress={this.props.startEmailLogin}
                >Log in</Button>
            )
        }
    }
    renderButtonFB() {
        if(this.props.isLoading) {
            return <Spinner size="small" />
        } else {
            return (
                <Button 
                    onPress={this.props.startFacebookLogin}
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
                        value={this.props.email}
                        label="Email"
                        onChangeText={email => this.props.changeEmail(email)}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        placeholder="password"
                        value={this.props.password}
                        label="Password"
                        onChangeText={password => this.props.changePassword(password)}
                        secureTextEntry={true}
                    />
                </CardSection>
                
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
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

const mapStateToProps = (state,ownProps) => {
    //console.log('state ---',state);
    return {
    email: state.authReducer.email,
    password: state.authReducer.password,
    error: state.authReducer.error,
    isLoading: state.authReducer.isLoading
}
}

const mapDispatchToProps = (dispatch) => ({
    startEmailLogin: () => dispatch(startEmailLogin()),
    startFacebookLogin: () => dispatch(startFacebookLogin()),
    changeEmail: () => dispatch(changeEmail()),
    changePassword: () => dispatch(changePassword())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);