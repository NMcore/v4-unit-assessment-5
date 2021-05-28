const initialState = {
    username: '',
    profile_pic: ''
};

const UPDATE_USER = 'UPDATE_USER';
const USER_LOGOUT = 'USER_LOGOUT'

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
};

export function logout() {
    return {
        type: USER_LOGOUT
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                username: action.payload.username,
                profile_pic: action.payload.profile_pic
            };
        case USER_LOGOUT:
        return initialState;
        default: return state;
    }
};