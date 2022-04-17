import actionTypes from './actionTypes'
import {
    createUserService,
    deleteUserService,
    editUserService,
    adminLoginService,
    getAllUserService,
    // getSizeUsersSerivce,
    getAllUserByFullnameService,
    getAllUserByRoleService,
    getAllUserByRoleAndFullnameService,
    changeStatusAccountUserService,
    editInfoAdminLoginService
} from '../../services/userService'
import { toast } from 'react-toastify'
import { LIMIT_ITEM_ONE_PAGE_ADMIN } from './../../utilities/const'

export const createUser = (userInput) => {
    return async (dispatch) => {
        let res = await createUserService(userInput)
        if (res && res.errCode === 0) {
            dispatch(getAllUser(LIMIT_ITEM_ONE_PAGE_ADMIN, 1))
            // dispatch(getSizeUsers())
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const deleteUser = (id, currentPage) => {
    return async (dispatch) => {
        let res = await deleteUserService(id)
        if (res && res.errCode === 0) {
            dispatch(getAllUser(LIMIT_ITEM_ONE_PAGE_ADMIN, currentPage))
            // dispatch(getSizeUsers())
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const editUser = (userInput, currentPage) => {
    return async (dispatch) => {
        let res = await editUserService(userInput)
        if (res && res.errCode === 0) {
            dispatch(getAllUser(LIMIT_ITEM_ONE_PAGE_ADMIN, currentPage))
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const adminLogin = (email, password) => {
    return async (dispatch) => {
        let res = await adminLoginService(email, password)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.ADMIN_LOGIN,
                data: res.user
            })
        } else {
            toast.error(res.message)
        }
    }
}

export const editInfoAdminLogin = (userInput, currentPage) => {
    return async (dispatch) => {
        let res = await editInfoAdminLoginService(userInput)
        if (res && res.errCode === 0) {
            dispatch(getAllUser(LIMIT_ITEM_ONE_PAGE_ADMIN, currentPage))
            dispatch({
                type: actionTypes.ADMIN_LOGIN,
                data: res.user
            })
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const adminLogout = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.ADMIN_LOGOUT
        })
    }
}

export const getAllUser = (limit, page) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_USER_START
        })
        let res = await getAllUserService(limit, page)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_USER_SUCCESS,
                data: {
                    users: res.users,
                    sizeUsers: res.sizeUsers
                }
            })
        }
    }
}

// export const getSizeUsers = () => {
//     return async (dispatch) => {
//         let res = await getSizeUsersSerivce()
//         if (res && res.errCode === 0) {
//             dispatch({
//                 type: actionTypes.GET_SIZE_USERS,
//                 data: res.sizeUsers
//             })
//         }
//     }
// }

export const getAllUserByFullname = (limit, page, fullname) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_USER_START
        })
        let res = await getAllUserByFullnameService(limit, page, fullname)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_USER_SUCCESS,
                data: {
                    users: res.users,
                    sizeUsers: res.sizeUsers
                }
            })
        }
    }
}

export const getAllUserByRole = (limit, page, role) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_USER_START
        })
        let res = await getAllUserByRoleService(limit, page, role)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_USER_SUCCESS,
                data: {
                    users: res.users,
                    sizeUsers: res.sizeUsers
                }
            })
        }
    }
}

export const getAllUserByRoleAndFullname = (limit, page, role, fullname) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_USER_START
        })
        let res = await getAllUserByRoleAndFullnameService(limit, page, role, fullname)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_USER_SUCCESS,
                data: {
                    users: res.users,
                    sizeUsers: res.sizeUsers
                }
            })
        }
    }
}

export const changeStatusAccountUser = (userInput, currentPage) => {
    return async (dispatch) => {
        let res = await changeStatusAccountUserService(userInput)
        if (res && res.errCode === 0) {
            dispatch(getAllUser(LIMIT_ITEM_ONE_PAGE_ADMIN, currentPage))
        } else {
            toast.error(res.message)
        }
    }
}

