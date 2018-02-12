import uuid from 'uuid';
import firebase from '../firebase';

const db = firebase.firestore();

export const startNewUser = (newUserData) => {
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
        .then(() => newUser(newUser))
        .catch((error) => console.log("Error writing document: ",error))
}

// New User - still pending
export const newUser = (newUserData) => ({
        type: 'NEW_USER',
        newUser: {
            uid,
            ...newUser
        }
});

export const startChangeAge = (id,age) => {
    db.collection("users").doc(id).set({age})
        .then(() => changeAge(age))
        .catch((error) => console.log("Error writing document: ",error))
}

// Change Age
export const changeAge = (age) => ({
    type: 'CHANGE_AGE',
    updates: {
        age
    }
});


export const startProfilePicture = (id,profilePic) => {
    db.collection("users").doc(id).set({profilePic})
        .then(() => changeProfilePicture(profilePic))
        .catch((error) => console.log("Error writing document: ",error))
}

export const changeProfilePicture = (profilePic) => ({
    type: 'CHANGE_PROFILE_PIC',
    updates: {
        profilePic
    }
});

export const startChangeAncillaryPictures = (id,urlList) => {
    db.collection("users").doc(id).set({urlList})
        .then(() => changeAncillaryPictures(urlList))
        .catch((error) => console.log("Error writing document: ",error))
}

export const changeAncillaryPictures = (urlList) => ({
    type: 'CHANGE_ANCILLARY_PICS',
    updates: {
        ancillaryPics: urlList // this is expected to be an array
    }
});

export const startChangeName = (id,name) => {
    db.collection("users").doc(id).set({name})
        .then(() => changeName(name))
        .catch((error) => console.log("Error writing document: ",error))
}

export const changeName = (name) => ({
    type: 'CHANGE_NAME',
    updates:{
        name
    }
});

export const startChangeSchool = (id,school) => {
    db.collection("users").doc(id).set({school})
        .then(() => changeSchool(school))
        .catch((error) => console.log("Error writing document: ",error))
}

export const changeSchool = (school) => ({
    type: 'CHANGE_SCHOOL',
    updates:{
        school
    }
});

export const startChangeWork = (id,work) => {
    db.collection("users").doc(id).set({work})
        .then(() => changeWork(work))
        .catch((error) => console.log("Error writing document: ",error))
}

export const changeWork = (work) => ({
    type: 'CHANGE_WORK',
    updates: {
        work
    }
});

export const startChangeDescription = (id,description) => {
    db.collection("users").doc(id).set({description})
        .then(() => changeDescription(description))
        .catch((error) => console.log("Error writing document: ",error))
}

export const changeDescription = (description) => ({
    type: 'CHANGE_DESCRIPTION',
    updates:{
        description
    }
});
