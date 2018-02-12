import firebase from '../firebase';

const db = firebase.firestore();

export const startInitialSettings = (id,initialSettingsData) => {
    const {
        agePreference = 'aroundSameAge',
        distance = 20,
        sendNotifications = true
    } = initialSettingsData;
    const initialSettings = { agePreference, distance, sendNotifications};

    db.collection("users").doc(id).set({...initialSettings})
        .then(() => initialSettings(initialSettings))
        .catch((error) => console.log("Error writing document: ",error))
}

export const initialSettings = (initialSettingsData) => ({
        type: 'SET_INITIAL_SETTINGS',
        initialSettings: {
            ...initialSettings
        }
});

export const startChangeAgePreference = (id,agePreference) => {
    db.collection("users").doc(id).set({agePreference})
        .then(() => changeAgePreference(agePreference))
        .catch((error) => console.log("Error writing document: ",error))
}

export const changeAgePreference = (agePreference) => ({
    type: 'CHANGE_AGE_PREFERENCE',
    updates: {
        agePreference
    }
});

export const startChangeDistance = (id,distance) => {
    db.collection("users").doc(id).set({distance})
        .then(() => changeDistance(distance))
        .catch((error) => console.log("Error writing document: ",error))
}

export const changeDistance = (distance) => ({
    type: 'CHANGE_DISTANCE',
    updates: {
        distance
    }
});

export const startChangeNotification = (id,notification) => {
    db.collection("users").doc(id).set({notification})
        .then(() => changeNotification(notification))
        .catch((error) => console.log("Error writing document: ",error))
}

export const changeNotification = (notification) => ({
    type: 'CHANGE_NOTIFICATION',
    updates: {
        notification
    }
});
