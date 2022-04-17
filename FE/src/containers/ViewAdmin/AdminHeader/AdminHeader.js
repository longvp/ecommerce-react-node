import React, { useEffect, useState } from "react"
import './AdminHeader.scss'
import { NavLink } from "react-router-dom"
import { PATH } from './../../../utilities/const'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Buffer } from "buffer"
import { adminLogout } from "../../../store/actions/userActions"
import _ from 'lodash'


function AdminHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const adminLoginInfo = useSelector(state => state.userReducer.adminLoginInfo)
    const [avatarURL, setAvatarURL] = useState('')

    useEffect(() => {
        if (_.isEmpty(adminLoginInfo)) {
            navigate(PATH.ADMIN_LOGIN)
        }
        if (!_.isEmpty(adminLoginInfo)) {
            let avatarURL = ''
            if (adminLoginInfo.image) {
                avatarURL = Buffer.from(adminLoginInfo.image, 'base64').toString('binary')
            }
            setAvatarURL(avatarURL)
        }
    }, [adminLoginInfo])

    const handleAdminLogout = () => {
        let checkConfirm = window.confirm('Bạn muốn đăng xuất ?')
        if (checkConfirm) {
            dispatch(adminLogout())
        }
    }

    const ShowAvatar = () => {
        if (!_.isEmpty(adminLoginInfo)) {
            // let avatarURL = ''
            // if (adminLoginInfo.image) {
            //     avatarURL = Buffer.from(adminLoginInfo.image, 'base64').toString('binary')
            // }
            return (
                <div className="navbar-right">
                    <div>
                        <img src={avatarURL} className="avatar" alt="avatar" />
                        <span>{adminLoginInfo.fullname}</span>
                    </div>
                    <div className="sign-out" title="Đăng xuất"
                        onClick={() => handleAdminLogout()}>
                        <i className="fa fa-sign-out"></i>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    return (
        <>
            <nav className="navbar navbar-admin navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand">DASHBOARD</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    aria-current="page"
                                    to={PATH.MANAGE_USER}>
                                    Users
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    to={PATH.MANAGE_CATEGORY}>
                                    Categories
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    to={PATH.MANAGE_PRODUCT}>
                                    Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    to={PATH.MANAGE_BLOG}>
                                    Blogs
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    to={PATH.MANAGE_ORDER}>
                                    Orders
                                </NavLink>
                            </li>
                        </ul>
                        <ShowAvatar />
                    </div>
                </div>
            </nav >
        </>
    )
}

export default AdminHeader