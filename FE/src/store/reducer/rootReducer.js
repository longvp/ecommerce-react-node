import { combineReducers } from 'redux'
import allcodeReducer from './allcodeReducer'
import userReducer from './userReducer'
import categoryReducer from './categoryReducer'
import productReducer from './productReducer'
import blogReducer from './blogReducer'
import cartReducer from './cartReducer'
import clientReducer from './clientReducer'
import orderReducer from './orderReducer'

const rootReducer = combineReducers({
    allcodeReducer: allcodeReducer,
    userReducer: userReducer,
    categoryReducer: categoryReducer,
    productReducer: productReducer,
    blogReducer: blogReducer,
    cartReducer: cartReducer,
    clientReducer: clientReducer,
    orderReducer: orderReducer
})

export default rootReducer