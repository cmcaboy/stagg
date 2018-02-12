const settingsReducerDefaultState = {
    agePreference: 'aroundSameAge',     // Can be aroundSameAge, sameAge, older, younger, ageAgnostic
    distance: 20,                       // distance (in miles radius)
    sendNotifications: true
};

const settingsReducer = (state = settingsReducerDefaultState,action = {}) => {
    switch(action.type) {
        case 'SET_INITIAL_SETTINGS':
            return action.initialSettings;
        case 'CHANGE_AGE_PREFERENCE':
            return {...state,...updates};
        case 'CHANGE_DISTANCE':
            return {...state,...updates};
        case 'CHANGE_NOTIFICATION':
            return {...state,...updates};
        default:
            return state;
    }
}

export default settingsReducer;