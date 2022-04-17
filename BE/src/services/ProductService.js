import db from '../models/index'

const slugify = require('slugify')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

let createProduct = (productInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!productInput.name || !productInput.priceOrigin ||
                productInput.priceSale === '' || !productInput.totalQuantity ||
                !productInput.image || !productInput.categoryId ||
                !productInput.categorySeo ||
                !productInput.specific_HTML || !productInput.specific_Markdown ||
                !productInput.descript_HTML || !productInput.descript_Markdown) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            } else {
                if (parseInt(productInput.priceOrigin) <= 0) {
                    data = {
                        errCode: 2,
                        message: 'Giá gốc <= 0 '
                    }
                }
                else if (parseInt(productInput.totalQuantity) < 0) {
                    data = {
                        errCode: 2,
                        message: 'Số lượng < 0'
                    }
                }
                else if (parseInt(productInput.priceSale) < 0) {
                    data = {
                        errCode: 2,
                        message: 'Giá sale  < 0 '
                    }
                }
                else if (parseInt(productInput.priceSale) >= parseInt(productInput.priceOrigin)) {
                    data = {
                        errCode: 2,
                        message: 'Giá sale  >= Giá gốc '
                    }
                }
                else {
                    productInput.name = productInput.name.toLowerCase()
                    let product = await db.Product.findOne({
                        where: { name: productInput.name }
                    })
                    if (product) {
                        data = {
                            errCode: 4,
                            message: 'Tên sản phẩm đã tồn tại. Chọn tên khác !'
                        }
                    } else {
                        await db.Product.create({
                            name: productInput.name,
                            priceOrigin: parseInt(productInput.priceOrigin),
                            priceSale: parseInt(productInput.priceSale),
                            totalQuantity: parseInt(productInput.totalQuantity),
                            image: productInput.image,
                            seo: slugify(`${productInput.name}`, {
                                replacement: '-',
                                lower: true,
                                locale: 'vi',
                                trim: true
                            }),
                            categoryId: productInput.categoryId,
                            categorySeo: productInput.categorySeo,
                            specific_HTML: productInput.specific_HTML,
                            specific_Markdown: productInput.specific_Markdown,
                            descript_HTML: productInput.descript_HTML,
                            descript_Markdown: productInput.descript_Markdown
                        })
                        data = {
                            errCode: 0,
                            message: 'Tạo sản phẩm thành công !'
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

let getAllProduct = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sizeProducts = await db.Product.count()
            let offset = (+page - 1) * (+limit)
            let products = await db.Product.findAll(
                {
                    order: [['id', 'DESC'],],
                    offset: offset,
                    limit: +limit,
                    include: [
                        { model: db.Category, as: 'categoryData', attributes: ['id', 'name', 'seo'] },
                    ],
                }
            )
            let data = {
                errCode: 0,
                message: 'Get products, size products thành công !',
                products,
                sizeProducts,
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllProductByName = (limit, page, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sizeProducts = await db.Product.count({ where: { name: { [Op.like]: `%${name}%` } } })
            let offset = (+page - 1) * (+limit)
            let products = await db.Product.findAll({
                order: [['id', 'DESC'],],
                where: {
                    name: { [Op.like]: `%${name}%` }
                },
                offset: offset,
                limit: +limit,
                include: [
                    { model: db.Category, as: 'categoryData', attributes: ['id', 'name', 'seo'] }
                ],
            })
            let data = {
                errCode: 0,
                message: 'Get products, size products thành công !',
                products,
                sizeProducts
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllProductByCategory = (limit, page, categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sizeProducts = await db.Product.count({ where: { categoryId: categoryId } })
            let offset = (+page - 1) * (+limit)
            let products = await db.Product.findAll(
                {
                    order: [['id', 'DESC'],],
                    where: { categoryId: categoryId },
                    offset: offset,
                    limit: +limit,
                    include: [
                        { model: db.Category, as: 'categoryData', attributes: ['id', 'name', 'seo'] }
                    ],
                }
            )
            let data = {
                errCode: 0,
                message: 'Get products, size products thành công !',
                products,
                sizeProducts
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllProductByCategoryAndName = (limit, page, categoryId, name) => {
    return new Promise(async (resolve, reject) => {
        try {

            let sizeProducts = await db.Product.count({
                where: {
                    categoryId: categoryId,
                    name: { [Op.like]: `%${name}%` }
                }
            })
            let offset = (+page - 1) * (+limit)
            let products = await db.Product.findAll(
                {
                    order: [['id', 'DESC'],],
                    where: {
                        categoryId: categoryId,
                        name: { [Op.like]: `%${name}%` }
                    },
                    offset: offset,
                    limit: +limit,
                    include: [
                        { model: db.Category, as: 'categoryData', attributes: ['id', 'name', 'seo'] }
                    ],
                }
            )
            let data = {
                errCode: 0,
                message: 'Get products, size products thành công !',
                products,
                sizeProducts
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!productId) {
                data = {
                    errCode: 0,
                    message: 'Các trường không được trống !'
                }
            } else {
                let product = await db.Product.findOne({
                    where: { id: productId }
                })
                if (!product) {
                    data = {
                        errCode: 2,
                        message: `Product không tồn tại !`,
                    }
                } else {
                    await db.Product.destroy({
                        where: { id: productId },
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

let editProduct = (productInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!productInput.id || !productInput.name || !productInput.priceOrigin
                || productInput.priceSale === '' || !productInput.totalQuantity
                || !productInput.categoryId || !productInput.categorySeo
                || !productInput.specific_HTML || !productInput.specific_Markdown
                || !productInput.descript_HTML || !productInput.descript_Markdown) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            } else {
                if (parseInt(productInput.priceOrigin) <= 0) {
                    data = {
                        errCode: 2,
                        message: 'Giá <= 0 '
                    }
                }
                else if (parseInt(productInput.totalQuantity) < 0) {
                    data = {
                        errCode: 2,
                        message: 'Số lượng < 0'
                    }
                }
                else if (parseInt(productInput.priceSale) < 0) {
                    data = {
                        errCode: 2,
                        message: 'Giá sale  < 0 '
                    }
                }
                else if (parseInt(productInput.priceSale) >= parseInt(productInput.priceOrigin)) {
                    data = {
                        errCode: 2,
                        message: 'Giá sale  >= Giá gốc '
                    }
                }
                else {
                    productInput.name = productInput.name.toLowerCase()
                    let product = await db.Product.findOne({
                        where: { id: productInput.id }
                    })
                    if (!product) {
                        data = {
                            errCode: 2,
                            message: `Product không tồn tại !`
                        }
                    } else {
                        let productsDuplicate = await db.Product.findAll({
                            where: {
                                id: { [Op.ne]: `${productInput.id}` },
                                name: productInput.name
                            },
                        })
                        if (productsDuplicate.length > 0) {
                            data = {
                                errCode: 3,
                                message: `Product đã tồn tại. Chọn tên khác !`
                            }
                        } else {
                            product.name = productInput.name
                            product.priceOrigin = parseInt(productInput.priceOrigin)
                            product.priceSale = parseInt(productInput.priceSale)
                            product.totalQuantity = parseInt(productInput.totalQuantity)
                            product.seo = slugify(`${productInput.name}`, {
                                replacement: '-',
                                lower: true,
                                locale: 'vi',
                                trim: true
                            })
                            if (productInput.image) {
                                product.image = productInput.image
                            }
                            product.categoryId = productInput.categoryId
                            product.categorySeo = productInput.categorySeo
                            product.specific_HTML = productInput.specific_HTML
                            product.specific_Markdown = productInput.specific_Markdown
                            product.descript_HTML = productInput.descript_HTML
                            product.descript_Markdown = productInput.descript_Markdown
                            await product.save()
                            data = {
                                errCode: 0,
                                message: 'Cập nhật thành công !'
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

let getProductBySeo = (seo) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Product.findOne({
                where: { seo: seo },
                include: [
                    { model: db.Category, as: 'categoryData', attributes: ['id', 'name', 'seo'] }
                ],
            })
            if (!product) {
                product = {}
            }
            let data = {
                errCode: 0,
                message: 'Get product by seo success !',
                product
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

// -------------------------
let getAllProductByCategorySeo = (limit, page, categorySeo) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sizeProducts = await db.Product.count({ where: { categorySeo: categorySeo } })
            let offset = (+page - 1) * (+limit)
            let products = await db.Product.findAll(
                {
                    order: [['id', 'DESC'],],
                    where: { categorySeo: categorySeo },
                    offset: offset,
                    limit: +limit,
                    include: [
                        { model: db.Category, as: 'categoryData', attributes: ['id', 'name', 'seo'] }
                    ],
                }
            )
            let data = {
                errCode: 0,
                message: 'Get products, size products thành công !',
                products,
                sizeProducts
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllProductByCategorySeoSortBy = (limit, page, categorySeo, sortBy, typeSort) => {
    return new Promise(async (resolve, reject) => {
        try {
            typeSort = typeSort.toUpperCase()
            let sizeProducts = await db.Product.count({ where: { categorySeo: categorySeo } })
            let offset = (+page - 1) * (+limit)
            let condition = {
                order: [[`${sortBy}`, `${typeSort}`],],
                where: { categorySeo: categorySeo },
                offset: offset,
                limit: +limit,
                include: [
                    { model: db.Category, as: 'categoryData', attributes: ['id', 'name', 'seo'] }
                ],
            }
            if (sortBy === 'priceOrigin') {
                condition.order = [
                    [Sequelize.cast(Sequelize.col(`${sortBy}`), 'INTEGER'), `${typeSort}`]
                ]
            }
            let products = await db.Product.findAll(condition)
            let data = {
                errCode: 0,
                message: 'Get products, size products thành công !',
                products,
                sizeProducts
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllProductByCategorySeoFilterPrice = (limit, page, categorySeo, priceStart, priceEnd) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (+priceStart > +priceEnd) {
                data = {
                    errCode: 1,
                    message: 'Price start > Price End'
                }
            } else {
                let condition = {
                    where: {
                        categorySeo: categorySeo,
                        [Op.and]: [
                            Sequelize.where(
                                Sequelize.cast(Sequelize.col('priceOrigin'), 'INTEGER'),
                                { [Op.between]: [priceStart, priceEnd] }
                            )
                        ]
                    }
                }
                let sizeProducts = await db.Product.count(condition)
                let offset = (+page - 1) * (+limit)
                condition.offset = offset
                condition.limit = +limit
                condition.include = [{ model: db.Category, as: 'categoryData', attributes: ['id', 'name', 'seo'] }]
                let products = await db.Product.findAll(condition)
                data = {
                    errCode: 0,
                    message: 'Get products, size products thành công !',
                    products,
                    sizeProducts
                }
            }
            resolve(data)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

let getAllProductByCategorySeoSortByFilterPrice = (limit, page, categorySeo, sortBy, typeSort, priceStart, priceEnd) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (+priceStart > +priceEnd) {
                data = {
                    errCode: 1,
                    message: 'Price start > Price End'
                }
            } else {
                let condition = {
                    where: {
                        categorySeo: categorySeo,
                        [Op.and]: [
                            Sequelize.where(
                                Sequelize.cast(Sequelize.col('priceOrigin'), 'INTEGER'),
                                { [Op.between]: [priceStart, priceEnd] }
                            )
                        ]
                    }
                }
                let sizeProducts = await db.Product.count(condition)
                let offset = (+page - 1) * (+limit)
                condition.order = [[`${sortBy}`, `${typeSort}`],]
                condition.offset = offset
                condition.limit = +limit
                condition.include = [{ model: db.Category, as: 'categoryData', attributes: ['id', 'name', 'seo'] }]
                let products = await db.Product.findAll(condition)
                data = {
                    errCode: 0,
                    message: 'Get products, size products thành công !',
                    products,
                    sizeProducts
                }
            }
            resolve(data)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

module.exports = {
    createProduct,
    getAllProduct,
    getAllProductByName,
    getAllProductByCategory,
    getAllProductByCategoryAndName,
    deleteProduct,
    editProduct,
    getProductBySeo,
    getAllProductByCategorySeo,
    getAllProductByCategorySeoSortBy,
    getAllProductByCategorySeoFilterPrice,
    getAllProductByCategorySeoSortByFilterPrice
}