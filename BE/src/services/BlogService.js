import db from "../models"
const slugify = require('slugify')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

let createBlog = (blogInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!blogInput.name || !blogInput.image
                || !blogInput.content_HTML || !blogInput.content_Markdown) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            }
            else {
                blogInput.name = blogInput.name.toLowerCase()
                let blog = await db.Blog.findOne({
                    where: { name: blogInput.name }
                })
                if (blog) {
                    data = {
                        errCode: 2,
                        message: 'Tên Blog đã tồn tại. Chọn tên khác !'
                    }
                } else {
                    await db.Blog.create({
                        name: blogInput.name,
                        image: blogInput.image,
                        content_HTML: blogInput.content_HTML,
                        content_Markdown: blogInput.content_Markdown,
                        timeCreate: blogInput.timeCreate,
                        seo: slugify(`${blogInput.name}`, {
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

let getAllBlog = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sizeBlogs = await db.Blog.count()
            let offset = (+page - 1) * (+limit)
            let blogs = await db.Blog.findAll(
                {
                    order: [['id', 'DESC'],],
                    offset: offset,
                    limit: +limit,
                }
            )
            let data = {
                errCode: 0,
                message: 'Get blogs, size blogs thành công !',
                blogs,
                sizeBlogs,
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllBlogByName = (limit, page, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sizeBlogs = await db.Blog.count({ where: { name: { [Op.like]: `%${name}%` } } })
            let offset = (+page - 1) * (+limit)
            let blogs = await db.Blog.findAll({
                order: [['id', 'DESC'],],
                where: {
                    name: { [Op.like]: `%${name}%` }
                },
                offset: offset,
                limit: +limit,
            })
            let data = {
                errCode: 0,
                message: 'Get blogs, size blogs thành công !',
                blogs,
                sizeBlogs
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let deleteBlog = (blogId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!blogId) {
                data = {
                    errCode: 0,
                    message: 'Các trường không được trống !'
                }
            } else {
                let blog = await db.Blog.findOne({
                    where: { id: blogId }
                })
                if (!blog) {
                    data = {
                        errCode: 2,
                        message: `Blog không tồn tại !`,
                    }
                } else {
                    await db.Blog.destroy({
                        where: { id: blogId },
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

let editBlog = (blogInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            if (!blogInput.id || !blogInput.name ||
                !blogInput.content_HTML || !blogInput.content_Markdown) {
                data = {
                    errCode: 1,
                    message: 'Các trường không được trống !'
                }
            } else {
                blogInput.name = blogInput.name.toLowerCase()
                let blog = await db.Blog.findOne({
                    where: { id: blogInput.id }
                })
                if (!blog) {
                    data = {
                        errCode: 2,
                        message: `Blog không tồn tại !`
                    }
                } else {
                    let blogsDuplicate = await db.Blog.findAll({
                        where: {
                            id: { [Op.ne]: `${blogInput.id}` },
                            name: blogInput.name
                        },
                    })
                    if (blogsDuplicate.length > 0) {
                        data = {
                            errCode: 3,
                            message: `Blog đã tồn tại. Chọn tên khác !`
                        }
                    } else {
                        blog.name = blogInput.name
                        blog.timeCreate = blogInput.timeCreate
                        blog.seo = slugify(`${blogInput.name}`, {
                            replacement: '-',
                            lower: true,
                            locale: 'vi',
                            trim: true
                        })
                        if (blogInput.image) {
                            blog.image = blogInput.image
                        }
                        blog.content_HTML = blogInput.content_HTML
                        blog.content_Markdown = blogInput.content_Markdown
                        await blog.save()
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

let getBlogBySeo = (seo) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = await db.Blog.findOne({
                where: { seo: seo },
            })
            if (!blog) {
                blog = {}
            }
            let data = {
                errCode: 0,
                message: 'Get blog by seo success !',
                blog
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createBlog,
    getAllBlog,
    getAllBlogByName,
    deleteBlog,
    editBlog,
    getBlogBySeo
}