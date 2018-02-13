
const defaultAuthReducer = {
    email: '',
    password: '',
    error: '',
    isLoading: false
}

const authReducer = (state = {}, action) => {
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
        case 'EMAIL_CHANGE':
            return {
                ...state,
                email: action.email
            }
        case: 'PASSWORD_CHANGE':
            return {
                ...state,
                password: action.password
            }
        case 'LOGIN':
            return {
                ...defaultAuthReducer,
                uid: action.uid,
            };
        case 'LOGOUT':
            return {...defaultAuthReducer};
        default:
            return state;
            
    }
};