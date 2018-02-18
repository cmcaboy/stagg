import uuid from 'uuid';
import {db} from '../firebase';
import 'firebase/firestore';

//const db = firebase.firestore();

export const startLoadProfile = (uid) => {
    return (dispatch,getState) => {
        db.collection(`users`).doc(`${uid}`).get()
            .then((data) => {
                //console.log('profile: ',profile);
                const profile = data.data();
                const userProfile = {
                    name: profile.name,
                    profilePic: profile.profilePic,
                    age: profile.age,
                    work: profile.work,
                    school: profile.school,
                    description: profile.description,
                    gender: profile.gender
                }  
                dispatch(loadProfile(uid,userProfile))
            })
            .catch((error) => console.log("Error obtaining document: ",error));
    }
}

export const loadProfile = (uid,userProfile) => ({
    type: 'LOAD_PROFILE',
    uid,
    userProfile
});

export const startNewUser = (newUserData) => {
    return (dispatch,getState) => {
    const {
        uid = uuid(),
        age = 25,
        name = 'Anonymous',
        work = '',
        school = '',
        description = '',
        profilePic = '',
        ancillaryPics = {},
        gender = 'male'
    } = newUserData;
    const newUser = { age, name, work, school, description, profilePic, ancillaryPics};

    db.collection("users").doc(uid).set({...newUser})
        .then(() => dispatch(newUser(newUser)))
        .catch((error) => console.log("Error writing document: ",error))
    }
}
export const newUser = (newUserData) => ({
        type: 'NEW_USER',
        newUser: {
            uid,
            ...newUser
        }
});

export const startChangeAge = (age) => {
    return (dispatch,getState) => {
        const id = getState().authReducer.uid;
        db.collection("users").doc(id).update({age})
            .then(() => dispatch(changeAge(age)))
            .catch((error) => console.log("Error writing document: ",error))
    }
}

// Change Age
export const changeAge = (age) => ({
    type: 'CHANGE_AGE',
    updates: {
        age
    }
});


export const startProfilePicture = (profilePic) => {
    return (dispatch,getState) => {
        const id = getState().authReducer.uid;
        db.collection("users").doc(id).update({profilePic})
            .then(() => dispatch(changeProfilePicture(profilePic)))
            .catch((error) => console.log("Error writing document: ",error))
    }
}

export const changeProfilePicture = (profilePic) => ({
    type: 'CHANGE_PROFILE_PIC',
    updates: {
        profilePic
    }
});

export const startChangeAncillaryPictures = (urlList) => {
    return (dispatch,getState) => {
        const id = getState().authReducer.uid;
        db.collection("users").doc(id).update({urlList})
            .then(() => dispatch(changeAncillaryPictures(urlList)))
            .catch((error) => console.log("Error writing document: ",error))
    }
}

export const changeAncillaryPictures = (urlList) => ({
    type: 'CHANGE_ANCILLARY_PICS',
    updates: {
        ancillaryPics: urlList // this is expected to be an array
    }
});

export const startChangeName = (name) => {
    return (dispatch,getState) => {
        const id = getState().authReducer.uid;
        console.log('id: ',id);
        console.log('current state: ',getState());
        db.collection("users").doc(id).update({name})
            .then(() => dispatch(changeName(name)))
            .catch((error) => console.log("Error writing document: ",error))
    }
}

export const changeName = (name) => ({
    type: 'CHANGE_NAME',
    updates:{
        name
    }
});

export const startChangeSchool = (school) => {
    return (dispatch,getState) => {
        const id = getState().authReducer.uid;
        db.collection("users").doc(id).update({school})
            .then(() => dispatch(changeSchool(school)))
            .catch((error) => console.log("Error writing document: ",error))
    }
}

export const changeSchool = (school) => ({
    type: 'CHANGE_SCHOOL',
    updates:{
        school
    }
});

export const startChangeWork = (work) => {
    return (dispatch,getState) => {
        const id = getState().authReducer.uid;
        db.collection("users").doc(id).update({work})
            .then(() => dispatch(changeWork(work)))
            .catch((error) => console.log("Error writing document: ",error))
    }
}

export const changeWork = (work) => ({
    type: 'CHANGE_WORK',
    updates: {
        work
    }
});

export const startChangeDescription = (description) => {
    return (dispatch,getState) => {
        const id = getState().authReducer.uid;
        db.collection("users").doc(id).update({description})
            .then(() => dispatch(changeDescription(description)))
            .catch((error) => console.log("Error writing document: ",error))
    }
}

export const changeDescription = (description) => ({
    type: 'CHANGE_DESCRIPTION',
    updates:{
        description
    }
});
