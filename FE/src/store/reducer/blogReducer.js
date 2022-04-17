import actionTypes from './../actions/actionTypes'

const initialState = {
    isLoading: false,
    blogs: [],
    sizeBlogs: 0,
    blog: {}
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_BLOG_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actionTypes.GET_ALL_BLOG_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                blogs: action.data.blogs,
                sizeBlogs: action.data.sizeBlogs
            }
        }
        case actionTypes.GET_BLOG_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case actionTypes.GET_BLOG_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                blog: action.data
            }
        }
        default: {
            return state
        }
    }
}

export default blogReducer