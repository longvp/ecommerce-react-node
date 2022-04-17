import actionTypes from './../actions/actionTypes'

const initialState = {
    roles: [],
    genders: [],
    statusOrders: []
}

const allcodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CODE: {
            return {
                ...state,
                roles: action.data.dataRole,
                genders: action.data.dataGender,
                statusOrders: action.data.dataStatusOrder
            }
        }
        default: {
            return state
        }
    }
}

export default allcodeReducer