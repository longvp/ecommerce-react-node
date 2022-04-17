import actionTypes from './actionTypes'
import { toast } from 'react-toastify'

export const addProductToCart = (product, quantityProduct) => {
    return (dispatch) => {
        toast.success('Đã thêm vào giỏ hàng')
        dispatch({
            type: actionTypes.ADD_PRODUCT_TO_CART,
            data: {
                product,
                quantityProduct
            }
        })
    }
}

export const updateQuantityProduct = (product, quantityProduct) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.UPDATE_QUANTITY_PRODUCT,
            data: {
                product,
                quantityProduct
            }
        })
    }
}

export const deleteProductInCart = (product) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.DELETE_PRODUCT_IN_CART,
            data: {
                product
            }
        })
    }
}



