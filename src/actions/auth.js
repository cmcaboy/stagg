import {firebase} from '../firebase';
import Expo from 'expo';

export const startFacebookLogin = () => {
    loading(true);
    return async (dispatch,getState) => {
        const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync('424631184639658',
            {permissions:['public_profile','email']}
        )

        // the /me notation will refer to the userid referenced from the access token.
        if(type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
            const responseData = await response.json();

            const provider = firebase.auth.FacebookAuthProvider;
            const credential = provider.credential(token);
            firebase.auth().signInWithCredential(credential)
                .then(() =>  dispatch(login(firebase.auth().currentUser.uid)))
                .catch(() => dispatch(failedLogin('Login Failed')));
            // Issue login with unique userid as per firebase auth
           
        } else {
            //console.log("Login Error!");
            dispatch(failedLogin('Login Failed'));
        }
        
    }
}

export const startEmailLogin = (email = "",password = "") => {
    loading(true);
    return (dispatch, getState) => {
        return firebase.auth().signInWithEmailAndPassword(email,password)
            .then((data) => {
                dispatch(login(firebase.auth().currentUser.uid));
            })
            .catch((error) => {
                firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then((data) => {
                        //console.log('firebase auth: ',firebase.auth());
                        dispatch(login(firebase.auth().currentUser.uid));
                    })
                    .catch((error) => {
                        dispatch(failedLogin("Authentication Failed"));
                    })
            });
    }
}

export const failedLogin = (error) => ({
    type: 'FAILED_LOGIN',
    updates: {
        password: '',
        isLoading: false,
        error
    }
})

export const loading = (isLoading) => ({
    type: 'LOADING',
    isLoading
});

export const login = (uid) => ({
    type: 'LOGIN',
    isLoading: false,
    error: '',
    uid
});

export const startLogout = () => {
    return (dispatch) => {
        return firebase.auth().signOut()
    }
};
export const logout = () => ({
    type: 'LOGOUT'
});

export const changeEmail = (email) => ({
    type: 'CHANGE_EMAIL',
    email
});

export const changePassword = (password) => ({
    type: 'CHANGE_PASSWORD',
    password
});
