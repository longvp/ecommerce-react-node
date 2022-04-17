import actionTypes from './../actions/actionTypes'

const initialState = {
    isLoading: false,
    orders: [],
    sizeOrders: 0
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_ORDER_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actionTypes.GET_ALL_ORDER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                orders: action.data.orders,
                sizeOrders: action.data.sizeOrders
            }
        }
        default: {
            return state
        }
    }
}

export default orderReducer
