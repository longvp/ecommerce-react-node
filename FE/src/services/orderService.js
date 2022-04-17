import axios from '../axios'

const getAllOrderService = (limit, page) => {
    return axios.get(`/api/get-all-order?limit=${limit}&page=${page}`)
}

const deleteOrderByIdService = (id) => {
    return axios.delete(`/api/delete-order-by-id`, { data: { id } })
}

const changeStatusOrderService = (orderInput) => {
    return axios.post(`/api/change-status-order`, orderInput)
}

export {
    getAllOrderService,
    deleteOrderByIdService,
    changeStatusOrderService,
}