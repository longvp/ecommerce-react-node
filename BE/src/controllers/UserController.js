import UserSevice from '../services/UserService'

let createUser = async (req, res) => {
    let data = {}
    try {
        let userInput = req.body
        data = await UserSevice.createUser(userInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let editUser = async (req, res) => {
    let data = {}
    try {
        let userInput = req.body
        data = await UserSevice.editUser(userInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let deleteUser = async (req, res) => {
    let { id } = req.body
    let data = {}
    try {
        data = await UserSevice.deleteUser(id)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let adminRegister = async (req, res) => {
    let data = {}
    try {
        let userInput = req.body
        data = await UserSevice.adminRegister(userInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let adminLogin = async (req, res) => {
    let data = {}
    try {
        let { email, password } = req.body
        data = await UserSevice.adminLogin(email, password)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let editInfoAdminLogin = async (req, res) => {
    let data = {}
    try {
        let userInput = req.body
        data = await UserSevice.editInfoAdminLogin(userInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllUser = async (req, res) => {
    let data = {}
    try {
        let { limit, page } = req.query
        data = await UserSevice.getAllUser(limit, page)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllUserByFullname = async (req, res) => {
    let data = {}
    try {
        let { limit, page, fullname } = req.query
        data = await UserSevice.getAllUserByFullname(limit, page, fullname)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllUserByRole = async (req, res) => {
    let data = {}
    try {
        let { limit, page, role } = req.query
        data = await UserSevice.getAllUserByRole(limit, page, role)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllUserByRoleAndFullname = async (req, res) => {
    let data = {}
    try {
        let { limit, page, role, fullname } = req.query
        data = await UserSevice.getAllUserByRoleAndFullname(limit, page, role, fullname)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let changeStatusAccountUser = async (req, res) => {
    let data = {}
    try {
        let userInput = req.body
        data = await UserSevice.changeStatusAccountUser(userInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

module.exports = {
    createUser,
    getAllUser,
    editUser,
    deleteUser,
    adminRegister,
    adminLogin,
    editInfoAdminLogin,
    getAllUserByFullname,
    getAllUserByRole,
    getAllUserByRoleAndFullname,
    changeStatusAccountUser,
}