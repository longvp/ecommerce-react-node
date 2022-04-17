import React from "react"
import { Route, Routes } from "react-router-dom"

import AdminHeader from "../containers/ViewAdmin/AdminHeader/AdminHeader"

import AdminLogin from "../containers/ViewAdmin/AdminLogin/AdminLogin"

import ManageUser from '../containers/ViewAdmin/ManageUser/ManageUser'
import ManageCategory from '../containers/ViewAdmin/ManageCategory/ManageCategory'
import ManageProduct from '../containers/ViewAdmin/ManageProduct/MangeProduct'
import ManageBlog from '../containers/ViewAdmin/ManageBlog/ManageBlog'
import ManageOrder from '../containers/ViewAdmin/ManageOrder/ManageOrder'

import { PATH } from "../utilities/const"

function RouteAdmin() {
    return (
        <>
            <AdminHeader />
            <Routes>
                <Route path='/manage-user' element={<ManageUser />} />
                <Route path='/manage-category' element={<ManageCategory />} />
                <Route path='/manage-product' element={<ManageProduct />} />
                <Route path='/manage-blog' element={<ManageBlog />} />
                <Route path='/manage-order' element={<ManageOrder />} />
            </Routes>
        </>
    )
}

export default RouteAdmin