import axios from '../axios'

const createUserService = (userInput) => {
    return axios.post(`/api/create-user`, userInput)
}

const editUserService = (userInput) => {
    return axios.post(`/api/edit-user`, userInput)
}

const deleteUserService = (id) => {
    return axios.delete(`/api/delete-user`, { data: { id } })
}

const adminRegisterService = (userInput) => {
    return axios.post(`/api/admin-register`, userInput)
}

const adminLoginService = (email, password) => {
    return axios.post(`/api/admin-login`, { email, password })
}

const editInfoAdminLoginService = (userInput) => {
    return axios.post(`/api/edit-info-admin-login`, userInput)
}

const getAllUserService = (limit, page) => {
    return axios.get(`/api/get-all-user?limit=${limit}&page=${page}`)
}

const getAllUserByFullnameService = (limit, page, fullname) => {
    return axios.get(`/api/get-all-user-by-full-name?limit=${limit}&page=${page}&fullname=${fullname}`)
}

const getAllUserByRoleService = (limit, page, role) => {
    return axios.get(`/api/get-all-user-by-role?limit=${limit}&page=${page}&role=${role}`)
}

const getAllUserByRoleAndFullnameService = (limit, page, role, fullname) => {
    return axios.get(`/api/get-all-user-by-role-and-full-name?limit=${limit}&page=${page}&role=${role}&fullname=${fullname}`)
}

const changeStatusAccountUserService = (userInput) => {
    return axios.post(`/api/change-status-account-user`, userInput)
}

export {
    createUserService,
    deleteUserService,
    editUserService,
    adminRegisterService,
    adminLoginService,
    editInfoAdminLoginService,
    getAllUserService,
    getAllUserByFullnameService,
    getAllUserByRoleService,
    getAllUserByRoleAndFullnameService,
    changeStatusAccountUserService
}