import actionTypes from "../actions/actionTypes"

const initialState = {
    isLoading: false,
    categories: [],
    categoriesHomePage: [],
    category: {},
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CATEGORY_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actionTypes.GET_ALL_CATEGORY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                categories: action.data,
            }
        }
        case actionTypes.GET_ALL_CATEGORY_HOME_PAGE_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actionTypes.GET_ALL_CATEGORY_HOME_PAGE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                categoriesHomePage: action.data,
            }
        }
        case actionTypes.GET_CATEGORY_SUCCESS: {
            return {
                ...state,
                category: action.data
            }
        }
        default: {
            return state
        }
    }
}

export default categoryReducer