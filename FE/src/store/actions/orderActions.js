import actionTypes from './actionTypes'
import { toast } from 'react-toastify'
import { LIMIT_ITEM_ONE_PAGE_ADMIN } from './../../utilities/const'
import {
    changeStatusOrderService,
    deleteOrderByIdService,
    getAllOrderService
} from '../../services/orderService'

export const getAllOrder = (limit, page) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_ORDER_START
        })
        let res = await getAllOrderService(limit, page)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_ORDER_SUCCESS,
                data: {
                    orders: res.orders,
                    sizeOrders: res.sizeOrders
                }
            })
        }
    }
}

export const deleteOrderById = (id, currentPage) => {
    return async (dispatch) => {
        let res = await deleteOrderByIdService(id)
        if (res && res.errCode === 0) {
            dispatch(getAllOrder(LIMIT_ITEM_ONE_PAGE_ADMIN, currentPage))
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const changeOrderStatus = (orderInput, currentPage) => {
    return async (dispatch) => {
        let res = await changeStatusOrderService(orderInput)
        if (res && res.errCode === 0) {
            dispatch(getAllOrder(LIMIT_ITEM_ONE_PAGE_ADMIN, currentPage))
        }
        else {
            toast.error(res.message)
        }
    }
}

