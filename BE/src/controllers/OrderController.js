import OrderService from '../services/OrderService'

let getAllOrder = async (req, res) => {
    let data = {}
    try {
        let { limit, page } = req.query
        data = await OrderService.getAllOrder(limit, page)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let deleteOrderById = async (req, res) => {
    let data = {}
    try {
        let { id } = req.body
        data = await OrderService.deleteOrderById(id)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let changeStatusOrder = async (req, res) => {
    let data = {}
    try {
        let orderInput = req.body
        data = await OrderService.changeStatusOrder(orderInput)
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
    getAllOrder,
    deleteOrderById,
    changeStatusOrder,
}