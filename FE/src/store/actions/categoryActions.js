import actionTypes from "./actionTypes"
import { toast } from 'react-toastify'
import {
    createCategoryService,
    deleteCategoryService,
    getAllCategoryService,
    getAllCategoryByNameService,
    editCategorySevice,
    getAllCategoryHomePageService,
    getCategoryBySeoService
} from '../../services/categoryService'

export const createCategory = (categoryInput) => {
    return async (dispatch) => {
        let res = await createCategoryService(categoryInput)
        if (res && res.errCode === 0) {
            dispatch(getAllCategory())
            toast.success(res.message)
        }
        else {
            toast.error(res.message)
        }
    }
}

export const deleteCategory = (id) => {
    return async (dispatch) => {
        let res = await deleteCategoryService(id)
        if (res && res.errCode === 0) {
            dispatch(getAllCategory())
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_CATEGORY_START
        })
        let res = await getAllCategoryService()
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_CATEGORY_SUCCESS,
                data: res.categories
            })
        }
    }
}

export const getAllCategoryByName = (name) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_CATEGORY_START
        })
        let res = await getAllCategoryByNameService(name)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_CATEGORY_SUCCESS,
                data: res.categories
            })
        }
    }
}

export const editCategory = (categoryInput) => {
    return async (dispatch) => {
        let res = await editCategorySevice(categoryInput)
        if (res && res.errCode === 0) {
            dispatch(getAllCategory())
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const getAllCategoryHomePage = () => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_CATEGORY_HOME_PAGE_START
        })
        let res = await getAllCategoryHomePageService()
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_CATEGORY_HOME_PAGE_SUCCESS,
                data: res.categoriesHomePage
            })
        }
    }
}

export const getCategoryBySeo = (seo) => {
    return async (dispatch) => {
        let res = await getCategoryBySeoService(seo)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_CATEGORY_SUCCESS,
                data: res.category
            })
        }
    }
}