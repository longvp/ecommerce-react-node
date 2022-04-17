import axios from '../axios'

const createProductService = (productInput) => {
    return axios.post('/api/create-product', productInput)
}

const getAllProductService = (limit, page) => {
    return axios.get(`/api/get-all-product?limit=${limit}&page=${page}`)
}

const deleteProductService = (id) => {
    return axios.delete(`/api/delete-product`, { data: { id } })
}

const editProductService = (productInput) => {
    return axios.post(`/api/edit-product`, productInput)
}

const getAllProductByNameService = (limit, page, name) => {
    return axios.get(`/api/get-all-product-by-name?limit=${limit}&page=${page}&name=${name}`)
}

const getAllProductByCategoryService = (limit, page, categoryId) => {
    return axios.get(`/api/get-all-product-by-category?limit=${limit}&page=${page}&categoryId=${categoryId}`)
}

const getAllProductByCategoryAndNameService = (limit, page, categoryId, name) => {
    return axios.get(`/api/get-all-product-by-category-and-name?limit=${limit}&page=${page}&categoryId=${categoryId}&name=${name}`)
}

const getAllProductByCategorySeoService = (limit, page, categorySeo) => {
    return axios.get(`/api/get-all-product-by-category-seo?limit=${limit}&page=${page}&categorySeo=${categorySeo}`)
}

const getAllProductByCategorySeoSortByService = (limit, page, categorySeo, sortBy, typeSort) => {
    return axios.get(`/api/get-all-product-by-category-seo-sort-by?limit=${limit}&page=${page}&categorySeo=${categorySeo}&sortBy=${sortBy}&typeSort=${typeSort}`)
}

const getAllProductByCategorySeoFilterPriceService = (limit, page, categorySeo, priceStart, priceEnd) => {
    return axios.get(`/api/get-product-by-category-seo-filter-price?limit=${limit}&page=${page}&categorySeo=${categorySeo}&priceStart=${priceStart}&priceEnd=${priceEnd}`)
}

const getAllProductByCategorySeoSortByFilterPriceService = (limit, page, categorySeo, sortBy, typeSort, priceStart, priceEnd) => {
    return axios.get(`/api/get-product-by-category-seo-sort-by-filter-price?limit=${limit}&page=${page}&categorySeo=${categorySeo}&sortBy=${sortBy}&typeSort=${typeSort}&priceStart=${priceStart}&priceEnd=${priceEnd}`)
}

const getProductBySeoService = (seo) => {
    return axios.get(`/api/get-product-by-seo?seo=${seo}`)
}

export {
    createProductService,
    getAllProductService,
    deleteProductService,
    editProductService,
    getProductBySeoService,
    getAllProductByNameService,
    getAllProductByCategoryService,
    getAllProductByCategoryAndNameService,
    getAllProductByCategorySeoService,
    getAllProductByCategorySeoSortByService,
    getAllProductByCategorySeoFilterPriceService,
    getAllProductByCategorySeoSortByFilterPriceService
}