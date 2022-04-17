import actionTypes from './../actions/actionTypes'

const initialState = {
    isLoading: false,
    clientLoginInfo: JSON.parse(localStorage.getItem('client_login')) || {},
    ordersByUserId: []
}

const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLIENT_LOGIN: {
            localStorage.setItem('client_login', JSON.stringify(action.data))
            return {
                ...state,
                clientLoginInfo: action.data
            }
        }
        case actionTypes.CLIENT_LOGOUT: {
            localStorage.removeItem('client_login')
            return {
                ...state,
                clientLoginInfo: {}
            }
        }
        case actionTypes.CLIENT_ORDER_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actionTypes.CLIENT_ORDER_SUCCESS: {
            return {
                ...state,
                isLoading: false
            }
        }
        case actionTypes.CLIENT_ORDER_FAIL: {
            return {
                ...state,
                isLoading: false
            }
        }
        case actionTypes.GET_ALL_ORDER_BY_USER_ID_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actionTypes.GET_ALL_ORDER_BY_USER_ID_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                ordersByUserId: action.data
            }
        }
        default: {
            return state
        }
    }
}

export default clientReducer
