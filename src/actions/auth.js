import {firebase} from '../firebase';
import Expo from 'expo';

export const startFacebookLogin = () => {
    loading(true);
    return async () => {
        const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync('424631184639658',
            {permissions:['public_profile','email']}
        )

        // the /me notation will refer to the userid referenced from the access token.
        if(type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
            const responseData = await response.json();

            const provider = firebase.auth.FacebookAuthProvider;
            const credential = provider.credential(token);
            firebase.auth().signInWithCredential(credential);
            // Issue login with unique userid as per firebase auth
            login(firebase.auth().currentUser.uid);
        } else {
            //console.log("Login Error!");
            failedLogin('Facebook Login failed');
        }
        
    }
}

export const startEmailLogin = (email = "",password = "") => {
    loading(true);
    console.log('email: ',email);
    console.log('password: ',password);
    return () => {
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then((data) => {
                console.log('firebase auth: ',firebase.auth());
                console.log('data: ',data);
                login(firebase.auth().currentUser.uid);
            })
            .catch((error) => {
                console.log('error with login:',error);
                firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then((data) => {
                        console.log('firebase auth: ',firebase.auth());
                        console.log('data: ',data);
                        login(firebase.auth().currentUser.uid);
                    })
                    .catch((error) => failedLogin(error));
            });
    }
}

export const failedLogin = (error) => ({
    type: 'FAILED_LOGIN',
    updates: {
        email: '',
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
    return () => {
        return firebase.auth().signOut();
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
