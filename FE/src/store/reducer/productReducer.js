import actionTypes from '../actions/actionTypes'

const initialState = {
    isLoading: false,
    products: [],
    sizeProducts: 0,
    product: {}
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_PRODUCT_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actionTypes.GET_ALL_PRODUCT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                products: action.data.products,
                sizeProducts: action.data.sizeProducts
            }
        }
        case actionTypes.GET_PRODUCT_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actionTypes.GET_PRODUCT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                product: action.data
            }
        }
        default: {
            return state
        }
    }
}

export default productReducer