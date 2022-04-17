import actionTypes from './../actions/actionTypes'

const initialState = {
    isLoading: false,
    users: [],
    sizeUsers: 0,
    adminLoginInfo: JSON.parse(localStorage.getItem('admin_login')) || {},
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_USER_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actionTypes.GET_ALL_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                sizeUsers: action.data.sizeUsers,
                users: action.data.users
            }
        }
        case actionTypes.ADMIN_LOGIN: {
            localStorage.setItem('admin_login', JSON.stringify(action.data))
            return {
                ...state,
                adminLoginInfo: action.data
            }
        }
        case actionTypes.ADMIN_LOGOUT: {
            localStorage.removeItem('admin_login')
            return {
                ...state,
                adminLoginInfo: {}
            }
        }
        default: {
            return state
        }
    }
}

export default userReducer
