import actionTypes from './actionTypes'
import { toast } from 'react-toastify'
import { cancelOrderService, clientChangeInfoService, clientLoginService, createOrderService, getAllOrderByUserIdService } from '../../services/clientService'

export const clientLogin = (email, password) => {
    return async (dispatch) => {
        let res = await clientLoginService(email, password)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.CLIENT_LOGIN,
                data: res.user
            })
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const clientLogout = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.CLIENT_LOGOUT
        })
    }
}

export const clientChangeInfo = (clientInput) => {
    return async (dispatch) => {
        let res = await clientChangeInfoService(clientInput)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.CLIENT_LOGIN,
                data: res.user
            })
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const createOrder = (order) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.CLIENT_ORDER_START
        })
        let res = await createOrderService(order)
        if (res && res.errCode === 0) {
            toast.success(res.message)
            dispatch({
                type: actionTypes.CLIENT_ORDER_SUCCESS
            })
            dispatch({
                type: actionTypes.DELETE_ALL_PRODUCT_IN_CART
            })
        } else {
            toast.error(res.message)
            dispatch({
                type: actionTypes.CLIENT_ORDER_FAIL
            })
        }
    }
}

export const getAllOrderByUserId = (userId) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_ORDER_BY_USER_ID_START
        })
        let res = await getAllOrderByUserIdService(userId)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_ORDER_BY_USER_ID_SUCCESS,
                data: res.orders
            })
        }
    }
}

export const cancelOrder = (orderInput) => {
    return async (dispatch) => {
        let res = await cancelOrderService(orderInput)
        if (res && res.errCode === 0) {
            toast.success(res.message)
            dispatch(getAllOrderByUserId(orderInput.userId))
        }
    }
}