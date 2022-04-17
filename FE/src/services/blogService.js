import axios from '../axios'

const createBlogService = (blogInput) => {
    return axios.post(`/api/create-blog`, blogInput)
}

const getAllBlogService = (limit, page) => {
    return axios.get(`/api/get-all-blog?limit=${limit}&page=${page}`)
}

const getAllBlogByNameService = (limit, page, name) => {
    return axios.get(`/api/get-all-blog-by-name?limit=${limit}&page=${page}&name=${name}`)
}

const deleteBlogService = (id) => {
    return axios.delete(`/api/delete-blog`, { data: { id } })
}

const editBlogService = (blogInput) => {
    return axios.post(`/api/edit-blog`, blogInput)
}

const getBlogBySeoService = (seo) => {
    return axios.get(`/api/get-blog-by-seo?seo=${seo}`)
}

export {
    createBlogService,
    getAllBlogService,
    getAllBlogByNameService,
    deleteBlogService,
    editBlogService,
    getBlogBySeoService
}