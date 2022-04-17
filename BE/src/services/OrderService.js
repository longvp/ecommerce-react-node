import db from '../models/index'
import EmailService from '../services/EmailService'

let getAllOrder = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sizeOrders = await db.Order.count()
            let offset = (+page - 1) * (+limit)
            let orders = await db.Order.findAll({
                order: [['id', 'DESC'],],
                offset: offset,
                limit: +limit,
                include: [
                    { model: db.User, as: 'userData', attributes: ['id', 'email', 'fullname', 'address', 'phonenumber'] },
                    { model: db.Product, as: 'productData', attributes: ['id', 'name', 'priceOrigin', 'priceSale'] },
                    { model: db.Allcode, as: 'statusOrderData', attributes: ['valueVi'] }
                ]
            })
            let data = {
                errCode: 0,
                message: 'Get all order success !',
                orders,
                sizeOrders
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let deleteOrderById = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!orderId) {
                data = {
                    errCode: 0,
                    message: 'Các trường không được trống !'
                }
            } else {
                let order = await db.Order.findOne({
                    where: { id: orderId }
                })
                if (!order) {
                    data = {
                        errCode: 2,
                        message: `Order không tồn tại !`,
                    }
                } else {
                    await db.Order.destroy({
                        where: { id: orderId },
                    })
                    await db.Order_Product.destroy({
                        where: { orderId: orderId }
                    })
                    data = {
                        errCode: 0,
                        message: 'Delete thành công !'
                    }
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let changeStatusOrder = (orderInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!orderInput.id || !orderInput.statusOrder) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            }
            else {
                let order = await db.Order.findOne({
                    where: { id: orderInput.id }
                })
                if (!order) {
                    data = {
                        errCode: 2,
                        message: `Order không tồn tại !`
                    }
                }
                else {
                    order.statusOrder = orderInput.statusOrder
                    if (orderInput.statusOrder === 'SO2') {
                        for (let i = 0; i < orderInput.productData.length; i++) {
                            let productDB = await db.Product.findOne({
                                where: { id: orderInput.productData[i].id },
                                attributes: ['id', 'totalQuantity'],
                                raw: true
                            })
                            if (productDB) {
                                productDB.totalQuantity = +productDB.totalQuantity + +orderInput.productData[i].Order_Product.quantity
                                db.Product.update(
                                    { totalQuantity: productDB.totalQuantity },
                                    { where: { id: productDB.id } }
                                )
                            }
                        }
                    }
                    if (orderInput.statusOrder === 'SO3') {
                        await EmailService.sendEmailOrderDone({
                            recipient: orderInput.userData.email,
                            fullname: orderInput.userData.fullname
                        })
                    }
                    await order.save()
                    data = {
                        errCode: 0,
                        message: 'Cập nhật thành công !'
                    }
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllOrder,
    deleteOrderById,
    changeStatusOrder,
}
