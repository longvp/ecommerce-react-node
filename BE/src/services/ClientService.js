import db from '../models/index'
import EmailService from './EmailService'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
const slugify = require('slugify')
const salt = bcrypt.genSaltSync(10)
const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

let buildUrlEmail = (token, clientId) => {
    let result = `${process.env.URL_REACT}/verify-account?token=${token}&clientId=${clientId}`
    return result
}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt)
            resolve(hash)
        } catch (error) {
            reject(error)
        }
    })
}

let checkEmailExist = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email, }
            })
            let check = false
            if (user) {
                check = true
            }
            resolve(check)
        } catch (error) {
            reject(error)
        }
    })
}

let clientRegister = (clientInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!clientInput.email || !clientInput.password || !clientInput.fullname ||
                !clientInput.address || !clientInput.phonenumber || !clientInput.gender ||
                !clientInput.image) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            } else {
                if (!clientInput.email.match(EMAIL_FORMAT)) {
                    data = {
                        errCode: 2,
                        message: `Email không hợp lệ !`
                    }
                } else {
                    let emailExist = await checkEmailExist(clientInput.email)
                    if (emailExist === true) {
                        data = {
                            errCode: 3,
                            message: `Email đã tồn tại. Chọn email khác !`
                        }
                    } else {
                        let hashPasswordUser = await hashPassword(clientInput.password)
                        let token = uuidv4()
                        let client = await db.User.create({
                            email: clientInput.email,
                            password: hashPasswordUser,
                            fullname: clientInput.fullname,
                            address: clientInput.address,
                            phonenumber: clientInput.phonenumber,
                            gender: clientInput.gender,
                            role: 'R2',
                            image: clientInput.image,
                            seo: slugify(clientInput.email, {
                                replacement: '-',
                                lower: false,
                                locale: 'vi',
                                trim: true
                            }),
                            statusAccount: 'SA2',
                            token: token
                        })
                        if (client) {
                            await EmailService.sendEmailRegisterAccount({
                                recipient: clientInput.email,
                                fullname: clientInput.fullname,
                                redirectLink: buildUrlEmail(token, client.id)
                            })
                        }
                        data = {
                            errCode: 0,
                            message: 'Đăng ký thành công !'
                        }
                    }
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let verifyAccount = (clientInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!clientInput.token || !clientInput.clientId) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !',
                }
            }
            else {
                let user = await db.User.findOne({
                    where: {
                        id: clientInput.clientId,
                        token: clientInput.token
                    }
                })
                if (user) {
                    user.statusAccount = 'SA1'
                    await user.save()
                    data = {
                        errCode: 0,
                        message: 'Tài khoản kích hoạt thành công !'
                    }
                } else {
                    data = {
                        errCode: 2,
                        message: 'Tài khoản không tồn tại'
                    }
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let clientLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!email || !password) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            }
            else {
                let emailExist = await checkEmailExist(email)
                if (emailExist === false) {
                    data = {
                        errCode: 1,
                        message: 'Email chưa đăng ký !'
                    }
                } else {
                    let user = await db.User.findOne({
                        where: { email: email },
                        attributes: ['id', 'email', 'password', 'fullname', 'address', 'phonenumber', 'gender', 'image', 'statusAccount'],
                        include: [
                            { model: db.Allcode, as: 'genderData', attributes: ['valueVi'] },
                        ],
                        raw: true
                    })
                    if (user.statusAccount === 'SA1') {
                        let checkPassword = await bcrypt.compareSync(password, user.password)
                        if (checkPassword) {
                            delete user.password
                            data = {
                                errCode: 0,
                                message: 'Đăng nhập thành công !',
                                user
                            }
                        } else {
                            data = {
                                errCode: 3,
                                message: 'Sai mật khẩu !'
                            }
                        }
                    }
                    else if (user.statusAccount === 'SA2') {
                        data = {
                            errCode: 2,
                            message: 'Bạn chưa kích hoạt tài khoản !'
                        }
                    }
                    else if (user.statusAccount === 'SA3') {
                        data = {
                            errCode: 2,
                            message: 'Tài khoản của bạn đã khóa. Do vi phạm chính sách của shop !'
                        }
                    }
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let changeInfo = (clientInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!clientInput.id || !clientInput.fullname || !clientInput.address ||
                !clientInput.phonenumber || !clientInput.gender) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            } else {
                let client = await db.User.findOne({
                    where: { id: clientInput.id },
                    raw: true
                })
                if (!client) {
                    data = {
                        errCode: 2,
                        message: `Tài khoản không tồn tại !`
                    }
                } else {
                    if (client.statusAccount === 'SA2') {
                        data = {
                            errCode: 2,
                            message: 'Tài khoản chưa kích hoạt !'
                        }
                    }
                    if (client.statusAccount === 'SA3') {
                        data = {
                            errCode: 2,
                            message: 'Tài khoản đã bị khóa. Do vi phạm chính sách của shop !'
                        }
                    }
                    if (client.statusAccount === 'SA1') {
                        // client.fullname = clientInput.fullname
                        // client.address = clientInput.address
                        // client.phonenumber = clientInput.phonenumber
                        // client.gender = clientInput.gender
                        // if (clientInput.image) {
                        //     client.image = clientInput.image
                        // }
                        // await client.save()
                        let image = ''
                        if (clientInput.image) {
                            image = clientInput.image
                        }
                        if (image) {
                            await db.User.update(
                                {
                                    fullname: clientInput.fullname,
                                    address: clientInput.address,
                                    phonenumber: clientInput.phonenumber,
                                    gender: clientInput.gender,
                                    image: image
                                },
                                { where: { id: clientInput.id } }
                            )
                        }
                        else {
                            await db.User.update(
                                {
                                    fullname: clientInput.fullname,
                                    address: clientInput.address,
                                    phonenumber: clientInput.phonenumber,
                                    gender: clientInput.gender,
                                },
                                { where: { id: clientInput.id } }
                            )
                        }

                        let user = await db.User.findOne({
                            where: { id: client.id },
                            attributes: ['id', 'email', 'fullname', 'address', 'phonenumber', 'gender', 'image'],
                            include: [
                                { model: db.Allcode, as: 'genderData', attributes: ['valueVi'] },
                            ],
                            raw: true
                        })
                        data = {
                            errCode: 0,
                            message: 'Cập nhật thành công !',
                            user
                        }
                    }
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let createOrder = (order) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!order) {
                data = {
                    errCode: 1,
                    message: 'Order empty !'
                }
            } else {
                let checkOrderValid = true
                // KIỂM TRA CÁC SẢN PHẨM TRONG ORDER CÓ TỒN TẠI TRONG DB KHÔNG
                // HOẶC SỐ LƯỢNG SẢN PHẨM CÓ HỢP LỆ KO
                for (let i = 0; i < order.products.length; i++) {
                    let product = await db.Product.findOne({
                        where: { id: order.products[i].productId },
                        attributes: ['id', 'totalQuantity'],
                        raw: true
                    })
                    if (!product) {
                        checkOrderValid = false
                        data = {
                            errCode: 2,
                            message: `${order.products[i].name} đã bị xóa !`
                        }
                        break
                    } else {
                        if (order.products[i].quantity > product.totalQuantity) {
                            checkOrderValid = false
                            data = {
                                errCode: 3,
                                message: `${order.products[i].name} vượt quá số lượng trong kho !`
                            }
                            break
                        }
                    }
                }

                let userValid = true
                let user = await db.User.findOne({
                    where: { id: order.userId },
                    raw: true
                })
                if (!user) {
                    userValid = false
                    data = {
                        errCode: 3,
                        message: 'Tài khoản không tồn tại !'
                    }
                } else {
                    if (user.statusAccount === 'SA2') {
                        userValid = false
                        data = {
                            errCode: 3,
                            message: 'Tài khoản chưa kích hoạt !'
                        }
                    }
                    if (user.statusAccount === 'SA3') {
                        userValid = false
                        data = {
                            errCode: 3,
                            message: 'Tài khoản đã bị khóa. Do vi phạm chính sách shop !'
                        }
                    }
                }

                if (checkOrderValid === true && userValid === true) {
                    let orderResult = await db.Order.create({
                        code: order.code,
                        totalPrice: order.totalPrice,
                        statusOrder: 'SO1',
                        userId: order.userId,
                        timeOrder: order.timeOrder
                    })
                    let order_product_list = []
                    for (let i = 0; i < order.products.length; i++) {
                        let order_product_item = {
                            orderId: orderResult.id,
                            productId: order.products[i].productId,
                            quantity: order.products[i].quantity,
                            priceUnit: order.products[i].priceUnit
                        }
                        order_product_list.push(order_product_item)
                    }
                    await db.Order_Product.bulkCreate(order_product_list)
                    // update lại số lượng trong bảng product
                    for (let i = 0; i < order_product_list.length; i++) {
                        let productDB = await db.Product.findOne({
                            where: { id: order_product_list[i].productId },
                            attributes: ['id', 'totalQuantity'],
                            raw: true
                        })
                        if (productDB) {
                            productDB.totalQuantity = +productDB.totalQuantity - +order_product_list[i].quantity
                            db.Product.update(
                                { totalQuantity: productDB.totalQuantity },
                                { where: { id: productDB.id } }
                            )
                        }
                    }
                    // send mail
                    if (orderResult) {
                        await EmailService.sendEmailOrder({
                            recipient: order.email,
                            fullname: order.fullname,
                            products: order.products,
                            totalPrice: order.totalPrice
                        })
                    }
                    data = {
                        errCode: 0,
                        message: 'Bạn đã đặt hàng thành công !',
                    }
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllOrderByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!userId) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            }
            else {
                let orders = await db.Order.findAll({
                    where: { userId: userId },
                    order: [['id', 'DESC'],],
                    include: [
                        { model: db.Product, as: 'productData', attributes: ['id', 'name', 'priceOrigin', 'priceSale'] },
                        { model: db.Allcode, as: 'statusOrderData', attributes: ['valueVi'] }
                    ]
                })
                data = {
                    errCode: 0,
                    message: 'Get all order success',
                    orders
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let cancelOrder = (orderInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!orderInput) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            }
            else {
                let order = await db.Order.findOne({
                    where: { id: orderInput.id },
                })
                if (!order) {
                    data = {
                        errCode: 2,
                        message: `Order không tồn tại !`
                    }
                }
                else {
                    order.statusOrder = 'SO2'
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
                    await order.save()
                    data = {
                        errCode: 0,
                        message: 'Hủy thành công !',
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
    clientRegister,
    verifyAccount,
    clientLogin,
    changeInfo,
    createOrder,
    getAllOrderByUserId,
    cancelOrder
}