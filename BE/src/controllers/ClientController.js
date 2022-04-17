import ClientService from '../services/ClientService'

let clientRegister = async (req, res) => {
    let data = {}
    try {
        let clientInput = req.body
        data = await ClientService.clientRegister(clientInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let verifyAccount = async (req, res) => {
    let data = {}
    try {
        let clientInput = req.body
        data = await ClientService.verifyAccount(clientInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let clientLogin = async (req, res) => {
    let data = {}
    try {
        let { email, password } = req.body
        data = await ClientService.clientLogin(email, password)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let changeInfo = async (req, res) => {
    let data = {}
    try {
        let clientInput = req.body
        data = await ClientService.changeInfo(clientInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let createOrder = async (req, res) => {
    let data = {}
    try {
        let order = req.body
        data = await ClientService.createOrder(order)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllOrderByUserId = async (req, res) => {
    let data = {}
    try {
        let { userId } = req.query
        data = await ClientService.getAllOrderByUserId(userId)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let cancelOrder = async (req, res) => {
    let data = {}
    try {
        let orderInput = req.body
        data = await ClientService.cancelOrder(orderInput)
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
    clientRegister,
    verifyAccount,
    clientLogin,
    changeInfo,
    createOrder,
    getAllOrderByUserId,
    cancelOrder
}