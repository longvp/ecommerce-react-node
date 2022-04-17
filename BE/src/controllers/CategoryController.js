import CategoryService from '../services/CategoryService'

let createCategory = async (req, res) => {
    let data = {}
    try {
        let categoryInput = req.body
        data = await CategoryService.createCategory(categoryInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllCategory = async (req, res) => {
    let data = {}
    try {
        data = await CategoryService.getAllCategory()
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllCategoryByName = async (req, res) => {
    let data = {}
    try {
        let { name } = req.query
        data = await CategoryService.getAllCategoryByName(name)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let deleteCategory = async (req, res) => {
    let data = {}
    try {
        let { id } = req.body
        data = await CategoryService.deleteCategory(id)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let editCategory = async (req, res) => {
    let data = {}
    try {
        let categoryInput = req.body
        data = await CategoryService.editCategory(categoryInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllCategoryHomePage = async (req, res) => {
    let data = {}
    try {
        data = await CategoryService.getAllCategoryHomePage()
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getCategoryBySeo = async (req, res) => {
    let data = {}
    try {
        let { seo } = req.query
        data = await CategoryService.getCategoryBySeo(seo)
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
    createCategory,
    getAllCategory,
    getAllCategoryByName,
    deleteCategory,
    editCategory,
    getCategoryBySeo,
    getAllCategoryHomePage
}