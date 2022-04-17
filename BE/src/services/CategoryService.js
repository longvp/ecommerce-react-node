import db from "../models"
const slugify = require('slugify')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

let createCategory = (categoryInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!categoryInput.name || !categoryInput.image) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            }
            else {
                categoryInput.name = categoryInput.name.toLowerCase()
                let category = await db.Category.findOne({
                    where: { name: categoryInput.name }
                })
                if (category) {
                    data = {
                        errCode: 2,
                        message: 'Tên Category đã tồn tại. Chọn tên khác !'
                    }
                } else {
                    await db.Category.create({
                        name: categoryInput.name,
                        image: categoryInput.image,
                        seo: slugify(`${categoryInput.name}`, {
                            replacement: '-',
                            lower: true,
                            locale: 'vi',
                            trim: true
                        })
                    })
                    data = {
                        errCode: 0,
                        message: 'Lưu thành công !'
                    }
                }
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = await db.Category.findAll({
                order: [['id', 'DESC'],],
            })
            let data = {
                errCode: 0,
                message: 'Get categories success !',
                categories
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCategoryByName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = await db.Category.findAll({
                order: [['id', 'DESC'],],
                where: {
                    name: { [Op.like]: `%${name}%` }
                },
            })
            let data = {
                errCode: 0,
                message: 'Get categories by name success !',
                categories
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let deleteCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!categoryId) {
                data = {
                    errCode: 0,
                    message: 'Các trường không được trống !'
                }
            } else {
                let category = await db.Category.findOne({
                    where: { id: categoryId }
                })
                if (!category) {
                    data = {
                        errCode: 2,
                        message: `Category không tồn tại !`,
                    }
                } else {
                    await db.Category.destroy({
                        where: { id: categoryId },
                    })
                    let listProduct = await db.Product.findAll({
                        where: { categoryId: categoryId }
                    })
                    if (listProduct.length > 0) {
                        await db.Product.destroy({
                            where: { categoryId: categoryId }
                        })
                    }
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

let editCategory = (categoryInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!categoryInput.id || !categoryInput.name) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            } else {
                categoryInput.name = categoryInput.name.toLowerCase()
                let category = await db.Category.findOne({
                    where: { id: categoryInput.id }
                })
                if (!category) {
                    data = {
                        errCode: 2,
                        message: `Category không tồn tại !`
                    }
                } else {
                    let categoriesDuplicate = await db.Category.findAll({
                        where: {
                            id: { [Op.ne]: `${categoryInput.id}` },
                            name: categoryInput.name
                        },
                    })
                    if (categoriesDuplicate.length > 0) {
                        data = {
                            errCode: 3,
                            message: `Category đã tồn tại. Chọn tên khác !`
                        }
                    } else {
                        category.name = categoryInput.name
                        category.seo = slugify(`${categoryInput.name}`, {
                            replacement: '-',
                            lower: true,
                            locale: 'vi',
                            trim: true
                        })
                        if (categoryInput.image) {
                            category.image = categoryInput.image
                        }
                        await category.save()
                        data = {
                            errCode: 0,
                            message: 'Cập nhật thành công !'
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

let getAllCategoryHomePage = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let categoriesHomePage = []
            let categories = await db.Category.findAll({
                order: [['id', 'DESC']],
                attributes: { exclude: ['image'] },
                raw: true
            })
            if (categories && categories.length > 0) {
                for (let i = 0; i < categories.length; i++) {
                    let productsByCategory = await db.Product.findAll({
                        order: [['id', 'DESC']],
                        where: { categoryId: categories[i].id },
                        limit: 6,
                        include: [
                            { model: db.Category, as: 'categoryData', attributes: ['id', 'name', 'seo'] },
                        ],
                    })
                    let category = categories[i]
                    categoriesHomePage.push({
                        category,
                        products: productsByCategory
                    })
                }
            }
            let data = {
                errCode: 0,
                message: 'Get categories success !',
                categoriesHomePage
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getCategoryBySeo = (seo) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.Category.findOne({
                where: { seo: seo },
            })
            if (!category) {
                category = {}
            }
            let data = {
                errCode: 0,
                message: 'Get category by seo success !',
                category
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createCategory,
    getAllCategory,
    getAllCategoryByName,
    deleteCategory,
    editCategory,
    getCategoryBySeo,
    getAllCategoryHomePage
}