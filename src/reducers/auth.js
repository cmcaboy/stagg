
const defaultAuthReducer = {
    uid: null,
    email: '',
    password: '',
    error: '',
    isLoading: false
}

const authReducer = (state = {}, action) => {
    //console.log('action -- ',action)
    switch(action.type) {
        case 'FAILED_LOGIN':
            return {
                ...state,
                ...action.updates
            }
        case 'LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        case 'CHANGE_EMAIL':
            return {
                ...state,
                email: action.email
            }
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                password: action.password
            }
        case 'LOGIN':
            return {
                ...defaultAuthReducer,
                uid: action.uid
            };
        case 'LOGOUT':
            return {...defaultAuthReducer};
        default:
            return state;
            
    }
};

export default authReducer;