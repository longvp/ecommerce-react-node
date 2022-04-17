import actionTypes from "./actionTypes"
import { toast } from 'react-toastify'
import { createBlogService, deleteBlogService, editBlogService, getAllBlogByNameService, getAllBlogService, getBlogBySeoService } from "../../services/blogService"
import { LIMIT_ITEM_ONE_PAGE_ADMIN } from "../../utilities/const"

export const createBlog = (blogInput) => {
    return async (dispatch) => {
        let res = await createBlogService(blogInput)
        if (res && res.errCode === 0) {
            dispatch(getAllBlog(LIMIT_ITEM_ONE_PAGE_ADMIN, 1))
            toast.success(res.message)
        }
        else {
            toast.error(res.message)
        }
    }
}

export const getAllBlog = (limit, page) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_BLOG_START
        })
        let res = await getAllBlogService(limit, page)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_BLOG_SUCCESS,
                data: {
                    blogs: res.blogs,
                    sizeBlogs: res.sizeBlogs
                }
            })
        }
    }
}

export const getAllBlogByName = (limit, page, name) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_ALL_BLOG_START
        })
        let res = await getAllBlogByNameService(limit, page, name)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_ALL_BLOG_SUCCESS,
                data: {
                    blogs: res.blogs,
                    sizeBlogs: res.sizeBlogs
                }
            })
        }
    }
}

export const deleteBlog = (id, currentPage) => {
    return async (dispatch) => {
        let res = await deleteBlogService(id)
        if (res && res.errCode === 0) {
            dispatch(getAllBlog(LIMIT_ITEM_ONE_PAGE_ADMIN, currentPage))
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const editBlog = (blogInput, currentPage) => {
    return async (dispatch) => {
        let res = await editBlogService(blogInput)
        if (res && res.errCode === 0) {
            dispatch(getAllBlog(LIMIT_ITEM_ONE_PAGE_ADMIN, currentPage))
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
}

export const getBlogBySeo = (seo) => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.GET_BLOG_START
        })
        let res = await getBlogBySeoService(seo)
        if (res && res.errCode === 0) {
            dispatch({
                type: actionTypes.GET_BLOG_SUCCESS,
                data: res.blog
            })
        }
    }
}