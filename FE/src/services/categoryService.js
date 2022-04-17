import axios from '../axios'

const createCategoryService = (categoryInput) => {
    return axios.post(`/api/create-category`, categoryInput)
}

const getAllCategoryService = () => {
    return axios.get(`/api/get-all-category`)
}

const getAllCategoryByNameService = (name) => {
    return axios.get(`/api/get-all-category-by-name?name=${name}`)
}

const deleteCategoryService = (id) => {
    return axios.delete(`/api/delete-category`, { data: { id } })
}

const editCategorySevice = (categoryInput) => {
    return axios.post(`/api/edit-category`, categoryInput)
}

const getAllCategoryHomePageService = () => {
    return axios.get(`/api/get-all-category-home-page`)
}

const getCategoryBySeoService = (seo) => {
    return axios.get(`/api/get-category-by-seo?seo=${seo}`)
}

export {
    createCategoryService,
    getAllCategoryService,
    getAllCategoryByNameService,
    deleteCategoryService,
    editCategorySevice,
    getCategoryBySeoService,
    getAllCategoryHomePageService
}