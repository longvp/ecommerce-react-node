import React from "react"
import { Route, Routes } from "react-router-dom"

import Footer from "../containers/ViewClient/Footer/Footer"
import Header from "../containers/ViewClient/Header/Header"

import HomePage from '../containers/ViewClient/HomePage/HomePage'
import Category from '../containers/ViewClient/Category/Category'
import Contact from '../containers/ViewClient/Contact/Contact'
import Blogs from '../containers/ViewClient/Blogs/Blogs'
import Cart from '../containers/ViewClient/Cart/Cart'
import ClientLogin from '../containers/ViewClient/ClientLoginRegister/ClientLogin'
import ClientRegister from '../containers/ViewClient/ClientLoginRegister/ClientRegister'
import ClientVerifyAccount from '../containers/ViewClient/ClientLoginRegister/ClientVerifyAccount'
import DetailProduct from '../containers/ViewClient/ProductItem/DetailProduct'
import Account from '../containers/ViewClient/Account/Account'
import DetailBlog from '../containers/ViewClient/Blogs/DetailBlog'
import PageSearchProduct from '../containers/ViewClient/PageSearchProduct/PageSearchProduct'
import PageNotFound from '../containers/ViewClient/PageNotFound'

import { PATH } from "../utilities/const"

function RouteClient() {
    return (
        <>
            <Header />
            <Routes>
                <Route path={PATH.HOMEPAGE} exact element={<HomePage />} />
                <Route path={PATH.CATEGORY} element={<Category />} />
                <Route path={PATH.CART} element={<Cart />} />
                <Route path={PATH.CLIENT_LOGIN} element={<ClientLogin />} />
                <Route path={PATH.CLIENT_REGISTER} element={<ClientRegister />} />
                <Route path={PATH.CLIENT_VERIFY_ACCOUNT} element={<ClientVerifyAccount />} />
                <Route path={PATH.ACCOUNT} element={<Account />} />
                <Route path={PATH.DETAIL_PRODUCT} element={<DetailProduct />} />
                <Route path={PATH.BLOG} element={<Blogs />} />
                <Route path={PATH.DETAIL_BLOG} element={<DetailBlog />} />
                <Route path={PATH.CONTACT} element={<Contact />} />
                <Route path={PATH.PAGE_SEARCH_PRODUCT} element={<PageSearchProduct />} />

                <Route path='*' element={<PageNotFound />} />

            </Routes>
            <Footer />
        </>
    )
}

export default RouteClient