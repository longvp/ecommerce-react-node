import actionTypes from './actionTypes'
import {
    createProductService,
    deleteProductService,
    editProductService,
    getAllProductByCategoryAndNameService,
    getAllProductByCategorySeoFilterPriceService,
    getAllProductByCategorySeoService,
    getAllProductByCategorySeoSortByFilterPriceService,
    getAllProductByCategorySeoSortByService,
    getAllProductByCategoryService,
    getAllProductByNameService,
    getAllProductService,
    getProductBySeoService
} from '../../services/productService'
import { toast } from 'react-toastify'
import { LIMIT_ITEM_ONE_PAGE_ADMIN } from './../../utilities/const'

export const createProduct = (productInput) => {
    return async (dispatch) => {
        let res = await createProductService(productInput)
        if (res.errCode === 0) {
            dispatch(getAllProduct(LIMIT_ITEM_ONE_PAGE_ADMIN, 1))
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const getAllProduct = (limit, page) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_PRODUCT_START
        })
        let res = await getAllProductService(limit, page)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
                data: {
                    products: res.products,
                    sizeProducts: res.sizeProducts
                }
            })
        }
    }
}

export const getAllProductByName = (limit, page, name) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_PRODUCT_START
        })
        let res = await getAllProductByNameService(limit, page, name)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
                data: {
                    products: res.products,
                    sizeProducts: res.sizeProducts
                }
            })
        }
    }
}

export const getAllProductByCategory = (limit, page, categoryId) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_PRODUCT_START
        })
        let res = await getAllProductByCategoryService(limit, page, categoryId)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
                data: {
                    products: res.products,
                    sizeProducts: res.sizeProducts
                }
            })
        }
    }
}

export const getAllProductByCategoryAndName = (limit, page, categoryId, name) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_PRODUCT_START
        })
        let res = await getAllProductByCategoryAndNameService(limit, page, categoryId, name)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
                data: {
                    products: res.products,
                    sizeProducts: res.sizeProducts
                }
            })
        }
    }
}

export const deleteProduct = (id, currentPage) => {
    return async (dispatch) => {
        let res = await deleteProductService(id)
        if (res && res.errCode === 0) {
            dispatch(getAllProduct(LIMIT_ITEM_ONE_PAGE_ADMIN, currentPage))
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const editProduct = (productInput, currentPage) => {
    return async (dispatch) => {
        let res = await editProductService(productInput)
        if (res && res.errCode === 0) {
            dispatch(getAllProduct(LIMIT_ITEM_ONE_PAGE_ADMIN, currentPage))
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const getProductBySeo = (seo) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_PRODUCT_START
        })
        let res = await getProductBySeoService(seo)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_PRODUCT_SUCCESS,
                data: res.product
            })
        }
    }
}

export const getAllProductByCategorySeo = (limit, page, categorySeo) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_PRODUCT_START
        })
        let res = await getAllProductByCategorySeoService(limit, page, categorySeo)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
                data: {
                    products: res.products,
                    sizeProducts: res.sizeProducts
                }
            })
        }
    }
}

export const getAllProductByCategorySeoSortBy = (limit, page, categorySeo, sortBy, typeSort) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_PRODUCT_START
        })
        let res = await getAllProductByCategorySeoSortByService(limit, page, categorySeo, sortBy, typeSort)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
                data: {
                    products: res.products,
                    sizeProducts: res.sizeProducts
                }
            })
        }
    }
}

export const getAllProductByCategorySeoFilterPrice = (limit, page, categorySeo, priceStart, priceEnd) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_PRODUCT_START
        })
        let res = await getAllProductByCategorySeoFilterPriceService(limit, page, categorySeo, priceStart, priceEnd)
        console.log(res)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
                data: {
                    products: res.products,
                    sizeProducts: res.sizeProducts
                }
            })
        }
        else {
            toast.error(res.message)
        }
    }
}

export const getAllProductByCategorySeoSortByFilterPrice = (limit, page, categorySeo, sortBy, typeSort, priceStart, priceEnd) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_PRODUCT_START
        })
        let res = await getAllProductByCategorySeoSortByFilterPriceService(limit, page, categorySeo, sortBy, typeSort, priceStart, priceEnd)
        console.log(res)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
                data: {
                    products: res.products,
                    sizeProducts: res.sizeProducts
                }
            })
        }
        else {
            toast.error(res.message)
        }
    }
}