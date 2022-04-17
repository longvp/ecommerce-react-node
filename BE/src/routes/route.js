import express from 'express'

import AllCodeController from '../controllers/AllCodeController'
import UserController from '../controllers/UserController'
import CategoryController from '../controllers/CategoryController'
import ProductController from '../controllers/ProductController'
import BlogController from '../controllers/BlogController'
import ClientController from '../controllers/ClientController'
import OrderController from '../controllers/OrderController'

const router = express.Router()

const initWebRoute = (app) => {

    router.get('/api/get-all-code', AllCodeController.getAllCode)

    // --------------------------------- USER -----------------------------------------
    router.post('/api/create-user', UserController.createUser)
    router.get('/api/get-all-user', UserController.getAllUser)
    router.get('/api/get-all-user-by-full-name', UserController.getAllUserByFullname)
    router.get('/api/get-all-user-by-role', UserController.getAllUserByRole)
    router.get('/api/get-all-user-by-role-and-full-name', UserController.getAllUserByRoleAndFullname)
    router.post('/api/edit-user', UserController.editUser)
    router.delete('/api/delete-user', UserController.deleteUser)
    router.post('/api/change-status-account-user', UserController.changeStatusAccountUser)
    router.post('/api/admin-register', UserController.adminRegister)
    router.post('/api/admin-login', UserController.adminLogin)
    router.post('/api/edit-info-admin-login', UserController.editInfoAdminLogin)

    // --------------------------------- CATEGORY -----------------------------------------
    router.post('/api/create-category', CategoryController.createCategory)
    router.get('/api/get-all-category', CategoryController.getAllCategory)
    router.get('/api/get-all-category-by-name', CategoryController.getAllCategoryByName)
    router.delete('/api/delete-category', CategoryController.deleteCategory)
    router.post('/api/edit-category', CategoryController.editCategory)
    router.get('/api/get-all-category-home-page', CategoryController.getAllCategoryHomePage)
    router.get('/api/get-category-by-seo', CategoryController.getCategoryBySeo)

    // --------------------------------- PRODUCT -----------------------------------------
    router.post('/api/create-product', ProductController.createProduct)
    router.get('/api/get-all-product', ProductController.getAllProduct)
    router.get('/api/get-all-product-by-name', ProductController.getAllProductByName)
    router.get('/api/get-all-product-by-category', ProductController.getAllProductByCategory)
    router.get('/api/get-all-product-by-category-and-name', ProductController.getAllProductByCategoryAndName)
    router.delete('/api/delete-product', ProductController.deleteProduct)
    router.post('/api/edit-product', ProductController.editProduct)
    router.get('/api/get-product-by-seo', ProductController.getProductBySeo)
    router.get('/api/get-all-product-by-category-seo', ProductController.getAllProductByCategorySeo)
    router.get('/api/get-all-product-by-category-seo-sort-by', ProductController.getAllProductByCategorySeoSortBy)
    router.get('/api/get-product-by-category-seo-filter-price', ProductController.getAllProductByCategorySeoFilterPrice)
    router.get('/api/get-product-by-category-seo-sort-by-filter-price', ProductController.getAllProductByCategorySeoSortByFilterPrice)

    // --------------------------------- BLOG -----------------------------------------
    router.post('/api/create-blog', BlogController.createBlog)
    router.get('/api/get-all-blog', BlogController.getAllBlog)
    router.get('/api/get-all-blog-by-name', BlogController.getAllBlogByName)
    router.delete('/api/delete-blog', BlogController.deleteBlog)
    router.post('/api/edit-blog', BlogController.editBlog)
    router.get('/api/get-blog-by-seo', BlogController.getBlogBySeo)

    // --------------------------------- CLIENT -----------------------------------------
    router.post('/api/client-register', ClientController.clientRegister)
    router.post('/api/verify-account', ClientController.verifyAccount)
    router.post('/api/client-login', ClientController.clientLogin)
    router.post('/api/client-change-info', ClientController.changeInfo)
    router.post('/api/create-order', ClientController.createOrder)
    router.get('/api/get-all-order-by-user-id', ClientController.getAllOrderByUserId)
    router.post('/api/client-cancel-order', ClientController.cancelOrder)

    // --------------------------------- ORDER -----------------------------------------
    router.get('/api/get-all-order', OrderController.getAllOrder)
    router.delete('/api/delete-order-by-id', OrderController.deleteOrderById)
    router.post('/api/change-status-order', OrderController.changeStatusOrder)

    return app.use('/', router)
}

export default initWebRoute