import ProductService from '../services/ProductService'

let createProduct = async (req, res) => {
    let data = {}
    try {
        let productInput = req.body
        data = await ProductService.createProduct(productInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllProduct = async (req, res) => {
    let data = {}
    try {
        let { limit, page } = req.query
        data = await ProductService.getAllProduct(limit, page)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllProductByName = async (req, res) => {
    let data = {}
    try {
        let { limit, page, name } = req.query
        data = await ProductService.getAllProductByName(limit, page, name)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllProductByCategory = async (req, res) => {
    let data = {}
    try {
        let { limit, page, categoryId } = req.query
        data = await ProductService.getAllProductByCategory(limit, page, categoryId)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllProductByCategoryAndName = async (req, res) => {
    let data = {}
    try {
        let { limit, page, categoryId, name } = req.query
        data = await ProductService.getAllProductByCategoryAndName(limit, page, categoryId, name)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let deleteProduct = async (req, res) => {
    let data = {}
    try {
        let { id } = req.body
        data = await ProductService.deleteProduct(id)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let editProduct = async (req, res) => {
    let data = {}
    try {
        let productInput = req.body
        data = await ProductService.editProduct(productInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

// 

let getProductBySeo = async (req, res) => {
    let data = {}
    try {
        let { seo } = req.query
        data = await ProductService.getProductBySeo(seo)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllProductByCategorySeo = async (req, res) => {
    let data = {}
    try {
        let { limit, page, categorySeo } = req.query
        data = await ProductService.getAllProductByCategorySeo(limit, page, categorySeo)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllProductByCategorySeoSortBy = async (req, res) => {
    let data = {}
    try {
        let { limit, page, categorySeo, sortBy, typeSort } = req.query // type sort = DESC, ASC
        data = await ProductService.getAllProductByCategorySeoSortBy(limit, page, categorySeo, sortBy, typeSort)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllProductByCategorySeoFilterPrice = async (req, res) => {
    let data = {}
    try {
        let { limit, page, categorySeo, priceStart, priceEnd } = req.query
        data = await ProductService.getAllProductByCategorySeoFilterPrice(limit, page, categorySeo, priceStart, priceEnd)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllProductByCategorySeoSortByFilterPrice = async (req, res) => {
    let data = {}
    try {
        let { limit, page, categorySeo, sortBy, typeSort, priceStart, priceEnd } = req.query
        data = await ProductService.getAllProductByCategorySeoSortByFilterPrice(limit, page, categorySeo, sortBy, typeSort, priceStart, priceEnd)
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
    createProduct,
    getAllProduct,
    deleteProduct,
    editProduct,
    getProductBySeo,
    getAllProductByName,
    getAllProductByCategory,
    getAllProductByCategoryAndName,
    getAllProductByCategorySeo,
    getAllProductByCategorySeoSortBy,
    getAllProductByCategorySeoFilterPrice,
    getAllProductByCategorySeoSortByFilterPrice
}