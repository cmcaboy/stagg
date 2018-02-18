import firebase from '../firebase';
import {db} from '../firebase';

export const startInitialSettings = (id,initialSettingsData) => {
    return (dispatch,getState) => {
        const {
            agePreference = 'aroundSameAge',
            distance = 20,
            sendNotifications = true
        } = initialSettingsData;
        const initialSettings = { agePreference, distance, sendNotifications};

        db.collection("users").doc(id).set({...initialSettings})
            .then(() => dispatch(initialSettings(initialSettings)))
            .catch((error) => console.log("Error writing document: ",error))
    }
}
export const initialSettings = (initialSettingsData) => ({
        type: 'SET_INITIAL_SETTINGS',
        initialSettings: {
            ...initialSettings
        }
});

export const startLoadSettings = (id) => {
    return (dispatch,getState) => {
        db.collection("users").doc(`${id}`).get()
            .then((data) => {
                const userData = data.data();
                console.log('userData: ',userData);
                const userSettings = {
                    distance: userData.distance,
                    agePreference: userData.agePreference,
                    sendNotifications: userData.sendNotifications
                }
                console.log('userSettings: ',userSettings);
                dispatch(loadSettings(id,userSettings));
            }
            )
            .catch((error) => console.log("Error in startLoadSettings: ",error))
    }
}
export const loadSettings = (id,userSettings) => ({
    type: 'LOAD_SETTINGS',
    userSettings,
    id
})

export const startChangeAgePreference = (id,agePreference) => {
    return (dispatch) => {
    db.collection("users").doc(id).set({agePreference})
        .then(() => dispatch(changeAgePreference(agePreference)))
        .catch((error) => console.log("Error writing document: ",error))
    }
}

export const changeAgePreference = (agePreference) => ({
    type: 'CHANGE_AGE_PREFERENCE',
    updates: {
        agePreference
    }
});

export const startChangeDistance = (id,distance) => {
    return (dispatch) => {
    db.collection("users").doc(id).set({distance})
        .then(() => changeDistance(distance))
        .catch((error) => console.log("Error writing document: ",error))
    }
}

export const changeDistance = (distance) => ({
    type: 'CHANGE_DISTANCE',
    updates: {
        distance
    }
});

export const startChangeNotification = (id,notification) => {
    return (dispatch) => {
    db.collection("users").doc(id).set({notification})
        .then(() => changeNotification(notification))
        .catch((error) => console.log("Error writing document: ",error))
    }
}

export const changeNotification = (notification) => ({
    type: 'CHANGE_NOTIFICATION',
    updates: {
        notification
    }
});
