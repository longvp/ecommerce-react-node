import axios from '../axios'

const clientRegisterService = (clientInput) => {
    return axios.post(`/api/client-register`, clientInput)
}

const verifyAccountService = (clientInput) => {
    return axios.post(`/api/verify-account`, clientInput)
}

const clientLoginService = (email, password) => {
    return axios.post(`/api/client-login`, { email, password })
}

const clientChangeInfoService = (clientInput) => {
    return axios.post(`/api/client-change-info`, clientInput)
}

const createOrderService = (order) => {
    return axios.post(`/api/create-order`, order)
}

const getAllOrderByUserIdService = (userId) => {
    return axios.get(`/api/get-all-order-by-user-id?userId=${userId}`)
}

const cancelOrderService = (orderInput) => {
    return axios.post(`/api/client-cancel-order`, orderInput)
}

export {
    clientRegisterService,
    verifyAccountService,
    clientLoginService,
    clientChangeInfoService,
    createOrderService,
    getAllOrderByUserIdService,
    cancelOrderService
}