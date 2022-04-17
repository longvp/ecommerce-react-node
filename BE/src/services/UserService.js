import db from '../models/index'
import bcrypt from 'bcryptjs'
const slugify = require('slugify')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const salt = bcrypt.genSaltSync(10)
const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

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

let createUser = (userInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!userInput.email || !userInput.password || !userInput.fullname ||
                !userInput.address || !userInput.phonenumber || !userInput.gender ||
                !userInput.role || !userInput.image) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            } else {
                if (!userInput.email.match(EMAIL_FORMAT)) {
                    data = {
                        errCode: 2,
                        message: `Email không hợp lệ !`
                    }
                } else {
                    let emailExist = await checkEmailExist(userInput.email)
                    if (emailExist === true) {
                        data = {
                            errCode: 3,
                            message: `Email đã tồn tại. Chọn email khác !`
                        }
                    } else {
                        let hashPasswordUser = await hashPassword(userInput.password)
                        await db.User.create({
                            email: userInput.email,
                            password: hashPasswordUser,
                            fullname: userInput.fullname,
                            address: userInput.address,
                            phonenumber: userInput.phonenumber,
                            gender: userInput.gender,
                            role: userInput.role,
                            image: userInput.image,
                            seo: slugify(userInput.email, {
                                replacement: '-',
                                lower: false,
                                locale: 'vi',
                                trim: true
                            }),
                            statusAccount: 'SA2'
                        })
                        data = {
                            errCode: 0,
                            message: 'Lưu thành công !'
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

let editUser = (userInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!userInput.id || !userInput.fullname ||
                !userInput.address || !userInput.phonenumber || !userInput.gender ||
                !userInput.role) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            } else {
                let user = await db.User.findOne({
                    where: { id: userInput.id }
                })
                if (!user) {
                    data = {
                        errCode: 2,
                        message: `User không tồn tại !`
                    }
                } else {
                    user.fullname = userInput.fullname
                    user.address = userInput.address
                    user.phonenumber = userInput.phonenumber
                    user.gender = userInput.gender
                    user.role = userInput.role
                    if (userInput.image) {
                        user.image = userInput.image
                    }
                    await user.save()
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

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!userId) {
                data = {
                    errCode: 0,
                    message: 'Các trường không được trống !'
                }
            } else {
                let user = await db.User.findOne({
                    where: { id: userId }
                })
                if (!user) {
                    data = {
                        errCode: 2,
                        message: `User không tồn tại !`,
                    }
                } else {
                    await db.User.destroy({
                        where: { id: userId },
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

let adminRegister = (userInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!userInput.email || !userInput.password || !userInput.fullname ||
                !userInput.address || !userInput.phonenumber || !userInput.gender ||
                !userInput.image) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            } else {
                if (!userInput.email.match(EMAIL_FORMAT)) {
                    data = {
                        errCode: 2,
                        message: `Email không hợp lệ !`
                    }
                } else {
                    let emailExist = await checkEmailExist(userInput.email)
                    if (emailExist === true) {
                        data = {
                            errCode: 3,
                            message: `Email đã tồn tại. Chọn email khác !`
                        }
                    } else {
                        let hashPasswordUser = await hashPassword(userInput.password)
                        await db.User.create({
                            email: userInput.email,
                            password: hashPasswordUser,
                            fullname: userInput.fullname,
                            address: userInput.address,
                            phonenumber: userInput.phonenumber,
                            gender: userInput.gender,
                            role: 'R1',
                            image: userInput.image,
                            seo: slugify(userInput.email, {
                                replacement: '-',
                                lower: false,
                                locale: 'vi',
                                trim: true
                            }),
                            statusAccount: 'SA1'
                        })
                        data = {
                            errCode: 0,
                            message: 'Lưu thành công !'
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

let adminLogin = (email, password) => {
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
                        attributes: ['id', 'email', 'password', 'fullname', 'image'],
                        where: { email: email, role: 'R1' },
                        raw: true
                    })
                    if (!user) {
                        data = {
                            errCode: 2,
                            message: 'Bạn không được phép truy cập!'
                        }
                    } else {
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
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let editInfoAdminLogin = (userInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!userInput.id || !userInput.fullname ||
                !userInput.address || !userInput.phonenumber || !userInput.gender ||
                !userInput.role) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            } else {
                let user = await db.User.findOne({
                    where: { id: userInput.id }
                })
                if (!user) {
                    data = {
                        errCode: 2,
                        message: `User không tồn tại !`
                    }
                } else {
                    user.fullname = userInput.fullname
                    user.address = userInput.address
                    user.phonenumber = userInput.phonenumber
                    user.gender = userInput.gender
                    user.role = userInput.role
                    if (userInput.image) {
                        user.image = userInput.image
                    }
                    await user.save()
                    let userResult = await db.User.findOne({
                        where: { id: user.id },
                        attributes: ['id', 'email', 'fullname', 'image'],
                        raw: true
                    })
                    data = {
                        errCode: 0,
                        message: 'Cập nhật thành công !',
                        user: userResult
                    }
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUser = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sizeUsers = await db.User.count()
            let offset = (+page - 1) * (+limit)
            let users = await db.User.findAll(
                {
                    attributes: { exclude: ['password'] },
                    order: [['id', 'DESC'],],
                    offset: offset,
                    limit: +limit,
                    include: [
                        { model: db.Allcode, as: 'genderData', attributes: ['valueVi'] },
                        { model: db.Allcode, as: 'roleData', attributes: ['valueVi'] },
                        { model: db.Allcode, as: 'statusAccountData', attributes: ['valueVi'] },
                    ]
                }
            )
            let data = {
                errCode: 0,
                message: 'Get users, size users thành công !',
                users,
                sizeUsers
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUserByFullname = (limit, page, fullname) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sizeUsers = await db.User.count({ where: { fullname: { [Op.like]: `%${fullname}%` } } })
            let offset = (+page - 1) * (+limit)
            let users = await db.User.findAll({
                attributes: { exclude: ['password'] },
                order: [['id', 'DESC'],],
                where: {
                    fullname: { [Op.like]: `%${fullname}%` }
                },
                offset: offset,
                limit: +limit,
                include: [
                    { model: db.Allcode, as: 'genderData', attributes: ['valueVi'] },
                    { model: db.Allcode, as: 'roleData', attributes: ['valueVi'] },
                    { model: db.Allcode, as: 'statusAccountData', attributes: ['valueVi'] },
                ]
            })
            let data = {
                errCode: 0,
                message: 'Get users, size users thành công !',
                users,
                sizeUsers
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUserByRole = (limit, page, role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sizeUsers = await db.User.count({ where: { role: role } })
            let offset = (+page - 1) * (+limit)
            let users = await db.User.findAll(
                {
                    attributes: { exclude: ['password'] },
                    order: [['id', 'DESC'],],
                    where: { role: role },
                    offset: offset,
                    limit: +limit,
                    include: [
                        { model: db.Allcode, as: 'genderData', attributes: ['valueVi'] },
                        { model: db.Allcode, as: 'roleData', attributes: ['valueVi'] },
                        { model: db.Allcode, as: 'statusAccountData', attributes: ['valueVi'] },
                    ]
                }
            )
            let data = {
                errCode: 0,
                message: 'Get users, size users thành công !',
                users,
                sizeUsers
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUserByRoleAndFullname = (limit, page, role, fullname) => {
    return new Promise(async (resolve, reject) => {
        try {

            let sizeUsers = await db.User.count({
                where: {
                    role: role,
                    fullname: { [Op.like]: `%${fullname}%` }
                }
            })
            let offset = (+page - 1) * (+limit)
            let users = await db.User.findAll(
                {
                    attributes: { exclude: ['password'] },
                    order: [['id', 'DESC'],],
                    where: {
                        role: role,
                        fullname: { [Op.like]: `%${fullname}%` }
                    },
                    offset: offset,
                    limit: +limit,
                    include: [
                        { model: db.Allcode, as: 'genderData', attributes: ['valueVi'] },
                        { model: db.Allcode, as: 'roleData', attributes: ['valueVi'] },
                        { model: db.Allcode, as: 'statusAccountData', attributes: ['valueVi'] },
                    ]
                }
            )
            let data = {
                errCode: 0,
                message: 'Get users, size users thành công !',
                users,
                sizeUsers
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let changeStatusAccountUser = (userInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!userInput.id || !userInput.statusAccount) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            } else {
                let user = await db.User.findOne({
                    where: { id: userInput.id }
                })
                if (!user) {
                    data = {
                        errCode: 2,
                        message: `User không tồn tại !`
                    }
                } else {
                    user.statusAccount = userInput.statusAccount
                    await user.save()
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
    createUser,
    editUser,
    deleteUser,
    adminRegister,
    adminLogin,
    editInfoAdminLogin,
    getAllUser,
    getAllUserByFullname,
    getAllUserByRole,
    getAllUserByRoleAndFullname,
    changeStatusAccountUser
}