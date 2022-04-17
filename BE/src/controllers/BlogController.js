import BlogService from '../services/BlogService'

let createBlog = async (req, res) => {
    let data = {}
    try {
        let blogInput = req.body
        data = await BlogService.createBlog(blogInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllBlog = async (req, res) => {
    let data = {}
    try {
        let { limit, page } = req.query
        data = await BlogService.getAllBlog(limit, page)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getAllBlogByName = async (req, res) => {
    let data = {}
    try {
        let { limit, page, name } = req.query
        data = await BlogService.getAllBlogByName(limit, page, name)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let deleteBlog = async (req, res) => {
    let data = {}
    try {
        let { id } = req.body
        data = await BlogService.deleteBlog(id)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let editBlog = async (req, res) => {
    let data = {}
    try {
        let blogInput = req.body
        data = await BlogService.editBlog(blogInput)
    } catch (error) {
        console.log(error)
        data = {
            errCode: -1,
            message: 'Error from Server !'
        }
    }
    return res.status(200).json(data)
}

let getBlogBySeo = async (req, res) => {
    let data = {}
    try {
        let { seo } = req.query
        data = await BlogService.getBlogBySeo(seo)
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
    createBlog,
    getAllBlog,
    getAllBlogByName,
    deleteBlog,
    editBlog,
    getBlogBySeo
}